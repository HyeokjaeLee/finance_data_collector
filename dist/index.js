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
var get_cvs_data_1 = require("./modules/get_cvs_data");
var path = require("path");
var yahooStockPrices = require("yahoo-stock-prices");
var filePath = path.join(__dirname, "../inputdata/data.csv");
var cvs_data = get_cvs_data_1.get_cvs_data(filePath);
var split_date = function (date) { return ({ year: date.getFullYear(), month: date.getMonth(), day: date.getDate() }); };
var count_date_without_holiday = function (from_date, to_date) {
    var holiday_count = 0;
    var date_count = Math.ceil((to_date.getTime() - from_date.getTime()) / (1000 * 3600 * 24));
    for (var i = new Date(from_date); i <= to_date; i.setDate(i.getDate() + 1)) {
        var day = i.getDay();
        if (day == 0 || day == 6) {
            holiday_count++;
        }
    }
    return date_count - holiday_count;
};
var change_cvs_data_for_getting_stock_data = function (from_ago, to_later, cvs_data) {
    return cvs_data.map(function (cvs_data) {
        var date_num = cvs_data.date.getDate();
        var from_date = new Date(cvs_data.date);
        from_date.setDate(date_num - from_ago);
        for (; count_date_without_holiday(from_date, cvs_data.date) < from_ago;) {
            from_date.setDate(from_date.getDate() - 1);
        }
        var to_date = new Date(cvs_data.date);
        to_date.setDate(date_num + to_later);
        for (; count_date_without_holiday(cvs_data.date, to_date) < to_later;) {
            to_date.setDate(to_date.getDate() + 1);
        }
        var from_date_obj = split_date(from_date);
        var to_date_obj = split_date(to_date);
        return { ticker: cvs_data.ticker, trade_date: cvs_data.date, from: from_date_obj, to: to_date_obj };
    });
};
var get_stock_data = function (cvs_data) { return __awaiter(void 0, void 0, void 0, function () {
    var error_ticker, stock_data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                error_ticker = [];
                stock_data = { ticker: undefined, trade_date: undefined, data: undefined };
                return [4 /*yield*/, Promise.all(cvs_data.map(function (cvs_data) { return __awaiter(void 0, void 0, void 0, function () {
                        var a_stock_data, processed_stock_data, e_1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 3, , 4]);
                                    return [4 /*yield*/, yahooStockPrices.getHistoricalPrices(cvs_data.from.month, cvs_data.from.day, cvs_data.from.year, cvs_data.to.month, cvs_data.to.day, cvs_data.to.year, cvs_data.ticker, "1d")];
                                case 1:
                                    a_stock_data = _a.sent();
                                    return [4 /*yield*/, a_stock_data.map(function (stock_data) {
                                            var date = new Date("1970-1-1");
                                            date.setSeconds(date.getSeconds() + stock_data.date);
                                            return { date: date, price: stock_data.close };
                                        })];
                                case 2:
                                    processed_stock_data = _a.sent();
                                    stock_data["ticker"] = cvs_data.ticker;
                                    stock_data["trade_date"] = cvs_data.trade_date;
                                    stock_data["data"] = processed_stock_data;
                                    return [3 /*break*/, 4];
                                case 3:
                                    e_1 = _a.sent();
                                    error_ticker.push(cvs_data.ticker);
                                    return [3 /*break*/, 4];
                                case 4: return [2 /*return*/];
                            }
                        });
                    }); }))];
            case 1:
                _a.sent();
                console.log(stock_data);
                return [2 /*return*/, { stock_data: stock_data, error_ticker: error_ticker }];
        }
    });
}); };
var test_data = [{ date: new Date("2021-1-5"), ticker: "PRGO" }];
get_stock_data(change_cvs_data_for_getting_stock_data(1, 2, test_data));
