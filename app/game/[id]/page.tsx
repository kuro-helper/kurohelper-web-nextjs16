'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

type GameDetail = {
  id: string;
  title: string;
  originalTitle?: string;
  brand: string;
  releaseDate?: string;
  platforms: string[];
  genres: string[];
  score?: number;
  description: string;
};

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

const WRAP_STACK_SX = { flexWrap: 'wrap' };

const FALLBACK_DATA: Omit<GameDetail, 'id'> = {
  title: 'Game Title',
  originalTitle: 'Game Original Title',
  brand: 'Brand',
  releaseDate: 'TBA',
  platforms: ['Windows'],
  genres: ['Test', 'Test2'],
  score: 0,
  description:
    'This is defalut information.',
};

export default function GameDetailPage({ params }: PageProps) {
  const resolvedParams = React.use(params);
  const { id } = resolvedParams;
  const game: GameDetail = {
    id,
    ...FALLBACK_DATA,
    title: `Game #${id}`,
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Card
        elevation={0}
        sx={{
          borderRadius: 4,
          border: '1px solid',
          borderColor: 'divider',
          background:
            'linear-gradient(160deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
        }}
      >
        <CardContent>
          <Stack spacing={2.5}>
            <Typography variant="overline" color="text.secondary">
              Game ID: {game.id}
            </Typography>

            <Box>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                {game.title}
              </Typography>
              {game.originalTitle && (
                <Typography variant="subtitle1" color="text.secondary">
                  {game.originalTitle}
                </Typography>
              )}
            </Box>

            <Divider />

            <Stack direction="row" spacing={1} useFlexGap sx={WRAP_STACK_SX}>
              <Chip label={`品牌：${game.brand}`} />
              <Chip label={`發售日：${game.releaseDate ?? '未知'}`} />
              <Chip label={`評分：${game.score ?? 0}`} />
            </Stack>

            <Box>
              <Typography variant="subtitle2" gutterBottom>
                支援平台
              </Typography>
              <Stack direction="row" spacing={1} useFlexGap sx={WRAP_STACK_SX}>
                {game.platforms.map((platform) => (
                  <Chip key={platform} label={platform} variant="outlined" />
                ))}
              </Stack>
            </Box>

            <Box>
              <Typography variant="subtitle2" gutterBottom>
                類型
              </Typography>
              <Stack direction="row" spacing={1} useFlexGap sx={WRAP_STACK_SX}>
                {game.genres.map((genre) => (
                  <Chip key={genre} label={genre} color="secondary" variant="outlined" />
                ))}
              </Stack>
            </Box>

            <Box>
              <Typography variant="subtitle2" gutterBottom>
                遊戲簡介
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {game.description}
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
}
