export const getCloudflareLink = (path: string): string =>
  `${import.meta.env.VITE_R2_BASE_URL}/${path}`;
