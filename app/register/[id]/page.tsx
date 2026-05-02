import RegisterFormClient from '@/app/register/[id]/RegisterFormClient';

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function RegisterPage({ params }: PageProps) {
  const { id } = await params;

  return <RegisterFormClient invitationId={id} />;
}
