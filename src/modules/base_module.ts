interface CVS_DATA {
  date: Date;
  ticker: string;
}

interface A_stock_data {
  date: Date;
  open: number;
  high: number;
  low: number;
  close: number;
}

export type { CVS_DATA, A_stock_data };
