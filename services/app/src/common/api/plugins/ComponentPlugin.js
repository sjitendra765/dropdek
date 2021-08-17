import { simpleComponentBuilder } from "./simpleComponentBuilder";
import { renderElementWithGutter } from "../../../modules/composer/components/DeckEditor/modules/gutter/renderElementWithGutter";
import { PARAGRAPH } from "../../../modules/composer/components/DeckEditor/modules/plugins/component/paragraph/type";

/**
 * Base class for all <i>component plugins</i> in the system.
 */
export default class ComponentPlugin {

  static Category = {
    LIST: 'list',
    NESTED: 'nested',
    CHART: 'chart',
    TEXT: 'text',
  };

  constructor({
    type,
    renderElement,
    renderLeaf,
    onKeyDown,
    icon,
    command,
    metadata = {},
    editable = true,
    deserialize,
    slideComponent,
    configuration,
    pasteHandler,
    canBeChildOf,
    decorate,
    isVoid = false,
    isInline = false,
    showGutter = true,
    builder,
  }) {
    const {
      name,
      keywords,
      description,
      ranking,
      categories = [],
    } = metadata;
    this.type = type;
    this.description = description;
    this.slideComponent = slideComponent;
    this.renderLeaf = renderLeaf;
    this.decorate = decorate;
    this.onKeyDown = onKeyDown;
    this.icon = icon;
    this.ranking = ranking;
    this.name = name;
    this.command = command || name;
    this.editable = editable;
    this.keywords = keywords;
    this.deserialize = deserialize;
    this.configuration = configuration;
    this.canBeChildOf = canBeChildOf;
    this.pasteHandler = pasteHandler;
    this.isVoid = isVoid;
    this.isInline = isInline;
    this.categories = categories;
    this.renderElement = showGutter ? renderElementWithGutter(renderElement, icon, PARAGRAPH) : renderElement;
    this.builder = builder || simpleComponentBuilder(type);
  }
}
