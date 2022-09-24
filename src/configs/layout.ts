import { ContainerProps} from '@mui/material/Container';

interface LayoutSettingsModel extends ContainerProps {
  anonymousPath: string;
  redirectPathIfAuthenticated: string;
  redirectPathIfNotAuthenticated: string;
}

const LayoutSettings: LayoutSettingsModel = {
  maxWidth: 'xl',
  anonymousPath: '/',
  redirectPathIfAuthenticated: '/',
  redirectPathIfNotAuthenticated: '/login',
};

export {
  LayoutSettings
};