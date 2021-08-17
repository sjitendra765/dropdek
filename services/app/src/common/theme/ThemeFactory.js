import React from "react";
import Simple from "../../theme/themes/simple/Simple";
import Midnight from "../../theme/themes/midnight/Midnight";
import CMYK from "../../theme/themes/cmyk/CMYK";
import SimpleBranded from "../../theme/themes/simpleBranded/SimpleBranded";
import Villanelle from "../../theme/themes/villanelle/Villanelle";
import Broadsheet from "../../theme/themes/broadsheet/Broadsheet";
import Backtoschool from "../../theme/themes/backtoschool/Backtoschool";
import Headline from "../../theme/themes/headline/Headline";
import Curve from "../../theme/themes/curve/Curve";

const singleton = Symbol('ThemeFactory singleton pointer');
const singletonEnforcer = Symbol('ThemeFactory singleton enforcer');

export class ThemeFactory {

  static DEFAULT_THEME = new Simple();

  static DEFAULT_THEME_NAME = ThemeFactory.DEFAULT_THEME.id;

  static DEFAULT_THEME_PACKAGE = { static: true, component: ThemeFactory.DEFAULT_THEME };

  constructor(enforcer) {
    if (enforcer !== singletonEnforcer) {
      throw new Error('Cannot construct Singleton');
    }

    this.init();
  }

  init = () => {
    const dynamicThemes = [];
    const staticThemes = [
      new SimpleBranded(), // Default branded company theme.
      new Headline(),
      new Simple(),
      new Curve(),
      new Broadsheet(),
      new Midnight(),
      new Villanelle(),
      new Backtoschool(),
      new CMYK()
    ];
    this._registry = {};
    staticThemes.forEach((theme) => {
      this._registry[theme.id] = { static: true, component: theme };
    });
    dynamicThemes.forEach((name) => {
      const DynamicTheme = React.lazy(() => import(`theme/themes/${(name)}`));
      this._registry[name.toLowerCase()] = { static: false, component: DynamicTheme };
    });
  };

  themes = () => Object.entries(this._registry);

  get = (name, branding) => {
    if (!name) {
      return ThemeFactory.DEFAULT_THEME_PACKAGE;
    }
    const theme = this._registry[name.toLowerCase()] || ThemeFactory.DEFAULT_THEME_PACKAGE;
    if (branding && theme.component.branded) {
      theme.component.setBranding(branding);
    }
    return theme;
  };

  static get instance() {
    if (!this[singleton]) {
      this[singleton] = new ThemeFactory(singletonEnforcer);
    }

    return this[singleton];
  }
}
