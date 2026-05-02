'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

type UserProfile = {
  id: string;
  name: string;
  email: string;
  role: string;
  plan: string;
  createdAt: string;
  lastLoginAt: string;
  bio: string;
  tags: string[];
};

const USER_PROFILE: UserProfile = {
  id: 'u_1001',
  name: 'Peter',
  email: 'peter@example.com',
  role: 'Admin',
  plan: 'Pro',
  createdAt: '2025-05-01',
  lastLoginAt: '2026-04-25 23:48',
  bio: 'KuroHelper 的管理者，主要負責資料維護與內容品質。',
  tags: ['資料維護', '營運管理', '內容審核'],
};

export default function UserPage() {
  const user = React.useMemo(() => USER_PROFILE, []);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Card elevation={0} sx={{ borderRadius: 4, border: '1px solid', borderColor: 'divider' }}>
        <CardContent>
          <Stack spacing={3}>
            <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
              <Avatar sx={{ width: 56, height: 56 }}>{user.name.slice(0, 1).toUpperCase()}</Avatar>
              <Box>
                <Typography variant="h5">{user.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {user.email}
                </Typography>
              </Box>
            </Stack>

            <Divider />

            <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
              <Chip label={`角色：${user.role}`} />
              <Chip label={`方案：${user.plan}`} color="secondary" />
              <Chip label={`User ID：${user.id}`} variant="outlined" />
            </Stack>

            <Box>
              <Typography variant="subtitle2" gutterBottom>
                帳號資訊
              </Typography>
              <Typography variant="body2" color="text.secondary">
                建立時間：{user.createdAt}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                最後登入：{user.lastLoginAt}
              </Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2" gutterBottom>
                個人簡介
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {user.bio}
              </Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2" gutterBottom>
                標籤
              </Typography>
              <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
                {user.tags.map((tag) => (
                  <Chip key={tag} label={tag} variant="outlined" />
                ))}
              </Stack>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
}
