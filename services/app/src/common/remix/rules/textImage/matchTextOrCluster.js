import { allText, cluster, group, or } from "../../match/Matchers";
import { atLeast } from "../../match/expressions/Occurring";

export const matchTextOrCluster = group(
  or(
    cluster(allText(atLeast(1))),
    allText(),
  ), atLeast(1)
);
