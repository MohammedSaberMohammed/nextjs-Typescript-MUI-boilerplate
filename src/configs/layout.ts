import { ContainerProps } from '@mui/material/Container';

interface LayoutSettingsModel extends ContainerProps {
  anonymousPath: string;
  redirectPathIfAuthenticated: string;
  redirectPathIfNotAuthenticated: string;
  maxShownSpareParts: number
}

const LayoutSettings: LayoutSettingsModel = {
  maxWidth: 'xl',
  anonymousPath: '/',
  redirectPathIfAuthenticated: '/',
  redirectPathIfNotAuthenticated: '/login',
  maxShownSpareParts: 6
};

export {
  LayoutSettings
};