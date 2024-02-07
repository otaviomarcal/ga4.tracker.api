import { BetaAnalyticsDataClient } from "@google-analytics/data";

class AnalyticsService {
  private client: BetaAnalyticsDataClient;
  private propertyId: string;

  constructor() {
    this.client = new BetaAnalyticsDataClient({
      keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS as string,
    });
    this.propertyId = process.env.ANALYTICS_PROPERTY_ID as string;
  }

  async getRealtimeData(): Promise<any[]> {
    try {
      const [response] = await this.client.runRealtimeReport({
        property: `properties/${this.propertyId}`,
        // dimensions: [{ name: "country" }],
        metrics: [{ name: "activeUsers" }],
      });
      const formattedData = response?.rows?.map((row: any) => ({
        // country: row.dimensionValues[0].value,
        activeUsers: row.metricValues[0].value,
      }));
      return formattedData ?? [];
    } catch (error) {
      console.error("Error fetching realtime data:", error);
      throw error;
    }
  }

  async getActiveScreenData(): Promise<any> {
    try {
      const [response] = await this.client.runRealtimeReport({
        property: `properties/${this.propertyId}`,
        dimensions: [{ name: "unifiedScreenName" }],
        metrics: [{ name: "screenPageViews" }],
      });
      const formattedData = {
        totalScreenPageViews: response?.rows?.reduce(
          (total: number, row: any) =>
            total + parseInt(row.metricValues[0].value, 10),
          0
        ),
        activePages: response?.rows?.map((row: any) => ({
          screenName: row.dimensionValues[0].value,
          screenPageViews: row.metricValues[0].value,
        })),
      };
      return formattedData;
    } catch (error) {
      console.error("Error fetching realtime data:", error);
      throw error;
    }
  }

  async getReportData(startDate: string, endDate: string): Promise<any> {
    try {
      const [response] = await this.client.runReport({
        property: `properties/${this.propertyId}`,
        dimensions: [{ name: "country" }],
        metrics: [
          { name: "activeUsers" },
          { name: "sessions" },
          { name: "eventCount" },
        ],
        dateRanges: [{ startDate, endDate }],
      });
      return response;
    } catch (error) {
      console.error("Error fetching report data:", error);
      throw error;
    }
  }

  async getEventData(
    startDate: string,
    endDate: string,
    eventName: string
  ): Promise<any> {
    try {
      const [response] = await this.client.runReport({
        property: `properties/${this.propertyId}`,
        dimensions: [{ name: "eventName" }],
        metrics: [{ name: "eventCount" }],
        dateRanges: [{ startDate, endDate }],
        dimensionFilter: {
          filter: {
            fieldName: "eventName",
            stringFilter: {
              value: eventName,
            },
          },
        },
      });
      return response;
    } catch (error) {
      console.error("Error fetching event data:", error);
      throw error;
    }
  }

  async getDataWithDateTime(
    startDate: string,
    endDate: string,
    dimensions: string[]
  ): Promise<any> {
    try {
      const [response] = await this.client.runReport({
        property: `properties/${this.propertyId}`,
        dimensions: dimensions.map((dimension) => ({ name: dimension })), // Mapeie as dimensões para o formato adequado
        metrics: [
          { name: "activeUsers" },
          { name: "sessions" },
          { name: "eventCount" },
        ],
        dateRanges: [{ startDate, endDate }],
      });
      return response;
    } catch (error) {
      console.error("Error fetching data with date and time filter:", error);
      throw error;
    }
  }
}

export default AnalyticsService;
