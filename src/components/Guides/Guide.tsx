import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ReceiptIcon from '@mui/icons-material/Receipt';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import Contract from './Contract'
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Guide() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ width: '90%', borderBottom: 1, borderColor: 'divider' }} margin='auto'>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" sx={{ width: '100%', display: 'flex' }} centered>
          <Tab sx={{ flex: '1' }} icon={<ReceiptIcon />} iconPosition="start" label="FATURAS" {...a11yProps(0)} />
          <Tab sx={{ flex: '1' }} icon={<TrendingUpIcon />} iconPosition="start" label="ANÁLISE" {...a11yProps(1)} />
          <Tab sx={{ flex: '1' }} icon={<ContentPasteIcon />} iconPosition="start" label="CONTRATO" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        Faturas
      </TabPanel>
      <TabPanel value={value} index={1}>
        ANALISE
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Contract />
      </TabPanel>
    </Box>
  );
}
