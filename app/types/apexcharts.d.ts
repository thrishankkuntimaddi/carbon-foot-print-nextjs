declare module 'apexcharts' {
  export type ApexMarkerShape = 'circle' | 'square' | 'rect' | 'roundRect';

  export interface ApexOptions {
    chart?: {
      type?: string;
      toolbar?: {
        show?: boolean;
      };
    };
    labels?: string[];
    colors?: string[];
    legend?: {
      position?: string;
      fontSize?: string;
      markers?: {
        size?: number;
        strokeWidth?: number;
        fillColors?: string[];
        shape?: ApexMarkerShape;
        offsetX?: number;
        offsetY?: number;
        customHTML?(): any;
        onClick?(): void;
      };
    };
    plotOptions?: {
      pie?: {
        donut?: {
          size?: string;
        };
        customScale?: number;
      };
    };
    dataLabels?: {
      enabled?: boolean;
      formatter?: (val: number) => string;
      style?: {
        fontSize?: string;
        fontWeight?: number;
      };
    };
    tooltip?: {
      y?: {
        formatter?: (val: number) => string;
      };
    };
    title?: {
      text?: string;
      align?: string;
      style?: {
        fontSize?: string;
        fontWeight?: number;
      };
    };
  }
} 