import { FC, useState } from 'react';
// Next
import Router from 'next/router';
// MUI
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
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
import { BaseDialog } from '@/components/Dialog/dialog';
// Utils
import { toast } from 'react-toastify';
import { Endpoints } from '@/services/apis';
import { LayoutSettings } from '@/configs/layout';
import { maxLength, minLength, onlyAlphanumeric } from '@/services/formValidators';
// styles
import classes from '../resetPassword.module.scss';
// Models
import { ResetPasswordPayload } from '@/models/auth';

interface Props {
  phone: string,
  code: string;
}

const ResetPasswordForm: FC<Props> = ({ phone, code }) => {
  const { t } = useTranslation('reset-password');
  const [openDialog, setOpenDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const INITIAL_FORM_STATE: ResetPasswordPayload = {
    code,
    phone,
    password: '',
    password_confirmation: '',
  };

  const FORM_VALIDATION = Yup.object().shape({
    password: Yup.string()
      .required(t('validations.required'))
      .test('minLength', t('validations.minLength', { length: 8 }), value => minLength(`${value}`, 8))
      .test('maxLength', t('validations.maxLength', { length: 100 }), value => maxLength(`${value}`, 100))
      .test('onlyAlphanumeric', t('validations.onlyAlphanumeric'), value => onlyAlphanumeric(`${value}`)),
    password_confirmation: Yup.string()
      .required(t('validations.required'))
      .test('matches', t('validations.shouldMatchPassword'), (value, context) => value === context.parent.password),
  });

  const onValidateOTP = async (formValues: ResetPasswordPayload) => {
    setIsLoading(true);
    setError('');

    const { ok, data } = await Endpoints.auth.resetPassword.reset(formValues);

    if(ok) {
      toast(data?.message, { type: 'success' });
      
      setOpenDialog(true);
    } else {
      if(data && data.message) {

        setError(data.message);
      }
    }

    setIsLoading(false);
  };

  return (
    <>
      {openDialog && (
        <BaseDialog 
          title={t('yourPasswordHasBeenResetedSuccessfully')}
          subTitle={t('successfullResetDescription')}
          renderActions={() => (
            <Box className={classes.dialogActions}>
              <Button 
                variant="contained"
                size='large'
                className={classes.action}
                onClick={() => Router.push('/login')}
              >
                {t('login')}
              </Button>  

              <Button 
                size='large'
                variant="outlined"
                className={classes.action}
                onClick={() => Router.push('/')}
              >
                {t('home')}
              </Button>
            </Box>
          )}
        />
      )}
 
      <Formik 
        initialValues={INITIAL_FORM_STATE}
        validationSchema={FORM_VALIDATION}
        onSubmit={onValidateOTP}
      >
        {() => (
          <Form> 
            <Container maxWidth={LayoutSettings.maxWidth} disableGutters sx={{padding: 0}}>
              <Grid container spacing={2} px={0}>
                {error && (
                  <Grid item px={0} xs={12}>
                    <Message severity='error'>{error}</Message>  
                  </Grid>
                )}            
              
                <Grid item px={0} xs={12}>
                  <h4 className={classes.formTitle}>{t('enterOtpToResetPassword')}</h4>

                  <Box mb={2} display='flex' alignItems='center' flexWrap='wrap'>
                    <h5 className={classes.formSubTitle}>{t('enterOtpSentToPhoneNumber')}</h5>
                  </Box>   
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    type='password'
                    name='password'
                    label={t('password')}
                  />        
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    type='password'
                    name='password_confirmation'
                    label={t('passwordConfirmation')}
                  />        
                </Grid>

                <Grid item xs={12}>
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
                    {t('validateOtp')}
                  </LoadingButton>
                </Grid>
              </Grid>
            </Container>
          </Form>
        )}

      </Formik> 
    </>
  );
};

export default ResetPasswordForm;
