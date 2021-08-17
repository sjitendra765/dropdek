import { componentBuilder } from "../../builder/ComponentBuilder";
import { DataProvider } from "../DataProvider";
import { coverSimpleRemix } from "../../../../remix/rules/covers/coverSimple/coverSimple";

export const coverSlideTemplate = (dataProvider = new DataProvider()) => {
  let template = componentBuilder().template({
    name: 'Cover slide',
    remix: coverSimpleRemix,
  });
  if (dataProvider.profile.picture) {
    template = template.image(dataProvider.profile.picture);
  }
  return template
    .title('My presentation')
    .subtitle(dataProvider.profile.fullName || 'Insert your name here!')
    .paragraph(dataProvider.profile.email || 'your@email.com?')
    .bulletList(new Date().toLocaleDateString(), dataProvider.profile?.company?.name || "Where you work?");
};
