import { SCALING } from "../../../../../../composer/components/DeckEditor/modules/plugins/scaling/setScaling";

export const getScalingFromSettings = (settings = {}, themeId) => settings[SCALING] && settings[SCALING][themeId];
