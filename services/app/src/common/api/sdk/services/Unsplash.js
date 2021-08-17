import Dropdeck from "../Dropdeck";

export default class Unsplash {

  static resource = "unsplash";

  static search = async (query, page, perPage) => Dropdeck.services.get(
    `${this.resource}/search`,
    { keyword: query, page, perPage },
  );

  static suggest = async (query, perPage) => Dropdeck.services.get(
    `${this.resource}/search`,
    { keyword: query, perPage, rewriteQuery: true },
  );
}
