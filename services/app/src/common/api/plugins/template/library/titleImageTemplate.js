import { imageFullBleedTextGradientRemix } from "../../../../remix/rules/images/imageFullBleedTextGradient/imageFullBleedTextGradientRemix";
import Palette from "../../../../../theme/Palette";
import { componentBuilder } from "../../builder/ComponentBuilder";
import { DataProvider } from "../DataProvider";

export const titleImageTemplate = (dataProvider = new DataProvider()) => {
  const template = componentBuilder().template({
    name: 'Image and title',
    remix: imageFullBleedTextGradientRemix,
    palette: new Palette("#fff", "#000", "#fff", "#fff", "#fff"),
  });
  return template.title('Image and title')
    .image(dataProvider.image(template,{
      from: "unsplash",
      label: "happy",
      // swatch: ["#210f2e", "#cb748f", "#773876", "#874da3", "#94849c"],
      url: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?ixid=MXwxOTEwMjl8MHwxfHNlYXJjaHwzfHxzcGFjZXxlbnwwfDB8fA&ixlib=rb-1.2.1"
    }));
};
