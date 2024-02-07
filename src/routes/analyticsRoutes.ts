import { Router } from "express";
import AnalyticsController from "../controllers/AnalyticsController";
import { auth } from "../middlewares/auth";

const router = Router();
const analyticsController = new AnalyticsController();

router.get('/realtime', auth, analyticsController.getRealtimeAnalytics);
router.get('/realtime/activeScreen', auth, analyticsController.getActiveScreenAnalytics);
router.get('/report', auth, analyticsController.getReportAnalytics);
router.get('/events', auth, analyticsController.getEventAnalytics);
router.get('/user-analytics', auth, analyticsController.getUserAnalytics);

export default router;
