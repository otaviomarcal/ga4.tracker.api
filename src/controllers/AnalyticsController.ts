import { Request, Response } from "express";
import AnalyticsService from "../services/AnalyticsService";
import AnalyticsUserService from "../services/AnalyticsUserService";
import formatResponse from "../utils/formatResponse";
import formatEventResponse from "../utils/formatEventResponse";

class AnalyticsController {
  private analyticsService: AnalyticsService;
  private analyticsUserService: AnalyticsUserService;

  constructor() {
    this.analyticsService = new AnalyticsService();
    this.analyticsUserService = new AnalyticsUserService();
  }

  public getRealtimeAnalytics = async (
    _req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const analyticsData = await this.analyticsService.getRealtimeData();
      // const formattedResponse = formatResponse(analyticsData);
      res.json(analyticsData);
    } catch (error) {
      console.error("Error fetching realtime analytics:", error);
      res.status(500).send("Internal Server Error");
    }
  };

  public getActiveScreenAnalytics = async (
    _req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const activeScreenData =
        await this.analyticsService.getActiveScreenData();
      res.status(200).json(activeScreenData);
    } catch (error) {
      console.error("Error fetching realtime analytics:", error);
      res.status(500).send("Internal Server Error");
    }
  };

  public getReportAnalytics = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { startDate, endDate } = req.query;
      if (typeof startDate !== "string" || typeof endDate !== "string") {
        throw new Error("Invalid startDate or endDate");
      }
      const analyticsData = await this.analyticsService.getReportData(
        startDate,
        endDate
      );
      const formattedResponse = formatResponse(analyticsData);
      res.json(formattedResponse);
    } catch (error) {
      console.error("Error fetching report analytics:", error);
      res.status(500).send("Internal Server Error");
    }
  };

  public getEventAnalytics = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { startDate, endDate, eventName } = req.query;
      if (
        typeof startDate !== "string" ||
        typeof endDate !== "string" ||
        typeof eventName !== "string"
      ) {
        throw new Error("Invalid startDate, endDate or eventName");
      }
      const analyticsData = await this.analyticsService.getEventData(
        startDate,
        endDate,
        eventName
      );
      const formattedResponse = formatEventResponse(analyticsData);
      res.json(formattedResponse);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send("Internal Server Error");
    }
  };

  public getUserAnalytics = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { startDate, endDate, page, pageSize } = req.query as unknown as {
        startDate: string;
        endDate: string;
        page: number;
        pageSize: number;
      };

      const usersData = await this.analyticsUserService.getUsersData(
        startDate,
        endDate,
        page,
        pageSize
      );
      if (usersData === null) {
        res.status(404).json({
          type: "NoUsersData",
          status: 404,
          message: "No user data found",
        });
      } else {
        res.json(usersData);
      }
    } catch (error) {
      console.error("Error fetching user analytics data:", error);
      res.status(500).send("Internal Server Error");
    }
  };
}

export default AnalyticsController;
