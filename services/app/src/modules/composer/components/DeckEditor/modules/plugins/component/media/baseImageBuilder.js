import { FROM_UPLOAD } from "./image/transforms/insertImage";

export const baseImageBuilder = (type) => (settings = {}) => {
  const { from = FROM_UPLOAD, url, description, label, swatch } = settings;
  return {
    type,
    settings: {
      from,
      url,
      description,
      label,
      swatch
    },
    children: [{ text: '' }]
  };
};
