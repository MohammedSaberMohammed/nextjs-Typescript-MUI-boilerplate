import { FC, useState } from 'react';
// MUI
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import LoadingButton from '@mui/lab/LoadingButton';

// Forms - Validation
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
// Translations
import { useTranslation } from 'next-i18next';
// Components
import Message from '@/components/Message';
import { TextField } from '@/components/Form/Controls';
// Utils
import { toast } from 'react-toastify';
import { Endpoints } from '@/services/apis';
import { LayoutSettings } from '@/configs/layout';
import { 
  onlyNumbers, 
  startsWith, 
  exactNumbersLength,
} from '@/services/formValidators';
// styles
import classes from '../resetPassword.module.scss';
// Models
import { SendOTPCodePayload } from '@/models/auth';

interface Props {
  // eslint-disable-next-line no-unused-vars
  onValidate?: (data: SendOTPCodePayload) => void
}

const PhoneVerificationForm: FC<Props> = (props) => {
  const { t } = useTranslation('reset-password');
  const [isLoading, setIsLoading] = useState(false);
  const [errorsList, setErrorsList] = useState<string[] | null>(null);

  const INITIAL_FORM_STATE: SendOTPCodePayload = {
    phone: '',
    action: 'reset-password'
  };

  const FORM_VALIDATION = Yup.object().shape({
    phone: Yup.string()
      .required(t('validations.required'))
      .test('onlyNumbers', t('validations.onlyNumbers'), val => onlyNumbers(`${val}`))
      .test('startWith', t('validations.startWith', { char: '0' }), val => startsWith(`${val}`, '0'))
      .test('len', t('validations.exactNumbersLength', { length: 10 }), val => exactNumbersLength(`${val}`, 10)),
  });

  const onVerifyMobileNumber = async (formValues: SendOTPCodePayload) => {
    setIsLoading(true);
    setErrorsList(null);

    const { ok, data } = await Endpoints.otp.send(formValues);

    if(ok) {
      toast(data?.message, { type: 'success' });
      
      if(data && props.onValidate) {
        props.onValidate(formValues);
      }
    } else {
      if(data && data.errors) {

        let errors: string[] = [];
        
        Object.values(data?.errors).forEach((errorList: string[]) => {
          errors = errors.concat(errorList);
        });
  
        setErrorsList(errors);
      }
    }

    setIsLoading(false);
  };

  return (
    <Formik 
      initialValues={INITIAL_FORM_STATE}
      validationSchema={FORM_VALIDATION}
      onSubmit={onVerifyMobileNumber}
    >
      {() => (
        <Form> 
          <Container maxWidth={LayoutSettings.maxWidth} disableGutters sx={{padding: 0}}>
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
                <h4 className={classes.formTitle}>{t('didYouForgetYourPassword')}</h4>

                <Box mb={2} display='flex' alignItems='center' flexWrap='wrap'>
                  <h5 className={classes.formSubTitle}>{t('youWillRecieveOtpOnYourPhone')}</h5>
                </Box>   
              </Grid>        
              
              <Grid item px={0} xs={12}>
                <TextField 
                  name='phone' 
                  label={t('phoneNumber')}
                  placeholder='05xxxxxxxx'
                />        
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
                  {t('verifyPhoneNumber')}
                </LoadingButton>
              </Grid>
            </Grid>
          </Container>
        </Form>
      )}
    </Formik>
  );
};

PhoneVerificationForm.defaultProps = {
  onValidate() {}
};

export default PhoneVerificationForm;
