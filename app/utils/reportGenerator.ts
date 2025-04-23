interface ReportData {
  energy?: {
    electricity?: { value: number; unit: string; trend: string; percentage: number };
    gas?: { value: number; unit: string; trend: string; percentage: number };
    renewable?: { value: number; unit: string; trend: string; percentage: number };
  };
  transportation?: {
    fleet?: {
      total_vehicles?: { value: number; unit: string; trend: string; percentage: number };
      electric_vehicles?: { value: number; unit: string; trend: string; percentage: number };
      fuel_efficiency?: { value: number; unit: string; trend: string; percentage: number };
    };
    business_travel?: {
      air_travel?: { value: number; unit: string; trend: string; percentage: number };
      rail_travel?: { value: number; unit: string; trend: string; percentage: number };
      road_travel?: { value: number; unit: string; trend: string; percentage: number };
    };
    logistics?: {
      shipping_distance?: { value: number; unit: string; trend: string; percentage: number };
      fuel_consumption?: { value: number; unit: string; trend: string; percentage: number };
      route_optimization?: { value: number; unit: string; trend: string; percentage: number };
    };
  };
  waste?: {
    generation?: {
      total_waste?: { value: number; unit: string; trend: string; percentage: number };
      hazardous_waste?: { value: number; unit: string; trend: string; percentage: number };
      non_hazardous_waste?: { value: number; unit: string; trend: string; percentage: number };
    };
    recycling?: {
      recycling_rate?: { value: number; unit: string; trend: string; percentage: number };
      recycled_materials?: { value: number; unit: string; trend: string; percentage: number };
      composting_rate?: { value: number; unit: string; trend: string; percentage: number };
    };
    disposal?: {
      landfill?: { value: number; unit: string; trend: string; percentage: number };
      incineration?: { value: number; unit: string; trend: string; percentage: number };
      other_methods?: { value: number; unit: string; trend: string; percentage: number };
    };
  };
  materials?: {
    raw_materials?: {
      steel?: { value: number; unit: string; trend: string; percentage: number };
      plastic?: { value: number; unit: string; trend: string; percentage: number };
      paper?: { value: number; unit: string; trend: string; percentage: number };
    };
    sustainable_materials?: {
      recycled_steel?: { value: number; unit: string; trend: string; percentage: number };
      bioplastic?: { value: number; unit: string; trend: string; percentage: number };
      recycled_paper?: { value: number; unit: string; trend: string; percentage: number };
    };
    sourcing?: {
      local_suppliers?: { value: number; unit: string; trend: string; percentage: number };
      international_suppliers?: { value: number; unit: string; trend: string; percentage: number };
    };
  };
  production?: {
    manufacturing?: {
      energy_intensity?: { value: number; unit: string; trend: string; percentage: number };
      process_emissions?: { value: number; unit: string; trend: string; percentage: number };
      automation_level?: { value: number; unit: string; trend: string; percentage: number };
    };
    efficiency_metrics?: {
      material_efficiency?: { value: number; unit: string; trend: string; percentage: number };
      energy_efficiency?: { value: number; unit: string; trend: string; percentage: number };
      waste_reduction?: { value: number; unit: string; trend: string; percentage: number };
    };
    process_improvements?: {
      [key: string]: { value: number; unit: string; trend: string; percentage: number };
    };
  };
  water?: {
    consumption?: {
      total_usage?: { value: number; unit: string; trend: string; percentage: number };
      recycled_water?: { value: number; unit: string; trend: string; percentage: number };
      water_efficiency?: { value: number; unit: string; trend: string; percentage: number };
    };
    wastewater?: {
      treatment_efficiency?: { value: number; unit: string; trend: string; percentage: number };
      discharge_quality?: { value: number; unit: string; trend: string; percentage: number };
      recycling_rate?: { value: number; unit: string; trend: string; percentage: number };
    };
    conservation_measures?: {
      [key: string]: { value: number; unit: string; trend: string; percentage: number };
    };
  };
  digital?: {
    data_centers?: {
      energy_consumption?: { value: number; unit: string; trend: string; percentage: number };
      pue_ratio?: { value: number; unit: string; trend: string; percentage: number };
      renewable_energy?: { value: number; unit: string; trend: string; percentage: number };
    };
    it_equipment?: {
      server_efficiency?: { value: number; unit: string; trend: string; percentage: number };
      storage_efficiency?: { value: number; unit: string; trend: string; percentage: number };
      network_efficiency?: { value: number; unit: string; trend: string; percentage: number };
    };
    optimization_measures?: {
      [key: string]: { value: number; unit: string; trend: string; percentage: number };
    };
  };
}

interface ReportError extends Error {
  code: string;
  details?: any;
}

export class ReportGenerationError extends Error implements ReportError {
  code: string;
  details?: any;

  constructor(message: string, code: string, details?: any) {
    super(message);
    this.name = 'ReportGenerationError';
    this.code = code;
    this.details = details;
  }
}

export const generateReportData = async (): Promise<ReportData> => {
  try {
    const response = await fetch('/api/report');
    
    if (!response.ok) {
      throw new ReportGenerationError(
        'Failed to fetch report data',
        'API_ERROR',
        { status: response.status, statusText: response.statusText }
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof ReportGenerationError) {
      throw error;
    }
    throw new ReportGenerationError(
      'Error generating report data',
      'UNKNOWN_ERROR',
      error
    );
  }
};

export const generateCSV = (data: ReportData): string => {
  try {
    const headers = [
      'Category',
      'Subcategory',
      'Metric',
      'Value',
      'Unit',
      'Trend',
      'Percentage',
    ];
    const rows: string[] = [];

    const processCategory = (
      category: string,
      data: any,
      subcategory?: string
    ) => {
      if (!data || typeof data !== 'object') return;

      Object.entries(data).forEach(([key, value]) => {
        if (typeof value === 'object' && value !== null) {
          if ('value' in value) {
            // This is a metric with value, unit, trend, and percentage
            const metric = value as {
              value: number;
              unit: string;
              trend: string;
              percentage: number;
            };
            rows.push(
              `${category},${subcategory || ''},${key},${metric.value},${metric.unit},${metric.trend},${metric.percentage}`
            );
          } else {
            // This is a subcategory, process it recursively
            processCategory(category, value, key);
          }
        }
      });
    };

    Object.entries(data).forEach(([category, categoryData]) => {
      processCategory(category, categoryData);
    });

    return [headers.join(','), ...rows].join('\n');
  } catch (error) {
    throw new ReportGenerationError(
      'Error generating CSV',
      'CSV_GENERATION_ERROR',
      error
    );
  }
};

export const generatePDFContent = (data: ReportData): string => {
  try {
    let content = `
      <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #1a1a1a; text-align: center; margin-bottom: 30px;">Carbon Footprint Report</h1>
        <div style="margin-bottom: 20px;">
          <p style="color: #4a5568; font-size: 14px;">Generated on: ${new Date().toLocaleDateString()}</p>
        </div>
    `;

    const processCategory = (
      category: string,
      data: any,
      subcategory?: string
    ) => {
      if (!data || typeof data !== 'object') return;

      if (subcategory) {
        content += `
          <div style="margin: 15px 0;">
            <h3 style="color: #4a5568; margin-bottom: 10px;">${subcategory}</h3>
        `;
      }

      Object.entries(data).forEach(([key, value]) => {
        if (typeof value === 'object' && value !== null) {
          if ('value' in value) {
            // This is a metric with value, unit, trend, and percentage
            const metric = value as {
              value: number;
              unit: string;
              trend: string;
              percentage: number;
            };
            const trendColor = metric.trend === 'up' ? '#e53e3e' : '#38a169';
            content += `
              <p style="margin: 5px 0; color: #4a5568;">
                ${key}: ${metric.value} ${metric.unit}
                <span style="color: ${trendColor}">
                  (${metric.trend} ${metric.percentage}%)
                </span>
              </p>
            `;
          } else {
            // This is a subcategory, process it recursively
            processCategory(category, value, key);
          }
        }
      });

      if (subcategory) {
        content += `</div>`;
      }
    };

    Object.entries(data).forEach(([category, categoryData]) => {
      content += `
        <div style="margin-bottom: 30px;">
          <h2 style="color: #2d3748; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">${category}</h2>
      `;
      processCategory(category, categoryData);
      content += `</div>`;
    });

    content += `</div>`;

    return content;
  } catch (error) {
    throw new ReportGenerationError(
      'Error generating PDF content',
      'PDF_GENERATION_ERROR',
      error
    );
  }
}; 