const yahooStockPrices = require("yahoo-stock-prices");
import type { CSV_DATA, Split_date, Processed_csv_data } from "./base_module";
import { getFormatDate } from "./base_module";

//getHistoricalPrices 함수에 들어갈 변수 형식으로 날짜 분할
const split_date = (date: Date): Split_date => ({ year: date.getFullYear(), month: date.getMonth(), day: date.getDate() });
//주말에는 시장이 열지 않으므로 제외 하기위해 주말 제외(그외 공휴일은 제외하지 못함)
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
const change_csv_data_for_getting_stock_data = (to_later: number, csv_data: CSV_DATA[]): Processed_csv_data[] =>
  csv_data.map((csv_data: CSV_DATA) => {
    const from_date: Date = new Date(csv_data.date);
    from_date.setDate(csv_data.date.getDate() - 1); //csv파일의 타임존과 modules에서 받아오는 timezone문제로 -1(한국시간 기준)
    const to_date: Date = new Date(csv_data.date);
    to_date.setDate(csv_data.date.getDate() + to_later);
    for (; count_date_without_holiday(csv_data.date, to_date) < to_later; ) {
      to_date.setDate(to_date.getDate() + 1);
    }
    const from_date_obj = split_date(from_date);
    const to_date_obj = split_date(to_date);
    return { ticker: csv_data.ticker, trade_date: csv_data.date, from: from_date_obj, to: to_date_obj };
  });

const get_stock_data = async (csv_data: Processed_csv_data[]) => {
  const error_ticker: string[] = [];
  let stock_data = await Promise.all(
    csv_data.map(async (csv_data: Processed_csv_data) => {
      try {
        const a_stock_data = await yahooStockPrices.getHistoricalPrices(
          csv_data.from.month,
          csv_data.from.day,
          csv_data.from.year,
          csv_data.to.month,
          csv_data.to.day,
          csv_data.to.year,
          csv_data.ticker,
          "1d",
        );
        const processed_stock_data = await a_stock_data.map((stock_data: any) => {
          const date = new Date("1970-1-1");
          date.setSeconds(date.getSeconds() + stock_data.date);
          const date_str = getFormatDate(date, "-");
          return { date: date_str, price: stock_data.close };
        });
        processed_stock_data.reverse();
        let test = processed_stock_data.filter((data: any) => {
          return data.price != undefined;
        });
        return { ticker: csv_data.ticker, trade_date: csv_data.trade_date, data: test };
      } catch (e) {
        error_ticker.push(csv_data.ticker);
      }
    }),
  );
  return { stock_data: stock_data, error_ticker: error_ticker };
};

export { get_stock_data, change_csv_data_for_getting_stock_data };
