import { FC, useMemo, useState } from 'react';
// Translations
import { useTranslation } from 'next-i18next';
// Components
import VerifyOTPForm from './forms/verifyOtp';
import ResetPasswordForm from './forms/resetPassword';
import PhoneVerificationForm from './forms/phoneVerification';
import PageHeader from '@/components/PageHeader/pageHeader';
import AnonymousWizard from '@/components/AnonymousWizard/anonymousWizard';
// styles
import classes from './resetPassword.module.scss';
// Models
import { ResetPasswordSendOTPPayload, ResetPasswordValidateOTPPayload, SignupPayload } from '@/models/auth';

const ResetPassword: FC = () => {
  const { t } = useTranslation('reset-password');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [registeredData, setRegisteredData] = useState<SignupPayload | null>(null);

  const onValidatePhoneNumber = (data: ResetPasswordSendOTPPayload) => setPhone(data.phone);
  
  const onValidateOTP = (data: ResetPasswordValidateOTPPayload) => setCode(data.code);

  const visibleViews = useMemo(() => ({
    phoneForm: !phone, 
    otpForm: phone && !code, 
    passwordForm: phone && code, 
  }), [phone, code]);

  const subTitle = useMemo(() => {
    const { otpForm, phoneForm } = visibleViews;

    if(otpForm) {
      return t('pageDescription');
    } else if (phoneForm) {
      return t('enterOtpToResetPassword');
    }

    return t('enterNewPasswordToLogin');
  }, [visibleViews]);

  return (
    <>
      <PageHeader 
        title={t('resetPassword')} 
        subTitle={subTitle}
      />
      
      <div className={classes.content}>
        <div className={classes.formWrapper}>

          <AnonymousWizard>
            {visibleViews.phoneForm && <PhoneVerificationForm onValidate={onValidatePhoneNumber} />}

            {visibleViews.otpForm && <VerifyOTPForm phone={phone} onValidate={onValidateOTP} />}
            
            {visibleViews.passwordForm && (
              <ResetPasswordForm 
                code={code} 
                phone={phone}
              />
            )}
          </AnonymousWizard>

        </div>
      </div>
    </>
  );
};

export default ResetPassword;
