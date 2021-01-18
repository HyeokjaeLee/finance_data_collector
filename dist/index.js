"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var readline = require("readline");
var get_cvs_data_1 = require("./modules/get_cvs_data");
var get_stock_data_1 = require("./modules/get_stock_data");
var filePath = path.join(__dirname, "../inputdata/data.csv");
var cvs_data = get_cvs_data_1.get_cvs_data(filePath);
var test_data = [
    { date: new Date("2021-1-5"), ticker: "PRGO" },
    { date: new Date("2021-1-2"), ticker: "HHC" },
    { date: new Date("2020-12-10"), ticker: "GEF" },
];
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
console.log("몇일 전 데이터 부터 검색할까요?");
var input = [];
rl.on("line", function (line) {
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
var main_fn = function (from, to, data) { return __awaiter(void 0, void 0, void 0, function () {
    var finance_data, stock_data, error_ticker;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, get_stock_data_1.get_stock_data(get_stock_data_1.change_cvs_data_for_getting_stock_data(from, to, data))];
            case 1:
                finance_data = _b.sent();
                stock_data = finance_data.stock_data;
                error_ticker = finance_data.error_ticker;
                console.log(stock_data);
                console.log("첫번째 stock의 data object 확인:");
                console.log((_a = stock_data[0]) === null || _a === void 0 ? void 0 : _a.data);
                return [2 /*return*/];
        }
    });
}); };
