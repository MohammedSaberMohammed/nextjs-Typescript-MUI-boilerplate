import { FC } from 'react';
// Next 
import Link from 'next/link';
import { signIn } from 'next-auth/react';
// MUI
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import FormControlLabel from '@mui/material/FormControlLabel';
// Forms - Validation
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
// Translations
import { useTranslation } from 'next-i18next';
// import { LoginPayload } from '@/models/login';
// Components
import { TextField } from '@/components/Form/Controls';
import PageHeader from '@/components/PageHeader/pageHeader';
import AnonymousWizard from '@/components/AnonymousWizard/anonymousWizard';
// Utils
import { LayoutSettings } from '@/configs/layout';
// styles
import classes from './styles.module.scss';

const Login: FC = () => {
  const { t } = useTranslation('login');
  // const INITIAL_FORM_STATE: LoginPayload = {
  const INITIAL_FORM_STATE: any = {
    phoneNumber: '',
    password: '',
    rememberMe: false,
  };

  const FORM_VALIDATION = Yup.object().shape({
    phoneNumber: Yup.number()
      .required(t('validations.required'))
      .integer(t('validations.onlyIntegers'))
      .typeError(t('validations.onlyNumbers'))
      .test('len', t('validations.exactNumbersLength', { length: 9 }), val => `${val}`.length === 9),
    password: Yup.string()
      .required(t('validations.required'))
  });

  // const onLogin = (values: LoginPayload) => {
  //   console.log('==================== Login ===================', {values});
    
  // };
  const onLogin = async (formValues: any) => {
    const result = await signIn('credentials', { 
      redirect: false,
      formValues
    });
    console.log('onLogin', formValues, result);
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
              {({values, handleChange}) => (
                <Form> 
                  <Container maxWidth={LayoutSettings.maxWidth} disableGutters sx={{padding: 0}}>
                    <Grid container spacing={2} px={0}>
                      <Grid item  px={0} xs={12}>
                        <TextField 
                          name='phoneNumber' 
                          label={t('phoneNumber')}
                          placeholder='5xxxxxxxx'
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
                        <Box display='flex' flexWrap='wrap' alignItems='center' justifyContent='space-between'>
                          <FormControlLabel
                            label={t('rememberMe')}
                            className={classes.rememberMe}
                            control={
                              <Checkbox
                                color='secondary'
                                name='rememberMe'
                                value={values.rememberMe} 
                                onChange={handleChange}
                                inputProps={{
                                  'aria-label': 'Remember Me',
                                }}
                              />
                            }
                          />

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
