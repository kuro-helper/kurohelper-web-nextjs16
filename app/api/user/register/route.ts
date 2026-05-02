import type { NextRequest } from 'next/server';

import { KUROHELPER_MAX_BODY_BYTES, proxyToKurohelperApi } from '@/lib/kurohelper-api';

export async function POST(request: NextRequest) {
  const contentLength = request.headers.get('content-length');
  if (contentLength !== null && Number(contentLength) > KUROHELPER_MAX_BODY_BYTES) {
    return Response.json({ message: '請求內容過大', data: null }, { status: 413 });
  }

  const raw = await request.text();
  if (raw.length > KUROHELPER_MAX_BODY_BYTES) {
    return Response.json({ message: '請求內容過大', data: null }, { status: 413 });
  }

  try {
    JSON.parse(raw);
  } catch {
    return Response.json({ message: 'JSON 格式錯誤', data: null }, { status: 400 });
  }

  return proxyToKurohelperApi('/user/register', {
    method: 'POST',
    body: raw,
    headers: { 'Content-Type': 'application/json' },
  });
}
