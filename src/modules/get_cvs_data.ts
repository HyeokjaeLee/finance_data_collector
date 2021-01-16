var fs = require("fs");
import type { CVS_DATA } from "./base_module";
const get_cvs_data = (filePath: string): CVS_DATA[] => {
  const load_data: string = fs.readFileSync(filePath, { encoding: "utf8" });
  const split_by_row: string[] = load_data.split("\n");
  const split_by_column: string[][] = split_by_row.map((data: string) => {
    const row_data: string = data.replace("\r", "");
    return row_data.split(",");
  });
  const data_value: string[][] = split_by_column.slice(1);
  const result: CVS_DATA[] = data_value.map((data: string[]) => ({ date: new Date(data[0]), ticker: data[1] }));
  return result;
};

export { get_cvs_data };
