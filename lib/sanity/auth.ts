const resolveProjectId = () => {
  return process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
};

type SanityUser = {
  id?: string;
  displayName?: string;
  email?: string;
};

export const getSanityUser = async (token: string): Promise<SanityUser | null> => {
  const projectId = resolveProjectId();
  if (!projectId) {
    return null;
  }

  const response = await fetch(`https://${projectId}.api.sanity.io/v1/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    cache: "no-store"
  });

  if (!response.ok) {
    return null;
  }

  const data = (await response.json()) as SanityUser;
  return data;
};
