import { ReactNode } from 'react';

export interface TabModel {
  label: ReactNode;
  component: ReactNode
}

export interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}