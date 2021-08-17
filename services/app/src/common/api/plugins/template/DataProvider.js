/**
 * Data provider that reflects back on the default values provided.
 */
import { FROM_UPLOAD } from "../../../../modules/composer/components/DeckEditor/modules/plugins/component/media/image/transforms/insertImage";

export class DataProvider {

  constructor(user) {
    this.templateMapping = {};
    this._user = user;
    this.profile = user ? {
      familyName: user.familyName,
      givenName: user.givenName,
      email: user.email,
      fullName: `${user.givenName} ${user.familyName}`,
      picture: user.picture ? {
        from: FROM_UPLOAD,
        url: user.picture,
      } : undefined,
      company: user.company ? {
        name: user.company.name,
      } : {},
    } : {};
  }

  process(template) {
    return new Promise((resolve) => resolve(template));
  }

  image(template, defaultValue) {
    return defaultValue;
  }
}
