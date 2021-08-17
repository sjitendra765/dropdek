import { IMAGE } from "../type";

export const newImage = ({
  from,
  url,
  description,
  label,
  swatch
}) => (
  {
    type: IMAGE,
    settings: {
      from,
      url,
      description,
      label,
      swatch
    },
    children: [{ text: '' }],
  }
);
