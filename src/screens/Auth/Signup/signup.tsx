import { FC, useState } from 'react';
// Translations
import { useTranslation } from 'next-i18next';
// Components
import VerifyOTPForm from './forms/verifyOtp';
import RegisterForm from './forms/register';
import PageHeader from '@/components/PageHeader/pageHeader';
import AnonymousWizard from '@/components/AnonymousWizard/anonymousWizard';
// styles
import classes from './styles.module.scss';
// Models
import { SignupPayload } from '@/models/auth';

const Signup: FC = () => {
  const { t } = useTranslation('signup');
  const [registeredData, setRegisteredData] = useState<SignupPayload | null>(null);

  const onRegister = (data: SignupPayload) => setRegisteredData(data);

  return (
    <>
      <PageHeader 
        title={registeredData ? t('activateYourAccount') : t('signup')} 
        subTitle={registeredData ? t('enterOtpSentToYourPhone') : t('pageDescription')}
      />

      <div className={classes.content}>
        <div className={classes.formWrapper}>

          <AnonymousWizard>
            {!registeredData ? (
              <VerifyOTPForm data={registeredData} />
            ) : (
              <RegisterForm  onRegister={onRegister} />
            )}
          </AnonymousWizard>

        </div>
      </div>
    </>
  );
};

export default Signup;
