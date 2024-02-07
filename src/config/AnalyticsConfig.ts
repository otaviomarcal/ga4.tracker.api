import { BetaAnalyticsDataClient } from "@google-analytics/data";

export const analyticsConfig = {
  client: new BetaAnalyticsDataClient({
    keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS || "",
  }),
  propertyId: process.env.ANALYTICS_PROPERTY_ID || "",
};