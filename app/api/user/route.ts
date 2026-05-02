import type { NextRequest } from 'next/server';

import { proxyToKurohelperApi } from '@/lib/kurohelper-api';

export async function GET(request: NextRequest) {
  const search = request.nextUrl.searchParams.toString();
  const path = search ? `/user?${search}` : '/user';
  return proxyToKurohelperApi(path, { method: 'GET' });
}
