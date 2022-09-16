import { FC } from 'react';
// Forms - Validation
import * as Yup from 'yup';
import { Field, FieldProps, Form, Formik } from 'formik';
// Translations
import { useTranslation } from 'next-i18next';
// Models
// import { LoginPayload } from '@/models/login';
// Components
import PageHeader from '@/components/PageHeader/pageHeader';

import { SelectAutocompleteField } from '@/components/Form/Controls';
import { Countries } from '@/services/staticLookups';
// styles
import classes from './styles.module.scss';
import { SelectAutocompleteValue } from '@/models/SelectAutocomplete';

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
    // phoneNumber: Yup.number()
    //   .required()
    //   .integer('No decimals')
    //   .typeError('onlyNumber')
    //   .test('len', 'Must be exactly 9 characters', val => `${val}`.length === 9),
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
                      name={fieldProps.field.name} 
                      label='koko'
                      lookup={Countries}
                      fieldProps={fieldProps}
                      value={fieldProps.field.value}
                      onChange={(name: string, value: SelectAutocompleteValue) => {
                        console.log({name, value});
                        fieldProps.form.setFieldValue(name, value);
                        
                      }}
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
      </div>
    </>
  );
};

export default Login;
