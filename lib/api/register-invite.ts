type ApiTResponse<T> = {
  message: string;
  data: T | null;
};

export type RegisterInviteResult =
  | { found: true; discordId: string }
  | { found: false };

export async function lookupRegisterInvite(invitationId: string): Promise<RegisterInviteResult> {
  const id = invitationId.trim();
  if (!id) {
    return { found: false };
  }
  try {
    const url = `/api/register/${encodeURIComponent(id)}`;
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) {
      return { found: false };
    }
    const json = (await res.json()) as ApiTResponse<{ discord_id: string }>;
    const discordId = json.data?.discord_id;
    if (!discordId) {
      return { found: false };
    }
    return { found: true, discordId };
  } catch {
    return { found: false };
  }
}
