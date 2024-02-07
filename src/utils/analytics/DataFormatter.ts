import { format, parse } from "date-fns";
import { formatSessionDuration } from "../dateUtils";

class DataFormatter {
  static formatUserData(response: any) {
    const sessionsByUserId: { [userId: string]: any } = {};

    const rows = response.rows || [];

    rows.forEach((row: any) => {
      const userId = row.dimensionValues[0].value;
      if (userId === "(not set)" || userId === "") return;

      if (!sessionsByUserId[userId]) {
        sessionsByUserId[userId] = {};
      }

      const sessionId = row.metricValues[0].value;

      if (!sessionsByUserId[userId][sessionId]) {
        sessionsByUserId[userId][sessionId] = {
          session: sessionId,
          averageSessionDuration: formatSessionDuration(
            row.metricValues[1].value
          ),
          engagedSessions: row.metricValues[2].value,
          pageReferrer: row.dimensionValues[8].value,
          pages: [],
          deviceCategory: row.dimensionValues[2].value,
          operatingSystem: row.dimensionValues[1].value,
          browser: row.dimensionValues[3].value,
          city: row.dimensionValues[4].value,
          language: row.dimensionValues[5].value,
          date: format(
            parse(row.dimensionValues[6].value, "yyyyMMdd", new Date()),
            "dd/MM/yyyy"
          ),
        };
      }
      
      sessionsByUserId[userId][sessionId].pages.push(
        row.dimensionValues[7].value
      );
    });
    const userData = Object.entries(sessionsByUserId).map(
      ([userId, sessions]) => ({
        userId,
        sessions: Object.values(sessions),
      })
    );
    return userData;
  }
}

export default DataFormatter;
