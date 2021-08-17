/**
 * Data provider with an initial set of images to suggest.
 */
import { DataProvider } from "./DataProvider";

export class ImageDataProvider extends DataProvider {

  constructor(query, images, user) {
    super(user);
    this.query = query;
    this.images = images;
  }

  process(template) {
    const imgToProcess = this.templateMapping[template.name];
    return new Promise((resolve, reject) => {
      resolve(template);
    });
  }

  image(template, defaultValue) {
    if (this.images.length > 0) {
      const img = this.images[0];
      this.templateMapping[template.name] = img;
      return img;
    }
    return defaultValue;
  }
}
