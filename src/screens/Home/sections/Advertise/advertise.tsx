import { FC } from 'react';
// Next
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
// Mui
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
// Components
import PageHeader from '@/components/PageHeader/pageHeader';
// Utils
import { LayoutSettings } from '@/configs/layout';
// Styles
import classes from './advertise.module.scss';

const Advertise: FC = () => {
  const { t } = useTranslation('home');

  return (
    <Container maxWidth={LayoutSettings.maxWidth}>
      <PageHeader 
        showPrefix={false}
        title={t('advertiseTitle')}
        wrapperClassName={classes.boxWrapper}
        subTitle={` ${t('advertiseDescription')} Biker`}
        renderAction={() => (
          <Link href='/advertise' passHref>
            <Button
              variant="contained"
              color='secondary'
              className={classes.addBtn} 
              startIcon={(
                <Image 
                  src='/icons/add.svg' 
                  width={26} 
                  height={26} 
                  alt='create an advertisment' 
                />
              )}
            >
              {t('addAdvertisment')}
            </Button>
          </Link>
        )}
      />
    </Container>
  );
};

export default Advertise;
