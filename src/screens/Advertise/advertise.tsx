import { FC, useState } from 'react';
// Next 
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
// MUI
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LoadingButton from '@mui/lab/LoadingButton';
import Container from '@mui/material/Container';
// Forms - Validation
import * as Yup from 'yup';
import { Form, Formik, Field, FieldProps } from 'formik';
// Translations
import { useTranslation } from 'next-i18next';
// Components
import { SelectAutocompleteField, TextField } from '@/components/Form/Controls';
import PageHeader from '@/components/PageHeader/pageHeader';
// Utils
import { toast } from 'react-toastify';
import { LayoutSettings } from '@/configs/layout';
import { minValue, maxValue, maxLength, minLength, onlyNumbers} from '@/services/formValidators';
// styles
import classes from './advertise.module.scss';
// Models

const Advertise: FC = () => {
  const router = useRouter();
  const { t } = useTranslation('advertise');
  const [isLoading, setIsLoading]= useState(false);
  // ! payload
  const INITIAL_FORM_STATE: any = {
    title: '',
    categories: [],
    // 
    city_id: '',
    price: '',
    description: ''
  };

  const FORM_VALIDATION = Yup.object().shape({
    title: Yup.string()
      .required(t('validations.required'))
      .test('minLength', t('validations.minLength', { length: 10 }), value => minLength(`${value}`, 10))
      .test('maxLength', t('validations.maxLength', { length: 200 }), value => maxLength(`${value}`, 200)),
    categories: Yup.array()
      .required(t('validations.required'))
      .test('minLength', t('validations.minLength', { length: 1 }), value => minLength(value, 1)),
    city_id: Yup.string()
      .required(t('validations.required')),    
    price: Yup.string()
      .required(t('validations.required'))
      .test('onlyNumbers', t('validations.onlyNumbers'), val => onlyNumbers(`${val}`))
      .test('minValue', t('validations.minValue', { length: 1 }), value => minValue(Number(value), 1))
      .test('maxValue', t('validations.maxValue', { length: 1000000000 }), value => maxValue(Number(value), 1000000000)),
    description: Yup.string()
      .required(t('validations.required'))
      .test('minLength', t('validations.minLength', { length: 20 }), value => minLength(`${value}`, 20))
      .test('maxLength', t('validations.maxLength', { length: 1000 }), value => maxLength(`${value}`, 1000)),
  });

  const onAdvertise = async (formValues: any) => {
    console.log(formValues);
  };

  return (
    <>
      <PageHeader 
        title={t('advertise')} 
        subTitle={t('pageDescription')}
      />

      <div className={classes.content}>
        <div className={classes.formWrapper}>
          <Formik 
            initialValues={INITIAL_FORM_STATE}
            validationSchema={FORM_VALIDATION}
            onSubmit={onAdvertise}
          >
            {() => (
              <Form> 
                <Container maxWidth={LayoutSettings.maxWidth} disableGutters sx={{padding: 0}}>
                  <Grid container spacing={2} px={0}>
                    <Grid item px={0} xs={12}>
                      <TextField 
                        name='title' 
                        label={t('title')}
                      />      
                    </Grid>                    
                      
                    <Grid item mt={2} xs={12}>
                      <Field name='categories'>
                        {(fieldProps: FieldProps) => (
                          <SelectAutocompleteField
                            name='categories' 
                            label={t('categories')}
                            lookup={[]}
                            multiple
                            fieldProps={fieldProps}
                            value={fieldProps.field.value}
                            onChange={(name: string, value: any) => fieldProps.form.setFieldValue(name, value)}
                          />
                        )}
                      </Field>
                    </Grid>

                    <Grid item mt={2} xs={12}>
                      <Field name='city_id'>
                        {(fieldProps: FieldProps) => (
                          <SelectAutocompleteField
                            name='city_id' 
                            label={t('city')}
                            lookup={[]}
                            fieldProps={fieldProps}
                            value={fieldProps.field.value}
                            onChange={(name: string, value: any) => fieldProps.form.setFieldValue(name, value)}
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
                      Attachments here
                      {/* <TextField 
                        name='description' 
                        label={t('description')}
                        multiline
                        rows={5}
                      />       */}
                    </Grid>

                    <Grid item xs={12} mt={2}>
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
                        {t('enter')}
                      </LoadingButton>
                    </Grid>
                  </Grid>
                </Container>
              </Form>
            )}

          </Formik> 
        </div>
      </div>
    </>
  );
};

export default Advertise;
