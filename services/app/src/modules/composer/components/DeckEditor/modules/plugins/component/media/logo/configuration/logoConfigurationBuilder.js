import { Editor, Transforms } from "slate";
import { capitalise } from "../../../../../../../../../../common/transforms/capitalise";
import { LOGO } from "../type";

export const logoToUse = (data) => {
  const { image: logoImage, whiteOnTransparent: logoWhiteOnTransparent, height: logoHeight, width: logoWidth, svg: logoSvg, bgColor: logoBgColor } = data.logo || {};
  const { image: iconImage, whiteOnTransparent: iconWhiteOnTransparent, height: iconHeight, width: iconWidth, svg: iconSvg, bgColor: iconBgColor } = data.icon || {};

  let url;
  let whiteOnTransparent;
  let bgColor;

  if (logoSvg) {
    url = logoSvg;
    // Assuming SVG and logo have same characteristics
    whiteOnTransparent = logoWhiteOnTransparent;
    bgColor = logoBgColor;
  } else if (iconSvg) {
    url = iconSvg;
    whiteOnTransparent = iconWhiteOnTransparent;
    bgColor = iconBgColor;
  } else if (iconImage && logoImage && iconHeight * iconWidth > logoHeight * logoWidth) {
    url = iconImage;
    whiteOnTransparent = iconWhiteOnTransparent;
    bgColor = iconBgColor;
  } else if (logoImage) {
    url = logoImage;
    whiteOnTransparent = logoWhiteOnTransparent;
    bgColor = logoBgColor;
  } else {
    url = iconImage;
    whiteOnTransparent = iconWhiteOnTransparent;
    bgColor = iconBgColor;
  }

  return { url, whiteOnTransparent, bgColor };
};

export const logoConfigurationBuilder = (data) => (editor, node, path, resolve) => {
  if (data) {
    const { query, payload } = data;

    const logo = logoToUse(payload.data);

    const allColors = payload.data?.colors || {}; // only store the "featured" colours
    const { accent, light, dark } = allColors;

    Editor.withoutNormalizing(editor, () => {
      Transforms.setNodes(editor, {
        type: LOGO,
        settings: {
          ...logo,
          description: capitalise(query),
          label: capitalise(query),
          colors: { accent, light, dark },
        },
        children: [{ text: '' }],
      }, { at: path });
    });
    resolve();
  }
};
