'use client';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Link from 'next/link';
import Divider from '@mui/material/Divider';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import Tooltip from '@mui/material/Tooltip';
import { useThemeMode } from '@/app/components/ThemeModeContext';

const NAV_ITEMS = [
  { href: '/', label: '首頁' },
  { href: '/game/1001', label: '遊戲詳情範例' },
  { href: '/user', label: '使用者資料' },
] as const;

export default function AppBarWithDrawer() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [loginDialogOpen, setLoginDialogOpen] = React.useState(false);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { mode, toggleMode } = useThemeMode();

  const handleLogin = () => {
    setLoginDialogOpen(false);
    // TODO: 實現登入邏輯
  };

  return (
    <>
      {/* AppBar */}
      <AppBar
        position="fixed"
        color="transparent"
        elevation={0}
        sx={{
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Toolbar sx={{ minHeight: 64 }}>
          <IconButton
            color="inherit"
            aria-label="menu"
            edge="start"
            onClick={() => setDrawerOpen(true)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component={Link}
            href="/"
            sx={{ flexGrow: 0, textDecoration: 'none', color: 'inherit' }}
          >
            KuroHelper
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Tooltip title={mode === 'dark' ? '切換淺色模式' : '切換深色模式'}>
            <IconButton
              color="inherit"
              onClick={toggleMode}
              sx={{
                mr: 1,
                border: '1px solid',
                borderColor: 'divider',
                width: 36,
                height: 36,
              }}
            >
              {mode === 'dark' ? <LightModeRoundedIcon fontSize="small" /> : <DarkModeRoundedIcon fontSize="small" />}
            </IconButton>
          </Tooltip>
          <Button color="inherit" component={Link} href="/game/1001" sx={{ mr: 1 }}>
            遊戲頁展示
          </Button>
          <Button color="inherit" onClick={() => setLoginDialogOpen(true)}>
            登入
          </Button>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        slotProps={{
          paper: {
            sx: {
              width: 350,
            },
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6">KuroHelper</Typography>
          <Typography variant="body2" color="text.secondary">
            快速導覽
          </Typography>
        </Box>
        <Divider />
        <List>
          {NAV_ITEMS.map((item) => (
            <ListItem key={item.href} disablePadding>
              <ListItemButton component={Link} href={item.href} onClick={() => setDrawerOpen(false)}>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Login Dialog */}
      <Dialog open={loginDialogOpen} onClose={() => setLoginDialogOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>登入</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="帳號"
            type="text"
            fullWidth
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ mt: 2 }}
          />
          <TextField
            margin="dense"
            label="密碼"
            type="password"
            fullWidth
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLoginDialogOpen(false)}>取消</Button>
          <Button onClick={handleLogin} variant="contained">
            登入
          </Button>
        </DialogActions>
      </Dialog>

      {/* 避免 AppBar 遮住頁面 */}
      <Toolbar />
    </>
  );
}
