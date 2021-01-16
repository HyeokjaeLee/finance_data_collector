import { get_cvs_data } from "./modules/get_cvs_data";
const path = require("path");
const yahooStockPrices = require("yahoo-stock-prices");
const filePath = path.join(__dirname, "../inputdata/data.csv");
import type { CVS_DATA, A_stock_data } from "./modules/base_module";
const cvs_data: CVS_DATA[] = get_cvs_data(filePath);

const main = async (from_ago: number, to_later: number, cvs_data: CVS_DATA[]) => {
  const from_date = cvs_data[0].date;
  from_date.setDate(from_date.getDate() - from_ago);
  console.log(from_date);
  const to_date = cvs_data[0].date;
  to_date.setDate(to_date.getDate() + to_later);
};

const main2 = async () => {
  const prices = await yahooStockPrices.getHistoricalPrices(0, 6, 2020, 0, 8, 2020, "AAPL", "1d");
  console.log(prices);
};

main2();
