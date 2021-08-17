import React from "react";
import FormatListNumberedRoundedIcon from '@material-ui/icons/FormatListNumberedRounded';
import { renderElementNumberedList } from "./renderElementNumberedList";
import { componentConfigurator } from "../../componentConfigurator";
import ComponentPlugin from "../../../../../../../../../common/api/plugins/ComponentPlugin";
import { listBuilder } from "../listBuilder";
import { NUMBERED_LIST } from "./type";

const ICON = <FormatListNumberedRoundedIcon />;

export default class NumberedListComponentPlugin extends ComponentPlugin {

  constructor() {
    const builder = listBuilder(NUMBERED_LIST);
    super({
      type: NUMBERED_LIST,
      icon: ICON,
      renderElement: renderElementNumberedList,
      metadata: {
        name: 'numbered list',
        keywords: 'numbered list,list',
        categories: [ComponentPlugin.Category.LIST, ComponentPlugin.Category.NESTED],
      },
      editable: true,
      configuration: componentConfigurator(builder),
      builder,
    });
  }
}
