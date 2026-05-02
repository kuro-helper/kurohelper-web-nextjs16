'use client';

import { usePathname } from 'next/navigation';

import RegisterForm from '@/app/register/[id]/RegisterForm';

type RegisterFormClientProps = {
  invitationId: string;
};

/**
 * Next.js 路由快取可能沿用 client 樹：`key={pathname}` 在路徑變更時強制重新掛載，
 * 底下的 `useEffect` 會再跑（等同進頁 onMounted）。
 */
export default function RegisterFormClient({ invitationId }: RegisterFormClientProps) {
  const pathname = usePathname();

  return <RegisterForm key={pathname} invitationId={invitationId} />;
}
