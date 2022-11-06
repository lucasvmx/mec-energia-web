import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ReceiptIcon from '@mui/icons-material/Receipt';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import DistributorProps from '../../interfaces/IDistributor';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
interface SubGroup {
  subgroup: number;
  pending: boolean;
}

const mockedDistributor: Array<DistributorProps> = [
  {
    id: 1,
    title: "CEMIG",
    cnpj: "07.523.555/0001-67",
    disabled: false,
    linkedUC: ['Campos Planaltina'],
    tariffs: [
      {
        subgroup: 4,
        start: new Date("2021-10-21"),
        end: new Date("2023-10-21"),
      }
    ]
  },
  {
    id: 2,
    title: "Enel",
    cnpj: "07.523.555/0001-61",
    disabled: false,
    linkedUC: []
  },
  {
    id: 3,
    title: "Neoenergia",
    cnpj: "07.523.555/0001-62",
    disabled: false,
    linkedUC: ['Fazenda Agua Limpa'],
    tariffs: [
      {
        subgroup: 4,
        start: new Date("2021-10-21"),
        end: new Date("2023-10-21"),
      },
      {
        subgroup: 3,
        start: new Date("2021-05-20"),
        end: new Date("2022-10-21"),
      },
      {
        subgroup: 1,
        start: new Date("2021-05-20"),
        end: new Date("2022-10-21"),
      }
    ],
  },
  {
    id: 4,
    title: "CEB",
    cnpj: "07.523.555/0001-63",
    disabled: true,
  },
];

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
}

export default function Guide() {
  const [value, setValue] = useState(0);
  const [subgroups, setSubgroups] = useState(Array<SubGroup>)
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [currentDist, setCurrentDist] = useState<DistributorProps | undefined>()

  const getAllSubgroups = () => {
    const sub: Array<SubGroup> = [];
    currentDist?.tariffs?.forEach(tariff => {
      if (sub.findIndex(sub => sub.subgroup === tariff.subgroup) === -1) {
        sub.push({
          subgroup: tariff.subgroup,
          pending: tariff.end < new Date()
        });
      }
      else {
        const index = sub.findIndex(sub => sub.subgroup === tariff.subgroup);
        const pending = tariff.end < new Date()
        if (pending && !sub[index].pending) sub[index].pending = pending;
      }
    })
    setSubgroups(sub)

  }

  useEffect(() => {
    setLoading(true)
    const { id } = router.query
    setCurrentDist(mockedDistributor[Number(id) - 1])
    getAllSubgroups()
    setLoading(false)
  }, [])

  useEffect(() => {
    setLoading(true);
    const { id } = router.query
    setCurrentDist(mockedDistributor[Number(id) - 1])
    setLoading(false)
  }, [router.asPath])

  useEffect(() => {
    setLoading(true)
    getAllSubgroups()
    setLoading(false)
  }, [currentDist])

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      {!loading && (
        <>
          {subgroups.length === 0 && (
            <Typography>NENHUMA UNIDADE CONSUMIDORA</Typography>
          )}
          <Box sx={{ width: '190%', borderBottom: 1, borderColor: 'divider' }} margin='auto'>
            <Tabs value={value} onChange={handleChange} aria-label="subgroups" sx={{ width: '100%', display: 'flex' }} centered>
              {subgroups.map(sub => {
                return <Tab key={sub.subgroup} sx={{ flex: '1' }} label={`Subgrupo ${sub.subgroup}`} {...a11yProps(0)} />
              })}
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            Faturas
          </TabPanel>
          <TabPanel value={value} index={1}>
            ANALISE
          </TabPanel>
          <TabPanel value={value} index={2}>
          </TabPanel>
        </>
      )
      }
    </Box >
  );
}
