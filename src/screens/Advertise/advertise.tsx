import { FC, useRef, useState } from 'react';
// Next 
import { useRouter } from 'next/router';
// MUI
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import Container from '@mui/material/Container';
// Forms - Validation
import * as Yup from 'yup';
import { Form, Formik, Field, FieldProps, ErrorMessage } from 'formik';
// Translations
import { useTranslation } from 'next-i18next';
// Components
import Message from '@/components/Message';
import { BaseDialog } from '@/components/Dialog/dialog';
import PageHeader from '@/components/PageHeader/pageHeader';
import { AttachmentField, SelectAutocompleteField, TextField } from '@/components/Form/Controls';
// Utils
import { toast } from 'react-toastify';
import { LayoutSettings } from '@/configs/layout';
import { minValue, maxValue, maxLength, minLength, onlyNumbers, coverPhoto } from '@/services/formValidators';
// styles
import classes from './advertise.module.scss';
import { AdvertisePageModel } from '@/models/pages/advertise';
import { FileModel } from '@/models/files';
import { CreateAdPayload } from '@/models/adsCrud';
import { Endpoints } from '@/services/apis';
// Models

const Advertise: FC<AdvertisePageModel> = ({ cities, brands, categories }) => {
  const { t } = useTranslation('advertise');
  const { push } = useRouter();
  const formikRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const [errorsList, setErrorsList] = useState<string[] | null>(null);

  const INITIAL_FORM_STATE: CreateAdPayload = {
    title: '',
    categories: [],
    // 
    brand_id: '',
    city_id: '',
    price: '',
    description: '',
    images: []
  };

  const FORM_VALIDATION = Yup.object().shape({
    title: Yup.string()
      .required(t('validations.required'))
      .test('minLength', t('validations.minLength', { length: 10 }), value => minLength(`${value}`, 10))
      .test('maxLength', t('validations.maxLength', { length: 200 }), value => maxLength(`${value}`, 200)),
    categories: Yup.array().nullable()
      .required(t('validations.required'))
      .test('minLength', t('validations.minArrayLength', { length: 1 }), value => minLength(value as number[], 1)),
    city_id: Yup.string()
      .required(t('validations.required')),      
    brand_id: Yup.string()
      .required(t('validations.required')),    
    price: Yup.string()
      .required(t('validations.required'))
      .test('onlyNumbers', t('validations.onlyNumbers'), val => onlyNumbers(`${val}`))
      .test('minValue', t('validations.minValue', { value: 1 }), value => minValue(Number(value), 1))
      .test('maxValue', t('validations.maxValue', { value: 1000000000 }), value => maxValue(Number(value), 1000000000)),
    description: Yup.string()
      .required(t('validations.required'))
      .test('minLength', t('validations.minLength', { length: 20 }), value => minLength(`${value}`, 20))
      .test('maxLength', t('validations.maxLength', { length: 1000 }), value => maxLength(`${value}`, 1000)),
    images: Yup.array()
      .required(t('validations.required'))
      .test('minLength', t('validations.selectOnePhotoAtLeast', { length: 1 }), value => minLength(value as number[], 1))
      .test('coverPhoto', t('validations.selectCoverPhoto'), (value) => coverPhoto(value as FileModel[]))
  });

  const onAdvertise = async (formValues: CreateAdPayload, { resetForm }: any) => {
    setIsLoading(true);
    setErrorsList(null);

    const { title, brand_id, city_id, price, description, images, categories } = formValues;
    const form = new FormData();
    // @ts-ignore
    const sortedAttachments = images.filter((image: FileModel) => image.file)
      .sort((image: FileModel) => image.isPrimary ? -1 : 1);

    form.append('city_id', String(city_id));
    form.append('brand_id', String(brand_id));
    form.append('title', title);
    form.append('description', description);
    form.append('price', String(price));

    categories.forEach((category: number) => {
      form.append('categories[]', String(category));
    });
    // @ts-ignore
    sortedAttachments.forEach((image: FileModel) => {
      if(image.file) {
        form.append('images[]', image.file);
      }
    });

    const { ok, data } = await Endpoints.ads.create(form);

    if(ok) {
      toast(data?.message, { type: 'success' });
      
      setOpenDialog(true);
      // Reset Form 
      resetForm();
    } else {
      if(data && data.errors) {

        let errors: string[] = [];
        
        Object.values(data?.errors).forEach((errorList: string[]) => {
          errors = errors.concat(errorList);
        });
  
        setErrorsList(errors);
      } else if (data?.message) {
        toast(data?.message, { type: 'error' });
      }
    }

    setIsLoading(false);
  };

  const onCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      {openDialog && (
        <BaseDialog 
          title={t('adIsSuccessfullyPublished')}
          subTitle={t('yourAdIsSuccessfullyPublished')}
          renderActions={() => (
            <Box className='dialog-actions'>
              <Button 
                variant="contained"
                size='large'
                className='action'
                onClick={() => push('/my-ads')}
              >
                {t('browseYourAds')}
              </Button>  

              <Button 
                size='large'
                variant="outlined"
                className='action light-primary-color'
                sx={{py: 1, fontSize: 16, lineHeight: '30px'}} 
                onClick={onCloseDialog}
              >
                {t('addNewAd')}
              </Button>
            </Box>
          )}
        />
      )}
      
      <PageHeader 
        title={t('advertise')} 
        subTitle={t('pageDescription')}
      />

      <div className={classes.formWrapper}>
        <Formik
          innerRef={formikRef}
          initialValues={INITIAL_FORM_STATE}
          validationSchema={FORM_VALIDATION}
          onSubmit={onAdvertise}
        >
          {() => (
            <Form> 
              <Container maxWidth={LayoutSettings.maxWidth} disableGutters>
                <Grid container spacing={2} px={0}>
                  {errorsList && (
                    <Grid item px={0} xs={12}>
                      <Message severity='error'>
                        <ul className='form-errors-wrapper'>
                          {errorsList.map((error: string) => <li key={error}>{error}</li>)}
                        </ul>
                      </Message>  
                    </Grid>
                  )}
                  
                  <Grid item px={0} xs={12}>
                    <TextField 
                      name='title' 
                      label={t('title')}
                    />      
                  </Grid>                    
                      
                  <Grid item xs={12}>
                    <Field name='categories'>
                      {(fieldProps: FieldProps) => (
                        <SelectAutocompleteField
                          multiple
                          name='categories' 
                          label={t('categories')}
                          lookup={categories}
                          labelTargetKey='title.ar'
                          fieldProps={fieldProps}
                          value={fieldProps.field.value}
                          onChange={(name: string, value: any) => {
                            fieldProps.form.setFieldValue(name, value);
                            fieldProps.form.setFieldTouched(fieldProps.field.name);
                          }}
                        />
                      )}
                    </Field>
                  </Grid>

                  <Grid item xs={12}>
                    <Field name='brand_id'>
                      {(fieldProps: FieldProps) => (
                        <SelectAutocompleteField
                          name='brand_id'
                          label={t('brand')}
                          labelTargetKey='name'
                          lookup={brands}
                          fieldProps={fieldProps}
                          value={fieldProps.field.value}
                          onChange={(name: string, value: any) => {
                            fieldProps.form.setFieldValue(name, value || '');
                            fieldProps.form.setFieldTouched(fieldProps.field.name);
                          }}
                        />
                      )}
                    </Field>
                  </Grid>

                  <Grid item xs={12}>
                    <Field name='city_id'>
                      {(fieldProps: FieldProps) => (
                        <SelectAutocompleteField
                          name='city_id'
                          label={t('city')}
                          labelTargetKey='name'
                          lookup={cities}
                          fieldProps={fieldProps}
                          value={fieldProps.field.value}
                          onChange={(name: string, value: any) => {
                            fieldProps.form.setFieldValue(name, value || '');
                            fieldProps.form.setFieldTouched(fieldProps.field.name);
                          }}
                        />
                      )}
                    </Field>
                  </Grid>

                  <Grid item px={0} xs={12}>
                    <TextField 
                      name='price' 
                      label={t('price')}
                    />      
                  </Grid>

                  <Grid item px={0} xs={12}>
                    <TextField 
                      name='description' 
                      label={t('description')}
                      multiline
                      rows={5}
                    />      
                  </Grid>

                  <Grid item px={0} xs={12}>
                    <Field name='images'>
                      {(fieldProps: FieldProps) => (
                        <>
                          <AttachmentField 
                            name='images'
                            label={t('attachments')}
                            maxAttachments={7}
                            value={fieldProps.field.value}
                            onChange={(name: string, value: FileModel[]) => fieldProps.form.setFieldValue(name, value)}
                          />

                          <span className='base-helper-text'>
                            <ErrorMessage name='images' />
                          </span>
                        </>
                      )}

                    </Field>

                  </Grid>

                  <Grid item xs={12} mt={2} pt={0}>
                    <Grid container spacing={2} px={0}>
                      <Grid item px={0} xs={12} sm={6}>
                        <LoadingButton 
                          fullWidth
                          disabled={isLoading}
                          loading={isLoading}
                          className={classes.submitButton}
                          sx={{py: 1, fontSize: 16, lineHeight: '30px'}} 
                          type='submit'
                          color='primary'
                          variant='contained'
                        >
                          {t('publish')}
                        </LoadingButton> 
                      </Grid>
                        
                      <Grid item px={0} xs={12} sm={6}>
                        <LoadingButton 
                          fullWidth
                          loading={isLoading}
                          disabled={isLoading}
                          type='reset'
                          color='primary'
                          variant='outlined'
                          className='light-primary-color'
                          sx={{py: 1, fontSize: 16, lineHeight: '30px'}} 
                        >
                          {t('cancel')}
                        </LoadingButton>
                      </Grid>
                    </Grid>
 
                  </Grid>
                </Grid>
              </Container>
            </Form>
          )}

        </Formik> 
      </div>
    </>
  );
};

export default Advertise;
