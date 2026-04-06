export const formatUrl = (url: string) => {
  if (!url) return "";
  const u = url.toString().trim();
  return u.startsWith("http") ? u : `https://${u}`;
};

export const getFavicon = (url: string) => {
  try {
    return `https://www.google.com/s2/favicons?domain=${new URL(formatUrl(url)).hostname}&sz=128`;
  } catch {
    return null;
  }
};
