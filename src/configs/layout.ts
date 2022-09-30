import { ContainerProps } from '@mui/material/Container';

interface Home {
  maxShownSpareParts: number,
  maxShownBrands: number,
}

interface AdsAndProducts {
  initialPerPage: number
}

interface LayoutSettingsModel extends ContainerProps {
  anonymousPath: string;
  redirectPathIfAuthenticated: string;
  redirectPathIfNotAuthenticated: string;
  home: Home,
  adsAndProducts: AdsAndProducts
}

const LayoutSettings: LayoutSettingsModel = {
  maxWidth: 'xl',
  anonymousPath: '/',
  redirectPathIfAuthenticated: '/',
  redirectPathIfNotAuthenticated: '/login',
  adsAndProducts: {
    initialPerPage: 10
  },
  home: {
    maxShownBrands: 4,
    maxShownSpareParts: 6
  }
};

export {
  LayoutSettings
};