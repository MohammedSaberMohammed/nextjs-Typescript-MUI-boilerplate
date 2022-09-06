import { FC } from 'react';
// Validation
import * as Yup from 'yup';
// Models
import { LoginPayload } from '@/models/login';
// Components
import { Field, FieldProps, Form, Formik } from 'formik';
import { SelectAutocompleteField } from '@/components/Form/Controls';
import { Countries } from '@/services/staticLookups';

const Login: FC = () => {
  // const INITIAL_FORM_STATE: LoginPayload = {
  const INITIAL_FORM_STATE: any = {
    phoneNumber: '',
    password: '',
    rememberMe: false,
    koko: 'AD'
  };

  const FORM_VALIDATION = Yup.object().shape({
    // phoneNumber: Yup.number()
    //   .required()
    //   .integer('No decimals')
    //   .typeError('onlyNumber')
    //   .test('len', 'Must be exactly 9 characters', val => `${val}`.length === 9),
    koko: Yup.string()
      .required()
  });

  const onLogin = (values: LoginPayload) => {
    console.log('==================== Login ===================', {values});
    
  };

  return (
    <div>
      <Formik 
        initialValues={INITIAL_FORM_STATE}
        validationSchema={FORM_VALIDATION}
        onSubmit={onLogin}
      >
        {() => (
          <Form> 

            {/* <TextField 
        name='phoneNumber' 
        label='phoneNumber'
        placeholder='5xxxxxxxx'
      />         */}
        
            <Field name='koko'>
              {(fieldProps: FieldProps) => (
                <SelectAutocompleteField
                  name='koko' 
                  label='koko'
                  lookup={Countries}
                  fieldProps={fieldProps}
                  value={fieldProps.field.value}
                  onChange={(name: string, value: string) => fieldProps.form.setFieldValue(name, value)}
                />
              )}
            </Field>
            {/* 
          <Field
            name="koko"
            render={({ field, form: { touched, errors } }) => (
              <div>
                <input {...field} type="text" placeholder="lastName" />
                {touched[field.name] &&
         errors[field.name] && <div className="error">{errors[field.name]}</div>}
              </div>
            )}
          /> */}
            <button type='submit'>asdasdasdasd</button>
          </Form>
        )}

      </Formik> 
    </div>
  );
};

export default Login;
