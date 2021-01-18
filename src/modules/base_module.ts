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

interface Split_date {
  year: number;
  month: number;
  day: number;
}

interface Processed_cvs_data {
  ticker: string;
  trade_date: Date;
  from: Split_date;
  to: Split_date;
}

export type { CVS_DATA, A_stock_data, Processed_cvs_data, Split_date };
