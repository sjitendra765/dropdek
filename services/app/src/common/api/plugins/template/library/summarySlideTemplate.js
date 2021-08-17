import { componentBuilder } from "../../builder/ComponentBuilder";

export const summarySlideTemplate = componentBuilder()
  .template({
    name: 'Summary',
  })
  .title('Summary')
  .bulletList('First point', 'Second point');
