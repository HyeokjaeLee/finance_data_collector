const path = require("path");
import type { CVS_DATA } from "./modules/base_module";
import { get_cvs_data } from "./modules/get_cvs_data";
import { get_stock_data, change_cvs_data_for_getting_stock_data } from "./modules/get_stock_data";
import { ObjArr2String, save2cvs } from "./modules/objarr2cvs";
const input_filePath = path.join(__dirname, "../data/input_data.csv");
const output_filePath = path.join(__dirname, "../data/output_data.csv");
const cvs_data: CVS_DATA[] = get_cvs_data(input_filePath);
const test_data = [
  { date: new Date("2021-1-5"), ticker: "PRGO" },
  { date: new Date("2021-1-2"), ticker: "HHC" },
  { date: new Date("2020-12-10"), ticker: "GEF" },
];

main(test_data, 5);

async function main(data: CVS_DATA[], to_later: number) {
  console.log(5 + "일 후 까지 데이터를 검색합니다.");
  console.log("잠시만 기다려주세요.");
  const finance_data = await get_stock_data(change_cvs_data_for_getting_stock_data(to_later, data));
  const stock_data = finance_data.stock_data;
  const error_ticker = finance_data.error_ticker;
  console.log(stock_data);
  console.log("첫번째 stock의 data object 확인:");
  console.log(stock_data[0]?.data);
  save2cvs(output_filePath, ObjArr2String(stock_data, to_later));
}
