import { BetaAnalyticsDataClient } from "@google-analytics/data";
// import { RunReportResponse } from "../types/analytics.types";

class AnalyticsQueryUser {
  private client: BetaAnalyticsDataClient;
  private propertyId: string;

  constructor(client: BetaAnalyticsDataClient, propertyId: string) {
    this.client = client;
    this.propertyId = propertyId;
  }

  async runReport(startDate: string, endDate: string): Promise<any> {
    try {
      const [response] = await this.client.runReport({
        property: `properties/${this.propertyId}`,
        dimensions: [
          { name: "customUser:user_id_dimension" },
          { name: "operatingSystem" },
          { name: "deviceCategory" },
          { name: "browser" },
          { name: "city" },
          { name: "language" },
          { name: "date" },
          { name: "pagePath" },
          { name: "pageReferrer" },
        ],
        metrics: [
          { name: "sessions" },
          { name: "averageSessionDuration" },
          { name: "engagedSessions" },
        ],
        dateRanges: [{ startDate, endDate }],
        // dimensionFilter: {
        //   notExpression: {
        //     filter: {
        //       fieldName: "pageReferrer",
        //       stringFilter: { 
        //         matchType: "CONTAINS",
        //         value: "festivaldepremios.com.br"
        //       },
        //     },
        //   },
        // }
      });

      return response;
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  }
}

export default AnalyticsQueryUser;
