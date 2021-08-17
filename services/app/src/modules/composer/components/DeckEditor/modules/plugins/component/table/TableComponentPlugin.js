import React from "react";
import { BorderAll } from "@material-ui/icons";
import { deserializeTable, renderElementTable } from "@udecode/slate-plugins";
import { defaultTableTypes } from "./utils/defaultTableTypes";
import { TableElement } from "./components/editor/TableElement";
import { TableCellElement } from "./components/editor/TableCellElement";
import { onKeyDownTable } from "./onKeyDownTable";
import { TableRowElement } from "./components/editor/TableRowElement";
import { tableConfigurator } from "./configuration/tableConfigurator";
import ComponentPlugin from "../../../../../../../../common/api/plugins/ComponentPlugin";
import { TableType } from "./type";

const ICON = <BorderAll />;

const tableRenderOptions = {
  Table: TableElement,
  Row: TableRowElement,
  Cell: TableCellElement,
  ...defaultTableTypes,
};

export default class TableComponentPlugin extends ComponentPlugin {

  constructor(suggestionControls, options = defaultTableTypes) {
    super({
      type: TableType.TABLE,
      icon: ICON,
      renderElement: renderElementTable(tableRenderOptions),
      metadata: {
        name: 'table',
        keywords: 'table',
        description: 'Insert a table',
      },
      editable: true,
      deserialize: deserializeTable(options),
      configuration: tableConfigurator,
      onKeyDown: onKeyDownTable(),
    });
  }
}
