import { FC } from 'react';
// Forms - Validation
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
// Translations
import { useTranslation } from 'next-i18next';
// import { LoginPayload } from '@/models/login';
// Components
import PageHeader from '@/components/PageHeader/pageHeader';
import AnonymousWizard from '@/components/AnonymousWizard/anonymousWizard';
import { TextField } from '@/components/Form/Controls';
// Utils
// styles
import classes from './styles.module.scss';
import { Container, Grid } from '@mui/material';
import { LayoutSettings } from '@/configs/layout';

const Login: FC = () => {
  const { t } = useTranslation();
  // const INITIAL_FORM_STATE: LoginPayload = {
  const INITIAL_FORM_STATE: any = {
    phoneNumber: '',
    password: '',
    rememberMe: false,
    koko: ''
  };

  const FORM_VALIDATION = Yup.object().shape({
    phoneNumber: Yup.number()
      .required()
      .integer('No decimals')
      .typeError('onlyNumber')
      .test('len', 'Must be exactly 9 characters', val => `${val}`.length === 9),
    koko: Yup.string()
      .required()
  });

  // const onLogin = (values: LoginPayload) => {
  //   console.log('==================== Login ===================', {values});
    
  // };
  const onLogin = () => {
    
  };

  return (
    <>

      <PageHeader title={t('login')} />

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
                      <Grid item  px={0} xs={12}>
                        <TextField 
                          name='phoneNumber' 
                          label='phoneNumber'
                          placeholder='5xxxxxxxx'
                        />        
                      </Grid>                    
                      
                      <Grid item xs={12}>
                        <TextField
                          type='password'
                          name='phoneNumber' 
                          label='phoneNumber'
                          placeholder='5xxxxxxxx'
                        />        
                      </Grid>
                    </Grid>
                  </Container>
                  <button type='submit'>asdasdasdasd</button>
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
