import React from "react";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { renderElementSlideBreak } from "./renderElementSlideBreak";
import { slideBreakConfigurator } from "./configuration/slideBreakConfigurator";
import { deserializeSlideBreak } from "./deserializeSlideBreak";
import ComponentPlugin from "../../../../../../../../common/api/plugins/ComponentPlugin";
import { SLIDE_BREAK } from "./type";

const ICON = <AddCircleIcon />;

export default class SlideBreakComponentPlugin extends ComponentPlugin {

  constructor() {
    super({
      type: SLIDE_BREAK,
      icon: ICON,
      renderElement: renderElementSlideBreak,
      metadata: {
        name: 'slide break',
        keywords: 'slide break,new slide',
      },
      showGutter: false,
      command: 'slideBreak',
      configuration: slideBreakConfigurator,
      deserialize: deserializeSlideBreak(),
      isVoid: true,
    });
  }
}
