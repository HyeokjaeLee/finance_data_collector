interface CSV_DATA {
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

interface Processed_csv_data {
  ticker: string;
  trade_date: Date;
  from: Split_date;
  to: Split_date;
}

function getFormatDate(input_date: Date, form: string) {
  const date = new Date(input_date);
  const num2str = (num: number) => {
    let result;
    if (num < 10) {
      result = "0" + num;
    } else {
      result = String(num);
    }
    return result;
  };
  let year: number = date.getFullYear(); //yyyy
  let month: string = num2str(1 + date.getMonth()); //M
  let day: string = num2str(date.getDate());

  return year + form + month + form + day;
}

export type { CSV_DATA, A_stock_data, Processed_csv_data, Split_date };
export { getFormatDate };
