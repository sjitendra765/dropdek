import React from "react";
import FullStory from "react-fullstory";
import { useLocation } from "react-router-dom";
import { config } from "../../../config";

/**
 * Conditionally adds FullStory tracking, depending on whether it's been enabled for the app and the particular
 * route the user is at.
 *
 * @param enableTrackingFor function that takes the current path and determines whether to enable tracking.
 * @returns {*}
 * @constructor
 */
export const FullStoryContainer = ({ enableTrackingFor }) => {
  const location = useLocation();
  const pathname = location ? location.pathname : undefined;
  const trackingEnabled = enableTrackingFor(pathname);
  return config.analytics.fullStory.enabled && trackingEnabled ? <FullStory org={config.analytics.fullStory.org}/> : null;
};
