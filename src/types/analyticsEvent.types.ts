export interface AnalyticsEventData {
  dimensionValues: AnalyticsDimension[];
  metricValues: AnalyticsMetric[];
}

export interface AnalyticsDimension {
  name: string;
  value: string;
}

export interface AnalyticsMetric {
  name: string;
  value: string;
}

export interface AnalyticsEventResponse {
  rows: AnalyticsEventData[];
  rowCount: number;
}
