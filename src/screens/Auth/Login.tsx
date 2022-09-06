import { FC } from 'react';
// Validation
import * as Yup from 'yup';
// Models
import { LoginPayload } from '@/models/login';
// Components
import { Form, Formik } from 'formik';
import { SelectAutocompleteField, TextField } from '@/components/Form/Controls';

const Login: FC = () => {
  const INITIAL_FORM_STATE: LoginPayload = {
    phoneNumber: '',
    password: '',
    rememberMe: false
  };

  const FORM_VALIDATION = Yup.object().shape({
    phoneNumber: Yup.number()
      .required()
      .integer('No decimals')
      .typeError('onlyNumber')
      .test('len', 'Must be exactly 9 characters', val => `${val}`.length === 9)
  });

  const onLogin = (values: LoginPayload) => {
    console.log({values});
    
  };

  return (
    <Formik 
      initialValues={INITIAL_FORM_STATE}
      validationSchema={FORM_VALIDATION}
      onSubmit={onLogin}
    >
      <Form>

        <TextField 
          name='phoneNumber' 
          label='phoneNumber'
          placeholder='5xxxxxxxx'
        />        
        
        <SelectAutocompleteField 
          multiple
          disableClearable
          freeSolo
          name='phoneNumber' 
          label='phoneNumber'
          lookup={[{id: 1, label: 'sdfsdf'}]}
          // placeholder='5xxxxxxxx'
        />
        <button type='submit'>asdasdasdasd</button>
      </Form>
    </Formik>
  );
};

export default Login;
