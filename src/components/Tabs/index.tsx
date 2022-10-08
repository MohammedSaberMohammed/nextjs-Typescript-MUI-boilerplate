import { FC, SyntheticEvent, useState } from 'react';
// MUI
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
// Components
import TabPanel from './tabPanel';
// Models
import { TabModel } from '@/models/components/tabs';

const a11yProps = (index: number) => {
  return {
    id: `baseTab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
};

interface Props {
  tabs: TabModel[]
}

const BaseTabs: FC<Props> = ({ tabs }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (_event: SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={selectedTab} onChange={handleChange} aria-label="base tabs">
          {tabs.map((tab: TabModel, index) => (
            <Tab 
              key={`${tab.label}_${index}`} 
              label={tab.label} 
              {...a11yProps(index)} 
            />
          ))}
        </Tabs>
      </Box>

      {tabs.map((tab: TabModel, index: number) => (
        <TabPanel 
          key={`${tab.label}_${index}`} 
          value={selectedTab} 
          index={index}
        >
          {tab.component}
        </TabPanel>
      ))}
    </Box>
  );
};

export default BaseTabs;