import React from "react";
import MathIcon from '@material-ui/icons/Functions';
import { renderElementMath } from "./renderElementMath";
import { MathSlideComponent } from "./components/MathSlideComponent";
import ComponentPlugin from "../../../../../../../../common/api/plugins/ComponentPlugin";
import { onKeyDownTabIndent } from '../code/onKeyDownTabIndent';
import { MATH } from "./type";

const ICON = <MathIcon />;

export default class MathComponentPlugin extends ComponentPlugin {

  constructor() {
    super({
      type: MATH,
      icon: ICON,
      renderElement: renderElementMath,
      slideComponent: () => MathSlideComponent,
      metadata: {
        name: 'math',
        keywords: 'math,formula,equation',
        description: 'Write an equation or formula',
      },
      onKeyDown: onKeyDownTabIndent(MATH),
      editable: true,
    });
  }
}
