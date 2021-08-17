/**
 * Entry point for registering and initiating slide templates.
 */
import { titleImageTemplate } from "./library/titleImageTemplate";
import { teamSlideTemplate } from "./library/teamSlideTemplate";
import { coverSlideTemplate } from "./library/coverSlideTemplate";
import { summarySlideTemplate } from "./library/summarySlideTemplate";

export default class TemplateFactory {

  static install = (service) => {

    // Cover slide
    service.install(coverSlideTemplate);

    // Summary slide
    service.install(summarySlideTemplate);

    // Image and title
    service.install(titleImageTemplate);

    // Team slide
    service.install(teamSlideTemplate);

    return service;
  }
}
