import React from "react";
import SlideComponent from "../../../../../../../../../../common/slide/SlideComponent";
import { getLogos } from "../transforms/getLogos";
import { ImageComponent } from "../../components/ImageComponent";

export class LogoListSlideComponent extends SlideComponent {
  constructor(node, view, themeName, settings, monitor) {
    super(monitor);
    // this.setMarkupType(LOGO);
    const logos = getLogos(node);
    const logoElements = [];
    logos.forEach((logo) => {
      if (logo && logo.url !== undefined) {
        const bgColor = logo.bgColor ? logo.bgColor : logo.whiteOnTransparent ? logo.colors?.accent : null;
        logoElements.push(<ImageComponent key={logo.url} url={logo.url} backgroundColor={bgColor}/>);
      }
    });
    this.setHtml(<div className="logos" data-length={logoElements.length} >{ logoElements }</div>);
  }
}
