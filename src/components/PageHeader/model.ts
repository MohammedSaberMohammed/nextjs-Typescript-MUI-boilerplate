import { ReactNode } from 'react';

export interface PageHeaderProps {
  title?: string;
  subTitle?: string;
  backgroundSrc?: string;
  backgroundAlt?: string;  
  prefixBackgroundSrc?: string;
  prefixBackgroundAlt?: string;
  wrapperClassName?: string;
  showPrefix?: boolean;
  renderAction?: () => ReactNode;
}