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
import { TextField } from '@/components/Form/Controls';
// Utils
import { toast } from 'react-toastify';
import { Endpoints } from '@/services/apis';
import { LayoutSettings } from '@/configs/layout';
import { exactNumbersLength, onlyAlphanumeric } from '@/services/formValidators';
// styles
import classes from '../resetPassword.module.scss';
// Models
import { ResetPasswordValidateOTPPayload } from '@/models/auth';
import Message from '@/components/Message';
import classNames from 'classnames';
import Image from 'next/image';
import { useOTPCounter } from '@/Hooks/useCounter';
import { Button } from '@mui/material';

interface Props {
  phone: string,
  // eslint-disable-next-line no-unused-vars
  onValidate?: (data: ResetPasswordValidateOTPPayload) => void
}

const VerifyOTP: FC<Props> = ({ phone, onValidate }) => {
  const { t } = useTranslation('reset-password');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { isCounting, minutes, seconds, startCounter } = useOTPCounter();

  const INITIAL_FORM_STATE: ResetPasswordValidateOTPPayload = {
    code: '',
    phone
  };

  const FORM_VALIDATION = Yup.object().shape({
    code: Yup.string()
      .required(t('validations.required'))
      .test('onlyAlphanumeric', t('validations.onlyAlphanumeric'), value => onlyAlphanumeric(`${value}`))
      .test('len', t('validations.exactNumbersLength', { length: 6 }), val => exactNumbersLength(`${val}`, 6)),
  });

  const onValidateOTP = async (formValues: ResetPasswordValidateOTPPayload) => {
    setIsLoading(true);
    setError('');

    const { ok, data } = await Endpoints.auth.resetPassword.validateOTP(formValues);

    if(ok) {
      toast(t('otpVerifiedSuccessfully'), { type: 'success' });
      
      if(data && onValidate) {
        onValidate(formValues);
      }
    } else {
      if(data && data.message) {

        setError(data.message);
      }
    }

    setIsLoading(false);
  };

  const onResendOtp = () => {
    startCounter();
  };

  return (
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
                  <h5 className={classNames(classes.formSubTitle, classes.phone)}>{phone}</h5>
                </Box>   
              </Grid>

              <Grid item px={0} xs={12}>
                <TextField 
                  name='code' 
                  label={t('verificationCode')}
                />

                <span>{t('remainingTime', { seconds, minutes })}</span>   
              </Grid>

              <Grid item xs={12} my={2} display='flex' alignItems='center'>
                <Image
                  src='/icons/refresh.svg' 
                  width={24}
                  height={24}
                  alt='resend-otp'
                />

                <Box
                  mx={1} 
                  display='flex' 
                  flexWrap='wrap' 
                  alignItems='center' 
                  justifyContent='space-between'
                  className={classes.prefix}
                >
                  {t('didNotRecieve')}

                  <Button 
                    disabled={isCounting}
                    onClick={onResendOtp} 
                    className={classNames(classes.suffix, classes.resend, { [classes.counting]: isCounting })}>
                    {t('resendTheCode')}
                  </Button>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <LoadingButton 
                  fullWidth
                  disabled={isLoading || !isCounting}
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
  );
};

VerifyOTP.defaultProps = {
  onValidate() {}
};

export default VerifyOTP;
