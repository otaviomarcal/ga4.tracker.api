import { RunReportResponse } from "../types/analytics.types";

const formatEventResponse = (response: RunReportResponse): {
  data: any[];
  rowCount: number;
  message: string;
} => {
  if (!response || !response.rows || response.rows.length === 0) {
    return {
      data: [],
      rowCount: 0,
      message: "No data available at the moment",
    };
  }

  const data = response.rows.map((row) => {
    const item: Record<string, any> = {};
    row.dimensionValues.forEach((dimension, index) => {
      const dimensionName = response.dimensionHeaders[index].name;
      item[dimensionName] = dimension.value;
    });

    const metrics: Record<string, number> = {};
    row.metricValues.forEach((metric, index) => {
      const metricName = response.metricHeaders[index].name;
      metrics[metricName] = Number(metric.value);
    });

    item.metrics = metrics;
    return item;
  });

  return {
    data,
    rowCount: response.rowCount,
    message: "",
  };
};

export default formatEventResponse;
