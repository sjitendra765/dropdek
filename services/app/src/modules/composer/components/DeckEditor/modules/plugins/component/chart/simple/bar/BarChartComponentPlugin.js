import React from "react";
import BarChartRoundedIcon from '@material-ui/icons/BarChart';
import { BarChartSlideComponent } from "./components/BarChartSlideComponent";
import { renderElementChart } from "../../common/renderElementChart";
import { barChartConfigurator } from "./barChartConfigurator";
import ComponentPlugin from "../../../../../../../../../../common/api/plugins/ComponentPlugin";
import { CHART_BAR } from "./type";

const ICON = <BarChartRoundedIcon />;

export default class BarChartComponentPlugin extends ComponentPlugin {

  constructor() {
    super({
      type: CHART_BAR,
      icon: ICON,
      renderElement: renderElementChart(CHART_BAR),
      slideComponent: () => BarChartSlideComponent,
      metadata: {
        keywords: 'bar chart,chart,graph',
        name: 'bar chart',
        description: 'Display numerical values as horizontal bars.',
        categories: [ComponentPlugin.Category.CHART, ComponentPlugin.Category.LIST],
      },
      configuration: barChartConfigurator,
    });
  }
}
