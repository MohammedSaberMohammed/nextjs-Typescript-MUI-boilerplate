import { FC } from 'react';
// Next 
import Link from 'next/link';
import { signIn } from 'next-auth/react';
// MUI
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
// Forms - Validation
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
// Translations
import { useTranslation } from 'next-i18next';
// Components
import { TextField } from '@/components/Form/Controls';
import PageHeader from '@/components/PageHeader/pageHeader';
import AnonymousWizard from '@/components/AnonymousWizard/anonymousWizard';
// Utils
import { LayoutSettings } from '@/configs/layout';
import { exactNumbersLength, maxLength, onlyAlphanumeric, onlyNumbers, startsWith } from '@/services/formValidators';
// styles
import classes from './styles.module.scss';
// Models
import { LoginPayload } from '@/models/auth';
import { Endpoints } from '@/services/apis';

const Login: FC = () => {
  const { t } = useTranslation('login');

  const INITIAL_FORM_STATE: LoginPayload = {
    phone: '',
    password: ''
  };

  const FORM_VALIDATION = Yup.object().shape({
    phone: Yup.string()
      .required(t('validations.required'))
      .test('onlyNumbers', t('validations.onlyNumbers'), val => onlyNumbers(`${val}`))
      .test('startWith', t('validations.startWith', { char: '0' }), val => startsWith(`${val}`, '0'))
      .test('len', t('validations.exactNumbersLength', { length: 10 }), val => exactNumbersLength(`${val}`, 10)),
    password: Yup.string()
      .required(t('validations.required'))
      .test('maxLength', t('validations.maxLength', { length: 100 }), value => maxLength(`${value}`, 100))
      .test('onlyAlphanumeric', t('validations.onlyAlphanumeric'), value => onlyAlphanumeric(`${value}`))
  });

  const onLogin = async (formValues: LoginPayload) => {
    const result = await signIn('credentials', { 
      redirect: false,
      formValues
    });
    const user = await Endpoints.auth.profile();
    console.log('useruseruseruseruseruseruseruseruser', result);
    console.log('onLogin ---> result', result);
  };

  return (
    <>
      <PageHeader 
        title={t('login')} 
        subTitle={t('pageDescription')}
      />

      <div className={classes.content}>
        <div className={classes.formWrapper}>

          <AnonymousWizard>

            <Formik 
              initialValues={INITIAL_FORM_STATE}
              validationSchema={FORM_VALIDATION}
              onSubmit={onLogin}
            >
              {() => (
                <Form> 
                  <Container maxWidth={LayoutSettings.maxWidth} disableGutters sx={{padding: 0}}>
                    <Grid container spacing={2} px={0}>
                      <Grid item px={0} xs={12}>
                        <TextField 
                          name='phone' 
                          label={t('phoneNumber')}
                          placeholder='05xxxxxxxx'
                        />        
                      </Grid>                    
                      
                      <Grid item mt={2} xs={12}>
                        <TextField
                          type='password'
                          name='password'
                          label={t('password')}
                        />        
                      </Grid>                      
                      
                      <Grid item xs={12} mt={1}>
                        <Box display='flex' alignItems='center' justifyContent='flex-end'>
                          <Link href='/forgot-password'>
                            <a className={classes.forgotPassword}>
                              {t('didYouForgetPassword')}
                            </a>
                          </Link>
                        </Box>
                      </Grid>

                      <Grid item xs={12} mt={2}>
                        <Button 
                          fullWidth
                          className={classes.submitButton}
                          sx={{py: 1, fontSize: 16, lineHeight: '30px'}} 
                          type='submit'
                          color='primary'
                          variant='contained' 
                        >
                          {t('enter')}
                        </Button>
                      </Grid>

                      <Grid item xs={12} mt={3} display='flex' alignItems='center' justifyContent='center'>
                        <Box 
                          display='flex' 
                          flexWrap='wrap' 
                          alignItems='center' 
                          justifyContent='space-between'
                          className={classes.register}
                        >
                          {t('youDoNotHaveAnAccount')}

                          <Link href='/signup'>
                            <a className={classes.createNew}>
                              {t('createNewAccount')}
                            </a>
                          </Link>
                        </Box>
                      </Grid>
                    </Grid>
                  </Container>
                </Form>
              )}

            </Formik> 
          </AnonymousWizard>
        </div>
      </div>
    </>
  );
};

export default Login;
