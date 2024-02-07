export interface Dimension {
  name: string;
}

export interface Metric {
  name: string;
}

export interface DateRange {
  startDate: string;
  endDate: string;
}

export interface DimensionFilter {
  filter: {
    fieldName: string;
    stringFilter: {
      matchType: string;
      value: string;
    };
  };
}

export interface RunReportResponse {
  rows: {
    dimensionValues: { value: string }[];
    metricValues: { value: string }[];
  }[];
  totals: string[];
  maximums: string[];
  minimums: string[];
  rowCount: number;
  metricHeaders: { name: string }[];
  dimensionHeaders: { name: string }[];
}

