export type Quote = {
  _id: string;
  author: string;
  text: string;
  source?: string;
  rating?: number;
};

export type QuoteCreate = {
  author: string;
  text: string;
  source?: string;
};

export type User = {
  id: string;
  email: string;
  privilege: number;
  memberSince: string;
  favorites: string[];
};

type Dataset = {
  label: string;
  data: number[];
  backgroundColor: string[];
  borderColor?: string;
  borderWidth?: number;
};

export class ChartData {
  labels: string[];
  datasets: Dataset[];

  constructor(labels: string[], data: number[], backgroundColor : string[] = []) {
    this.labels = labels;
    this.datasets = [
      {
        label: 'number of quotes',
        data: data,
        backgroundColor: backgroundColor,
      }
    ];
  }

  set borderColor(color: string) {
    this.datasets[0].borderColor = color;
  }

  set borderWidth(width: number) {
    this.datasets[0].borderWidth = width;
  }
}