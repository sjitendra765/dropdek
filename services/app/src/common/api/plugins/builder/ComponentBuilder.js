import uuid from "react-uuid";
import { ComponentMappings } from "./ComponentMappings";
import { SLIDE } from "../../../../modules/composer/components/DeckEditor/modules/plugins/component/slide/type";
import { slideStructure } from "../template/transforms/slideStructure";
import { DynamicArgs } from "./DynamicArgs";
import { groupBuilder } from "../../../../modules/composer/components/DeckEditor/modules/plugins/component/groups/components/group/groupBuilder";

const evaluate = (builder, args, slide) => {
  if (!args || args.length === 0) {
    return new Promise((resolve) => resolve(builder()));
  }
  if (args.length === 1) {
    const [dyna] = args;
    if (dyna instanceof DynamicArgs) {
      return dyna.evaluate().then((dynaArgs) => builder(...dynaArgs));
    }
  }
  return new Promise((resolve) => resolve(builder(...args)));
};

const extensionBuilders = (slideNode, builders, structure) => {
  if (!slideNode || !slideNode.children || slideNode.children.length === 0) {
    return builders;
  }
  const slideTypes = slideStructure(slideNode);
  if (slideTypes.length === 0) {
    return builders;
  }

  if (slideTypes.length > structure.length) {
    return [];
  }
  let startFrom = 0;
  for (let i = 0; i < slideTypes.length; i++) {
    if (slideTypes[i] === structure[i]) {
      startFrom++;
    } else {
      break;
    }
  }
  if (startFrom > 0) {

    // Now we know we have a nonempty slide "base" to start from.
    return builders.slice(startFrom);
  }
  return [];
};

export class ComponentBuilder extends ComponentMappings {

  constructor() {
    super();
    const instance = new Proxy(this, {
      get(obj, prop) {
        if (prop in obj) {
          return obj[prop];
        }
        const { builder } = obj.mappings[prop];
        return builder;
      }
    });
    ComponentBuilder.__singleton = instance;
    return instance;
  }

  /**
   * Build a slide template.
   *
   * @param settings template settings
   * @returns {TemplateBuilder}
   */
  template = (settings) => new TemplateBuilder(this.mappings, settings);

  /**
   * Build a slide component.
   *
   * @param settings slide settings
   * @returns {SlideBuilder}
   */
  slide = (settings = {}, children = []) => new SlideBuilder(this.mappings, settings, children);

  /**
   * Build a group container.
   *
   * @returns {GroupBuilder}
   */
  group = (children = []) => new GroupBuilder(this.mappings, children);

  static instance() {
    return ComponentBuilder.__singleton === undefined ? new ComponentBuilder() : ComponentBuilder.__singleton;
  }
}

/**
 * Wrapper for building a slide container.
 */
class SlideBuilder {

  constructor(mappings, settings = {}, children = []) {
    this.settings = settings;
    this.children = children;
    const instance = new Proxy(this, {
      get(obj, prop) {
        if (prop in obj) {
          return obj[prop];
        }
        return (...args) => {
          if (!mappings.hasOwnProperty(prop)) {
            throw new Error(`${prop} is not a valid type`);
          }
          const { builder } = mappings[prop];
          const value = builder(...args);
          if (value) {
            obj.children.push(value);
          }
          return instance;
        };
      }
    });
    return instance;
  }

  build = () => {
    const slide = {
      type: SLIDE,
      id: uuid(),
      children: this.children,
    };
    if (this.settings) {
      slide.settings = this.settings;
    }
    return slide;
  };
}

/**
 * Wrapper for building a group container.
 */
class GroupBuilder extends SlideBuilder {

  constructor(mappings, children = []) {
    super(mappings, undefined, children);
  }

  build = () => groupBuilder(...this.children);
}

/**
 * Wrapper for building a slide template, a list of slide elements.
 */
class TemplateBuilder {

  constructor(mappings, { name, remix, palette }) {
    this.name = name;
    this.remixName = remix ? remix.name() : undefined;
    this.palette = palette || undefined;
    this.builders = [];
    this.structure = [];
    const instance = new Proxy(this, {
      get(obj, prop) {
        if (prop in obj) {
          return obj[prop];
        }
        return (...args) => {
          if (!mappings.hasOwnProperty(prop)) {
            throw new Error(`${prop} is not a valid type`);
          }
          const { builder, type } = mappings[prop];
          const value = builder(...args);
          if (value) {
            obj.structure.push(type);
            obj.builders.push({ builder, args });
          }
          return instance;
        };
      }
    });
    return instance;
  }

  /**
   * Evaluate the set of builders for extending the given slide node up to this template. Some of the
   * builder evaluation may be asynchronous, so this function accepts a resolve callback.
   *
   * @param slideNode a Slate node representing a slide element.
   * @param resolve a callback when we are done evaluating the template extension.
   */
  extendFrom(slideNode, resolve) {
    const builders = extensionBuilders(slideNode, this.builders, this.structure);
    if (resolve === undefined) {
      return builders.map(({ builder, args }) => builder(...args));
    }
    const promises = builders.map(({ builder, args }) => evaluate(builder, args, slideNode));
    Promise.all(promises).then((result) => {
      resolve(result);
    });
  }

  build = () => this.builders.map(({ builder, args }) => evaluate(builder, args));
}

/**
 * Utility to instantiate a component builder.
 */
export const componentBuilder = () => ComponentBuilder.instance();
