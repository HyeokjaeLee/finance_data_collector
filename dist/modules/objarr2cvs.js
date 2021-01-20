"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.save2cvs = exports.ObjArr2String = void 0;
var fs = require("fs");
var ObjArr2String = function (ObjArr, to) {
    var content = "ticker,base_date";
    for (var i = 1; i <= to; i++) {
        content = content + ",+" + i;
    }
    content = content + "\r\n";
    ObjArr.map(function (ObjArr) {
        content = content + ObjArr.ticker;
        ObjArr.data.map(function (data) {
            content = content + "," + data.price;
        });
        content = content + "\r\n";
    });
    return content;
};
exports.ObjArr2String = ObjArr2String;
var save2cvs = function (output_filePath, content) {
    fs.writeFile(output_filePath, content, function (err) {
        if (err) {
            return console.log(err);
        }
        else {
            console.log("csv파일을 성공적으로 저장했습니다.");
        }
    });
};
exports.save2cvs = save2cvs;
