import { FC, useState } from 'react';
import Image from 'next/image';
// Hooks
import { useOTPCounter } from '@/Hooks/useCounter';
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
// Utils
import { toast } from 'react-toastify';
import { Endpoints } from '@/services/apis';
import { LayoutSettings } from '@/configs/layout';
import { exactNumbersLength, onlyAlphanumeric } from '@/services/formValidators';
// styles
import classNames from 'classnames';
import classes from '../resetPassword.module.scss';
// Models
import { ValidateOTPPayload } from '@/models/auth';

interface Props {
  phone: string,
  // eslint-disable-next-line no-unused-vars
  onValidate?: (data: ValidateOTPPayload) => void
}

const VerifyOTP: FC<Props> = ({ phone, onValidate }) => {
  const { t } = useTranslation('reset-password');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendOtpErrorsList, setResendOtpErrorsList] = useState<string[] | null>(null);

  const { isCounting, minutes, seconds, startCounter } = useOTPCounter();

  const INITIAL_FORM_STATE: ValidateOTPPayload = {
    phone,
    code: '',
    action: 'reset-password',
  };

  const FORM_VALIDATION = Yup.object().shape({
    code: Yup.string()
      .required(t('validations.required'))
      .test('onlyAlphanumeric', t('validations.onlyAlphanumeric'), value => onlyAlphanumeric(`${value}`))
      .test('len', t('validations.exactNumbersLength', { length: 6 }), val => exactNumbersLength(`${val}`, 6)),
  });

  const onValidateOTP = async (formValues: ValidateOTPPayload) => {
    setIsLoading(true);
    setError('');

    const { ok, data } = await Endpoints.otp.validate(formValues);

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

  const onResendOtp = async ({ phone, action }: ValidateOTPPayload) => {
    setIsLoading(true);
    setError('');
    setResendOtpErrorsList(null);

    const { ok, data } = await Endpoints.otp.send({ phone, action });

    if(ok) {
      toast(data?.message, { type: 'success' });
      
      startCounter();
    } else if(data && data.errors) {

      let errors: string[] = [];
        
      Object.values(data?.errors).forEach((errorList: string[]) => {
        errors = errors.concat(errorList);
      });
  
      setResendOtpErrorsList(errors);
    }

    setIsLoading(false);
  };

  return (
    <Formik 
      initialValues={INITIAL_FORM_STATE}
      validationSchema={FORM_VALIDATION}
      onSubmit={onValidateOTP}
    >
      {({ values }) => (
        <Form> 
          <Container maxWidth={LayoutSettings.maxWidth} disableGutters sx={{padding: 0}}>
            <Grid container spacing={2} px={0}>
              {(error || resendOtpErrorsList) && (
                <Grid item px={0} xs={12}>
                  <Message severity='error'>
                    {error || (
                      <ul className='form-errors-wrapper'>
                        {resendOtpErrorsList?.map((error: string) => <li key={error}>{error}</li>)}
                      </ul>
                    )}
                  </Message>  
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
                    onClick={() => onResendOtp(values)} 
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
