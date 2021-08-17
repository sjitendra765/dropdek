import React from "react";
import FormatListBulletedRoundedIcon from '@material-ui/icons/FormatListBulletedRounded';
import { renderElementBulletedList } from "./renderElementBulletedList";
import { Ranking } from "../../Ranking";
import { componentConfigurator } from "../../componentConfigurator";
import ComponentPlugin from "../../../../../../../../../common/api/plugins/ComponentPlugin";
import { listBuilder } from "../listBuilder";
import { BULLETED_LIST } from "./type";

const ICON = <FormatListBulletedRoundedIcon />;

export default class BulletedListComponentPlugin extends ComponentPlugin {

  constructor() {
    const builder = listBuilder(BULLETED_LIST);
    super({
      type: BULLETED_LIST,
      icon: ICON,
      renderElement: renderElementBulletedList,
      metadata: {
        name: 'bullet list',
        keywords: 'list,bullet list,bullets',
        ranking: Ranking.MEDIUM,
        categories: [ComponentPlugin.Category.LIST, ComponentPlugin.Category.NESTED],
      },
      editable: true,
      configuration: componentConfigurator(builder),
      builder,
    });
  }
}
