import { FC, useState } from 'react';
// Next 
import Link from 'next/link';
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
import { CheckboxField, TextField } from '@/components/Form/Controls';
// Utils
import { toast } from 'react-toastify';
import { Endpoints } from '@/services/apis';
import { LayoutSettings } from '@/configs/layout';
import { 
  maxLength, 
  onlyNumbers, 
  startsWith, 
  minLength,
  exactNumbersLength, 
  onlyAlphanumeric, 
} from '@/services/formValidators';
// styles
import classes from '../styles.module.scss';
// Models
import { SignupPayload } from '@/models/auth';
import Message from '@/components/Message';

interface Props {
  // eslint-disable-next-line no-unused-vars
  onRegister?: (data: SignupPayload) => void
}

const Register: FC<Props> = (props) => {
  const { t } = useTranslation('signup');
  const [isLoading, setIsLoading] = useState(false);
  const [errorsList, setErrorsList] = useState<string[] | null>(null);

  const INITIAL_FORM_STATE: SignupPayload = {
    name: '',
    phone: '',
    password: '',
    password_confirmation: '',
    termsAndConditions: false
  };

  const FORM_VALIDATION = Yup.object().shape({
    name: Yup.string()
      .required(t('validations.required'))
      .test('maxLength', t('validations.maxLength', { length: 64 }), value => maxLength(`${value}`, 64))
      .test('minLength', t('validations.minLength', { length: 3 }), value => minLength(`${value}`, 3)),
    phone: Yup.string()
      .required(t('validations.required'))
      .test('onlyNumbers', t('validations.onlyNumbers'), val => onlyNumbers(`${val}`))
      .test('startWith', t('validations.startWith', { char: '0' }), val => startsWith(`${val}`, '0'))
      .test('len', t('validations.exactNumbersLength', { length: 10 }), val => exactNumbersLength(`${val}`, 10)),
    password: Yup.string()
      .required(t('validations.required'))
      .test('minLength', t('validations.minLength', { length: 6 }), value => minLength(`${value}`, 6))
      .test('maxLength', t('validations.maxLength', { length: 100 }), value => maxLength(`${value}`, 100))
      .test('onlyAlphanumeric', t('validations.onlyAlphanumeric'), value => onlyAlphanumeric(`${value}`)),
    password_confirmation: Yup.string()
      .required(t('validations.required'))
      .test('matches', t('shouldMatchPassword'), (value, context) => value === context.parent.password),
    termsAndConditions: Yup.boolean()
      .oneOf([true], t('pleaseAgreeOnTermsAndConditions'))
  });

  const onSignup = async (formValues: SignupPayload) => {
    setIsLoading(true);
    setErrorsList(null);

    const { ok, data } = await Endpoints.auth.register(formValues);

    if(ok) {
      toast(t('accountRegiseredSuccessfully'), { type: 'success' });
      
      if(data && props.onRegister) {
        props.onRegister(formValues);
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

  const getTermsAndConditionLabel = () => {
    return (
      <Box 
        display='flex' 
        flexWrap='wrap' 
        alignItems='center' 
        justifyContent='space-between'
        className={classes.prefix}
      >
        {t('agreeOn')}

        <Link href='/terms-and-condition'>
          <a className={classes.suffix}>
            {t('termsAndConditions')}
          </a>
        </Link>
      </Box>
    );
  };

  return (
    <Formik 
      initialValues={INITIAL_FORM_STATE}
      validationSchema={FORM_VALIDATION}
      onSubmit={onSignup}
    >
      {({values, errors, setFieldValue}) => (
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
                <TextField 
                  name='name' 
                  label={t('name')}
                />        
              </Grid>
            
              <Grid item px={0} xs={12}>
                <TextField 
                  name='phone' 
                  label={t('phoneNumber')}
                  placeholder='05xxxxxxxx'
                />        
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
                <CheckboxField 
                  label={getTermsAndConditionLabel()}
                  name='termsAndConditions'
                  onChange={setFieldValue}
                  checked={values.termsAndConditions}
                  error={Boolean(errors.termsAndConditions)}
                  helperText={errors.termsAndConditions}
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
                  {t('createAnAccount')}
                </LoadingButton>
              </Grid>

              <Grid item xs={12} mt={3} display='flex' alignItems='center' justifyContent='center'>
                <Box 
                  display='flex' 
                  flexWrap='wrap' 
                  alignItems='center' 
                  justifyContent='space-between'
                  className={classes.prefix}
                >
                  {t('youHaveAnAccount')}

                  <Link href='/login'>
                    <a className={classes.suffix}>
                      {t('login')}
                    </a>
                  </Link>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Form>
      )}

    </Formik> 
  );
};

Register.defaultProps = {
  onRegister() {}
};

export default Register;
