const path = require("path");
const readline = require("readline");
import type { CVS_DATA } from "./modules/base_module";
import { get_cvs_data } from "./modules/get_cvs_data";
import { get_stock_data, change_cvs_data_for_getting_stock_data } from "./modules/get_stock_data";
const filePath = path.join(__dirname, "../inputdata/data.csv");
const cvs_data: CVS_DATA[] = get_cvs_data(filePath);

const test_data = [
  { date: new Date("2021-1-5"), ticker: "PRGO" },
  { date: new Date("2021-1-2"), ticker: "HHC" },
  { date: new Date("2020-12-10"), ticker: "GEF" },
];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
console.log("몇일 전 데이터 부터 검색할까요?");
let input: any = [];
rl.on("line", function (line: number) {
  input.push(line);
  switch (input.length) {
    case 1:
      console.log("몇일 후 데이터 까지 검색할까요?");
      break;
    case 2:
      console.log(input[0] + "일 전 부터 " + input[1] + "일 후 까지 데이터를 검색합니다.");
      console.log("잠시만 기다려주세요.");
      main_fn(Number(input[0]), Number(input[1]), test_data);
      break;
    case 3:
      rl.close();
      break;
  }
});

const main_fn = async (from: number, to: number, data: CVS_DATA[]) => {
  const finance_data = await get_stock_data(change_cvs_data_for_getting_stock_data(from, to, data));
  const stock_data = finance_data.stock_data;
  const error_ticker = finance_data.error_ticker;
  console.log(stock_data);
  console.log("첫번째 stock의 data object 확인:");
  console.log(stock_data[0]?.data);
};
