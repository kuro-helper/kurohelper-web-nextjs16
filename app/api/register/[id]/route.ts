import type { NextRequest } from 'next/server';

import { proxyToKurohelperApi } from '@/lib/kurohelper-api';

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  const registerId = encodeURIComponent(id);
  return proxyToKurohelperApi(`/user/register-link?register_id=${registerId}`, {
    method: 'GET',
  });
}
