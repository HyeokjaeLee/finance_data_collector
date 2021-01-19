const fs = require("fs");
const ObjArr2String = (ObjArr: any, to: number) => {
  let content: string = "ticker,base_date";
  for (let i = 1; i <= to; i++) {
    content = content + ",+" + i;
  }
  content = content + "\r\n";
  ObjArr.map((ObjArr: any) => {
    content = content + ObjArr.ticker;
    ObjArr.data.map((data: any) => {
      content = content + "," + data.price;
    });
    content = content + "\r\n";
  });
  return content;
};

const save2cvs = (output_filePath: any, content: string) => {
  fs.writeFile(output_filePath, content, function (err: any) {
    if (err) {
      return console.log(err);
    }
    console.log("The file was saved!");
  });
};

export { ObjArr2String, save2cvs };
