'use client';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import SendIcon from '@mui/icons-material/Send';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export interface SubmitPayload {
  keyword: string;
  source?: string | null;
  isListSearch: boolean;
}

interface SectionInputProps {
  placeholder: string;
  resourceOptions: boolean;
  listOptions: boolean;
  type: 'game' | 'brand' | 'character' | 'creator' | 'music';
  onSubmit: (payload: SubmitPayload) => void;
}

export default function SectionInput({
  placeholder,
  resourceOptions,
  listOptions,
  type,
  onSubmit,
}: SectionInputProps) {
  const [text, setText] = React.useState('');
  const [checked, setChecked] = React.useState(false);
  const [selected, setSelected] = React.useState<string>('');

  const getItems = (): string[] => {
    const gameSource: string[] = ['批評空間', 'VNDB'];
    const brandSource: string[] = ['批評空間', 'VNDB'];
    const characterSource: string[] = ['批評空間', 'VNDB', 'Bangumi'];
    const creatorSource: string[] = ['批評空間'];
    const musicSource: string[] = ['批評空間'];

    switch (type) {
      case 'game':
        return gameSource;
      case 'brand':
        return brandSource;
      case 'character':
        return characterSource;
      case 'creator':
        return creatorSource;
      case 'music':
        return musicSource;
      default:
        return [];
    }
  };

  const items = getItems();

  const handleSubmit = () => {
    if (!text.trim()) {
      return;
    }

    onSubmit({
      keyword: text.trim(),
      source: selected || null,
      isListSearch: checked,
    });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <Card sx={{ width: '100%', maxWidth: 760, mt: { xs: 2, md: 6 }, borderRadius: 4 }}>
        <CardContent sx={{ p: { xs: 2.5, md: 3.5 } }}>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            輸入關鍵字開始查詢
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <TextField
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={placeholder}
              variant="outlined"
              size="medium"
              fullWidth
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSubmit();
                }
              }}
            />
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={handleSubmit}
              sx={{
                minWidth: 48,
                width: 48,
                height: 48,
                borderRadius: '50%',
                ml: 1,
              }}
            >
              <SendIcon />
            </Button>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { xs: 'stretch', sm: 'center' },
              width: '100%',
              mt: 2,
              gap: 1.5,
            }}
          >
            {resourceOptions && (
              <FormControl variant="outlined" size="medium" sx={{ flex: 2 }}>
                <InputLabel id="source-select-label" shrink>
                  選擇來源
                </InputLabel>
                <Select
                  labelId="source-select-label"
                  value={selected}
                  onChange={(e) => setSelected(e.target.value)}
                  label="選擇來源"
                  displayEmpty
                  renderValue={(value) => {
                    if (!value) {
                      return '';
                    }
                    return value;
                  }}
                >
                  <MenuItem value="">
                    <em>未選擇</em>
                  </MenuItem>
                  {items.map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}

            {listOptions && (
              <FormControlLabel
                control={<Checkbox checked={checked} onChange={(e) => setChecked(e.target.checked)} />}
                label="列表搜尋"
                sx={{ flex: 1, ml: 0 }}
              />
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
