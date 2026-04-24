'use client';
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import SectionInput, { SubmitPayload } from '@/app/components/SectionInput';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';

const TAB_ITEMS = [
  { type: 'game', label: '查詢遊戲' },
  { type: 'brand', label: '查詢公司品牌' },
  { type: 'character', label: '查詢角色' },
  { type: 'creator', label: '查詢創作者' },
  { type: 'music', label: '查詢音樂' },
] as const;

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
      id={`search-tabpanel-${index}`}
      aria-labelledby={`search-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

export default function Home() {
  const [tab, setTab] = React.useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => setTab(newValue);

  const handleSubmit = (type: string, payload: SubmitPayload) => {
    if (!payload.keyword) {
      return;
    }
    console.log('搜尋類型:', type);
    console.log('搜尋參數:', payload);
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h4">Galgame 資料查詢</Typography>
        <Typography variant="body1" color="text.secondary">
          以遊戲、品牌、角色、創作者與音樂為維度快速檢索，支援來源與列表模式切換。
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Chip label="批評空間" variant="outlined" />
          <Chip label="VNDB" variant="outlined" />
          <Chip label="Bangumi" variant="outlined" />
        </Box>
      </Box>

      <Box sx={{ mt: 3, border: '1px solid', borderColor: 'divider', borderRadius: 4, overflow: 'hidden' }}>
        <Box sx={{ px: { xs: 1, md: 2 }, pt: 1, backgroundColor: 'rgba(255,255,255,0.02)' }}>
          <Tabs value={tab} onChange={handleTabChange} variant="scrollable" scrollButtons="auto">
            {TAB_ITEMS.map((item) => (
              <Tab key={item.type} label={item.label} />
            ))}
          </Tabs>
        </Box>

        <Box sx={{ p: { xs: 1, md: 2 } }}>
          {TAB_ITEMS.map((item, index) => (
            <TabPanel key={item.type} value={tab} index={index}>
              <SectionInput
                placeholder="請輸入關鍵字"
                type={item.type}
                resourceOptions={true}
                listOptions={true}
                onSubmit={(payload) => handleSubmit(item.type, payload)}
              />
            </TabPanel>
          ))}
        </Box>
      </Box>
    </Container>
  );
}
