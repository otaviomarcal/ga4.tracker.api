import { RunReportResponse } from "../types/analytics.types";

const formatResponse = (response: RunReportResponse): {
  rows: {
    metrics: { name: string; value: string }[];
    dimensions: { name: string; value: string }[];
  }[];
  totals: string[];
  maximums: string[];
  minimums: string[];
  rowCount: number;
  message?: string;
} => {
  if (!response || !response.rows || response.rows.length === 0) {
    return {
      rows: [],
      totals: [],
      maximums: [],
      minimums: [],
      rowCount: 0,
      message: "No data available at the moment",
    };
  }

  const rows = response.rows.map((row: any) => {
    const metrics = row.metricValues.map((metric:any, index:any) => ({
      name: response.metricHeaders[index].name,
      value: metric.value,
    }));

    // Mapeamento explícito das dimensões com base nos nomes conhecidos
    const dimensions = row.dimensionValues.map((dimension:any, index:any) => {
      // Mapeamento direto pelo nome da dimensão, se necessário, ajuste conforme o nome retornado pela API
      let formattedName = response.dimensionHeaders[index].name;

      // Aqui você pode adicionar qualquer lógica de mapeamento específica,
      // por exemplo, traduzindo nomes de dimensões da API para os nomes desejados na sua aplicação
      switch (formattedName) {
        case 'deviceCategory':
          formattedName = 'Dispositivo';
          break;
        case 'operatingSystem':
          formattedName = 'Sistema Operacional';
          break;
        case 'browser':
          formattedName = 'Navegador';
          break;
        case 'country':
        case 'city': // Assumindo que você esteja usando 'city' para mais granularidade
          formattedName = 'Localização';
          break;
        case 'language':
          formattedName = 'Linguagem';
          break;
        // Adicione mais casos conforme necessário
      }

      return {
        name: formattedName,
        value: dimension.value,
      };
    });

    return {
      metrics,
      dimensions,
    };
  });

  return {
    rows,
    totals: response.totals,
    maximums: response.maximums,
    minimums: response.minimums,
    rowCount: response.rowCount,
  };
};

export default formatResponse;
