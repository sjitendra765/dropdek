export const isUnsplashUrl = (url) => {
  if (url !== undefined) {
    return url.startsWith("https://images.unsplash.com");
  }
};
