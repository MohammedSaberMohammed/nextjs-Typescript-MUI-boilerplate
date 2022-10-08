import { FC } from 'react';
// MUI
import Box from '@mui/material/Box';
// Models
import { TabPanelProps } from '@/models/components/tabs';

const TabPanel: FC<TabPanelProps> = (props) =>  {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`baseTab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>{children}</Box>
      )}
    </div>
  );
};

export default TabPanel;