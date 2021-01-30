"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_csv_data = void 0;
var fs = require("fs");
var get_csv_data = function (filePath) {
    var load_data = fs.readFileSync(filePath, { encoding: "utf8" });
    var split_by_row = load_data.split("\n");
    var split_by_column = split_by_row.map(function (data) {
        var row_data = data.replace("\r", "");
        return row_data.split(",");
    });
    var data_value = split_by_column.slice(1);
    var result = data_value.map(function (data) { return ({ date: new Date(data[0]), ticker: data[1] }); });
    return result;
};
exports.get_csv_data = get_csv_data;
