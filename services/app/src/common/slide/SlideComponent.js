export default class SlideComponent {

  constructor() {
    this.html = undefined;
    this.component = undefined;
    this.data = {};
    this.markupType = undefined;
  }

  setMarkupType(markupType) {
    this.markupType = markupType;
  }

  setHtml(html) {
    this.html = html;
  }

  setComponent(component) {
    this.component = component;
  }

}
