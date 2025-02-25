export interface HRData {
  distance: number;
  hr: number;
  fileName: string;
  time?: string;
}
export interface PayloadItem {
  dataKey: string;
  value: number;
  payload: {
    distance: number;
  };
}

export interface CustomTooltipProps {
  active?: boolean;
  payload?: PayloadItem[] | null;
  label?: string;
}

export interface GroupedPayload {
  [key: string]: {
    hr: number;
    distance: number;
  };
}
