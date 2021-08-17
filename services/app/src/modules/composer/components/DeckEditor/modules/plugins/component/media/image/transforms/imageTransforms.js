import { apiHost } from "../../../../../../../../../../App";

const IMAGE_API_PREFIX = '/assets';

export const getUrl = (node) => {
  let url;
  if (node === undefined || node.settings === undefined) {
    return undefined;
  }
  const { settings } = node;
  if (settings.url) {
    url = settings.url;
  }
  // Interpret relative URLs relative to the API service.
  if (url !== undefined && url.startsWith(`${IMAGE_API_PREFIX}/`)) {
    url = `${apiHost()}${url}`;
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
  return 'image.png';
};

export const getColors = (node) => {
  if (node === undefined || node.settings === undefined) {
    return undefined;
  }
  const { settings } = node;
  let colors = {};
  if (settings.bgColor) {
    colors.bgColor = settings.bgColor;
  }
  if (settings.colors) {
    colors = { ...colors, ...settings.colors };
  }
  return colors;
};

export const getIsWhiteOnTransparent = (node) => {
  if (node === undefined || node.settings === undefined) {
    return undefined;
  }
  const { settings } = node;
  if (settings.whiteOnTransparent) {
    return settings.whiteOnTransparent;
  }
  return false;
};
