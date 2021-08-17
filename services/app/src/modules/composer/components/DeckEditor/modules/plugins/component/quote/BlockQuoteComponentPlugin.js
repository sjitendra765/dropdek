import React from "react";
import FormatQuoteRoundedIcon from '@material-ui/icons/FormatQuoteRounded';
import { deserializeBlockquote, renderElementBlockquote } from "@udecode/slate-plugins";
import ComponentPlugin from "../../../../../../../../common/api/plugins/ComponentPlugin";
import { SLIDE } from "../slide/type";
import { BLOCK_QUOTE } from "./type";

const ICON = <FormatQuoteRoundedIcon />;

const options = { typeBlockquote: BLOCK_QUOTE };

export default class BlockQuoteComponentPlugin extends ComponentPlugin {

  constructor() {
    super({
      type: BLOCK_QUOTE,
      icon: ICON,
      renderElement: renderElementBlockquote(options),
      metadata: {
        name: 'quote',
        keywords: 'quote',
      },
      deserialize: deserializeBlockquote(options),
      editable: true,
      canBeChildOf: (parent) => parent.type === SLIDE,
    });
  }
}
