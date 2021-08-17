import React from "react";
import TimelineRoundedIcon from '@material-ui/icons/Timeline';
import { LineChartSlideComponent } from "./components/LineChartSlideComponent";
import { renderElementChart } from "../../common/renderElementChart";
import { lineChartConfigurator } from "./lineChartConfigurator";
import ComponentPlugin from "../../../../../../../../../../common/api/plugins/ComponentPlugin";
import { CHART_LINE } from "./type";
import { Ranking } from "../../../Ranking";

const ICON = <TimelineRoundedIcon />;

export default class LineChartComponentPlugin extends ComponentPlugin {
  constructor() {
    super({
      type: CHART_LINE,
      icon: ICON,
      renderElement: renderElementChart(CHART_LINE),
      slideComponent: () => LineChartSlideComponent,
      metadata: {
        keywords: 'line chart,chart,graph',
        name: 'line chart',
        description: 'Display values over a continuous interval or time period.',
        categories: [ComponentPlugin.Category.CHART, ComponentPlugin.Category.LIST],
      },
      configuration: lineChartConfigurator,
    });
  }
}
