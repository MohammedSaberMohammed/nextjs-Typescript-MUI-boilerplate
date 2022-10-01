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
import { LayoutSettings } from '@/configs/layout';
import { onlyAlphanumeric } from '@/services/formValidators';
// styles
import classes from '../styles.module.scss';
// Models
import { SignupPayload, VerifyAccountOTP } from '@/models/auth';
import Message from '@/components/Message';
import classNames from 'classnames';
import Image from 'next/image';
import { useOTPCounter } from '@/Hooks/useCounter';
import { Button } from '@mui/material';

interface Props {
  data: SignupPayload
}

const VerifyOTP: FC<Props> = () => {
  const { t } = useTranslation('signup');
  const [isLoading, setIsLoading] = useState(false);
  const [errorsList, setErrorsList] = useState<string[] | null>(null);
  const { isCounting, minutes, seconds, startCounter } = useOTPCounter();

  const INITIAL_FORM_STATE: VerifyAccountOTP = {
    otp: '',
  };

  const FORM_VALIDATION = Yup.object().shape({
    otp: Yup.string()
      .required(t('validations.required'))
      .test('onlyAlphanumeric', t('validations.onlyAlphanumeric'), value => onlyAlphanumeric(`${value}`))
  });

  const onSignup = async (formValues: VerifyAccountOTP) => {
    setIsLoading(true);
    setErrorsList(null);
    console.log(formValues);
    setIsLoading(false);
  };

  const onResendOtp = () => {
    startCounter();
  };

  return (
    <Formik 
      initialValues={INITIAL_FORM_STATE}
      validationSchema={FORM_VALIDATION}
      onSubmit={onSignup}
    >
      {() => (
        <Form> 
          <Container maxWidth={LayoutSettings.maxWidth} disableGutters sx={{padding: 0}}>
            <Grid container spacing={2} px={0}>
              {errorsList && (
                <Grid item px={0} xs={12}>
                  <Message severity='error'>
                    <ul>
                      {errorsList.map((error: string) => <li key={error}>{error}</li>)}
                    </ul>
                  </Message>  
                </Grid>
              )}            
              
              <Grid item px={0} xs={12}>
                <h4 className={classes.formTitle}>{t('enterYourAccountVerificationCode')}</h4>

                <Box mb={2} display='flex' alignItems='center' flexWrap='wrap'>
                  <h5 className={classes.formSubTitle}>{t('enterOtpSentToPhoneNumber')}</h5>
                  <h5 className={classNames(classes.formSubTitle, classes.phone)}>{'props.data.phone'}</h5>
                </Box>   
              </Grid>

              <Grid item px={0} xs={12}>
                <TextField 
                  name='otp' 
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
                  {t('activateMyAccount')}
                </LoadingButton>
              </Grid>
            </Grid>
          </Container>
        </Form>
      )}

    </Formik> 
  );
};

export default VerifyOTP;
