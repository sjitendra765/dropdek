import { DataProvider } from "./DataProvider";
import { DynamicArgs } from "../builder/DynamicArgs";
import { suggestImagesForSlide } from "./queries/suggestImagesForSlide";
import { nodeToQuery } from "./queries/nodeToQuery";

/**
 * Data provider that dynamically fetches new values at runtime. Takes the Slate
 * state of the current slide, and uses that information to fetch relevant and contextual
 * data values (e.g. images based on those keywords).
 */
export class LazyDataProvider extends DataProvider {

  constructor(slideNode) {
    super();
    this.slideNode = slideNode;
  }

  image(template, defaultValue) {
    return new DynamicArgs(suggestImagesForSlide(nodeToQuery(this.slideNode)), defaultValue);
  }
}
