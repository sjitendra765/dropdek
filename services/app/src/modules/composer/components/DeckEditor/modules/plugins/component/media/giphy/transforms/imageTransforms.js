export const getUrl = (node) => {
  let url;
  if (node === undefined || node.settings === undefined) {
    return undefined;
  }
  const { settings } = node;
  if (settings.url) {
    url = settings.url;
  }
  return url;
};

export const getLabel = (node) => {
  if (node === undefined || node.settings === undefined) {
    return undefined;
  }
  const { settings } = node;
  if (settings.label) {
    return settings.label;
  }
  return 'Animation';
};
