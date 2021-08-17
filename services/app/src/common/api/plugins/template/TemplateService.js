import TrieSearch from "trie-search";
import TemplateFactory from "./TemplateFactory";
import { encodeStructure } from "./transforms/encodeStructure";
import { isDynamicTemplate } from "./queries/isDynamicTemplate";

/**
 * Prepare an index document representation of a template.
 *
 * @param template
 */
const documentFor = (template) => {
  const templateBuild = isDynamicTemplate(template) ? template() : template;
  return {
    name: templateBuild.name,
    structure: encodeStructure(templateBuild.structure),
    template,
  };
};

/**
 * Service for handling slide templates.
 */
export default class TemplateService {
  constructor() {
    TemplateService.__singleton = this;
    this.templates = [];
    this.templateEngine = new TrieSearch(['name', 'structure'], { min: 1, idFieldOrFunction: 'name' });
    this.templateStructureEngine = new TrieSearch(['structure'], { min: 1, idFieldOrFunction: 'name' });
  }

  search(query = '', structure) {
    if (structure && structure.length > 0) {
      const len = structure.length;
      const results = query.length > 0 ?
        this.templateEngine.get([query, structure], TrieSearch.UNION_REDUCER) :
        this.templateStructureEngine.get(structure);
      return results.filter((result) => result.structure.length > len);
    }
    return query.length > 0 ? this.templateEngine.get(query) : this.templates;
  }

  /**
   * Add a template to the engine.
   *
   * @param component
   */
  install(template) {
    const doc = documentFor(template);
    this.templates.push({ name: doc.name, template });
    this.templateEngine.add(doc);
    this.templateStructureEngine.add(doc);
  }

  static instance() {
    return TemplateService.__singleton === undefined ? TemplateFactory.install(new TemplateService()) : TemplateService.__singleton;
  }
}
