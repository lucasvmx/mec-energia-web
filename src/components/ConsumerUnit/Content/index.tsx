import { SyntheticEvent, useState } from "react";
import { Box, Tab, Tabs } from "@mui/material";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import ConsumerUnitContractContent from "@/components/ConsumerUnit/Content/Contract";
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { InvoiceTable } from "./InvoiceTable";

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box pt={3}>{children}</Box>}
    </div>
  );
};

const ConsumerUnitContent = () => {
  const [selectedTab, setSelectedTab] = useState(2);

  const handleTabChange = (event: SyntheticEvent, tabIndex: number) => {
    setSelectedTab(tabIndex);
  };

  return (
    <>
      <Tabs value={selectedTab} variant="fullWidth" onChange={handleTabChange}>
        <Tab
          icon={<ReceiptLongIcon />}
          label="Faturas"
          iconPosition="start" />
        <Tab label="Análise" disabled />
        <Tab
          icon={<ContentPasteIcon />}
          label="Contrato"
          iconPosition="start"
        />
      </Tabs>

      <TabPanel value={selectedTab} index={0}>
        <InvoiceTable />
      </TabPanel>

      <TabPanel value={selectedTab} index={2}>
        <ConsumerUnitContractContent />
      </TabPanel>
    </>
  );
};

export default ConsumerUnitContent;
