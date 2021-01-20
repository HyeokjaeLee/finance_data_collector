const path = require("path");
import type { CVS_DATA } from "./modules/base_module";
import { get_cvs_data } from "./modules/get_cvs_data";
import { get_stock_data, change_cvs_data_for_getting_stock_data } from "./modules/get_stock_data";
import { ObjArr2String, save2cvs } from "./modules/objarr2cvs";
const input_filePath = path.join(__dirname, "../data/input_data.csv");
const output_filePath = path.join(__dirname, "../data/output_data.csv");
const cvs_data: CVS_DATA[] = get_cvs_data(input_filePath);
const test_data: CVS_DATA[] = [
  { date: new Date("2021-1-5"), ticker: "PRGO" },
  { date: new Date("2021-1-2"), ticker: "HHC" },
  { date: new Date("2020-12-10"), ticker: "GEF" },
];

//--------------------------------------------------
const Target_CVS_DATA = test_data; // 정보를 원하는 csv데이터 (cvs_data || test_data)
const Target_to_later = 20; // 기준일로 부터 며칠후까지 데이터를 받아올지
//--------------------------------------------------

const main = async (data: CVS_DATA[], to_later: number) => {
  console.log(to_later + "일 후 까지 데이터를 검색합니다.");
  console.log("잠시만 기다려주세요.");
  const finance_data = await get_stock_data(change_cvs_data_for_getting_stock_data(to_later, data));
  const stock_data = finance_data.stock_data;
  const error_ticker = finance_data.error_ticker;
  console.log("\n-------------------전체 stock 확인-------------------\n");
  console.log(stock_data);
  console.log("\n-----------마지막 stock의 data object 확인-----------\n");
  console.log(stock_data[stock_data.length - 1]?.data);
  console.log("\n-----------------오류가 있는 ticker------------------\n");
  console.log(error_ticker);
  if ((error_ticker.length = 0)) {
    console.log("[오류가 없습니다.]");
  } else {
    console.log(error_ticker);
  }
  console.log("\n-----------------------------------------------------\n");
  save2cvs(output_filePath, ObjArr2String(stock_data, to_later));
};
main(Target_CVS_DATA, Target_to_later);
