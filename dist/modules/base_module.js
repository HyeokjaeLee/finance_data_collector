"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFormatDate = void 0;
function getFormatDate(input_date, form) {
    var date = new Date(input_date);
    var num2str = function (num) {
        var result;
        if (num < 10) {
            result = "0" + num;
        }
        else {
            result = String(num);
        }
        return result;
    };
    var year = date.getFullYear(); //yyyy
    var month = num2str(1 + date.getMonth()); //M
    var day = num2str(date.getDate());
    return year + form + month + form + day;
}
exports.getFormatDate = getFormatDate;
