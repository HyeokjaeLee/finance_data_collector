const yahooStockPrices = require("yahoo-stock-prices");
import type { CVS_DATA, Split_date, Processed_cvs_data } from "./base_module";

const split_date = (date: Date): Split_date => ({ year: date.getFullYear(), month: date.getMonth(), day: date.getDate() });
const count_date_without_holiday = (from_date: Date, to_date: Date) => {
  let holiday_count = 0;
  let date_count = Math.ceil((to_date.getTime() - from_date.getTime()) / (1000 * 3600 * 24));
  for (let i = new Date(from_date); i <= to_date; i.setDate(i.getDate() + 1)) {
    const day = i.getDay();
    if (day == 0 || day == 6) {
      holiday_count++;
    }
  }
  return date_count - holiday_count;
};

const change_cvs_data_for_getting_stock_data = (from_ago: number, to_later: number, cvs_data: CVS_DATA[]): Processed_cvs_data[] =>
  cvs_data.map((cvs_data: CVS_DATA) => {
    const date_num: number = cvs_data.date.getDate();
    const from_date: Date = new Date(cvs_data.date);
    from_date.setDate(date_num - from_ago);
    for (; count_date_without_holiday(from_date, cvs_data.date) < from_ago; ) {
      from_date.setDate(from_date.getDate() - 1);
    }
    const to_date: Date = new Date(cvs_data.date);
    to_date.setDate(date_num + to_later);
    for (; count_date_without_holiday(cvs_data.date, to_date) < to_later; ) {
      to_date.setDate(to_date.getDate() + 1);
    }
    const from_date_obj = split_date(from_date);
    const to_date_obj = split_date(to_date);
    return { ticker: cvs_data.ticker, trade_date: cvs_data.date, from: from_date_obj, to: to_date_obj };
  });

const get_stock_data = async (cvs_data: Processed_cvs_data[]) => {
  const error_ticker: string[] = [];
  let stock_data = await Promise.all(
    cvs_data.map(async (cvs_data: Processed_cvs_data) => {
      try {
        const a_stock_data = await yahooStockPrices.getHistoricalPrices(
          cvs_data.from.month,
          cvs_data.from.day,
          cvs_data.from.year,
          cvs_data.to.month,
          cvs_data.to.day,
          cvs_data.to.year,
          cvs_data.ticker,
          "1d",
        );
        const processed_stock_data = await a_stock_data.map((stock_data: any) => {
          const date = new Date("1970-1-1");
          date.setSeconds(date.getSeconds() + stock_data.date);
          return { date: date, price: stock_data.close };
        });
        return { ticker: cvs_data.ticker, trade_date: cvs_data.trade_date, data: processed_stock_data };
      } catch (e) {
        error_ticker.push(cvs_data.ticker);
      }
    }),
  );
  return { stock_data: stock_data, error_ticker: error_ticker };
};

export { get_stock_data, change_cvs_data_for_getting_stock_data };
