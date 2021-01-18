const path = require("path");
const filePath = path.join(__dirname, "../inputdata/data.csv");
import type { CVS_DATA } from "./modules/base_module";
import { get_cvs_data } from "./modules/get_cvs_data";
import { get_stock_data, change_cvs_data_for_getting_stock_data } from "./modules/get_stock_data";
const cvs_data: CVS_DATA[] = get_cvs_data(filePath);

const test_data = [
  { date: new Date("2021-1-5"), ticker: "PRGO" },
  { date: new Date("2021-1-2"), ticker: "PRGO" },
];

const main_fn = async () => {
  const finance_data = await get_stock_data(change_cvs_data_for_getting_stock_data(1, 2, test_data));
  const stock_data = finance_data.stock_data;
  const error_ticker = finance_data.error_ticker;
  console.log(stock_data[1]?.data);
};

main_fn();
