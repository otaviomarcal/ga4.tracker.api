import { analyticsConfig } from "../config/AnalyticsConfig";
import AnalyticsQueryUser from "../analytics/AnalyticsQueryUser";
import DataFormatter from "../utils/analytics/DataFormatter";
import Pagination from "../utils/Pagination";

class AnalyticsUserService {
  private propertyId: string;
  private analyticsQueryUser: AnalyticsQueryUser;

  constructor() {
    this.propertyId = analyticsConfig.propertyId;
    this.analyticsQueryUser = new AnalyticsQueryUser(
      analyticsConfig.client,
      this.propertyId
    );
  }

  async getUsersData(startDate: string, endDate: string, page: number, limit: number) {
    try {
      const userData = await this.analyticsQueryUser.runReport(startDate, endDate);
      const formattedData = DataFormatter.formatUserData(userData);
      const pagination = new Pagination(formattedData, page, limit);
      const paginatedData = pagination.getPaginatedData();
      return {
        data: paginatedData,
        pagination: {
          totalItems: formattedData.length,
          pageSize: limit,
          currentPage: page,
          totalPages: pagination.getTotalPages(),
        },
      };
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  }
}

export default AnalyticsUserService;
