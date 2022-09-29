import { ContainerProps } from '@mui/material/Container';

interface Home {
  maxShownSpareParts: number,
  maxShownBrands: number,
}

interface LayoutSettingsModel extends ContainerProps {
  anonymousPath: string;
  redirectPathIfAuthenticated: string;
  redirectPathIfNotAuthenticated: string;
  home: Home
}

const LayoutSettings: LayoutSettingsModel = {
  maxWidth: 'xl',
  anonymousPath: '/',
  redirectPathIfAuthenticated: '/',
  redirectPathIfNotAuthenticated: '/login',
  home: {
    maxShownBrands: 4,
    maxShownSpareParts: 6
  }
};

export {
  LayoutSettings
};