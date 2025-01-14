import SourceMap from "source-map";
import dayjs from "dayjs";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

export default async function errorReportHandle(req, res) {
  const urlParams = req.body;
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const today = dayjs().format("YYYY-MM-DD"); // 今天

  const logDirPath = path.join(__dirname, "log");
  const logFilePath = path.join(logDirPath, `log-${today}.txt`);
  let sourceMapParseResult;

  if (!fs.existsSync(logDirPath)) {
    fs.mkdirSync(logDirPath, { recursive: true });
  }
  if (!fs.existsSync(logFilePath)) {
    fs.writeFileSync(logFilePath, "", "utf8");
  }
  if (urlParams.error.type === "trace") {
    const stack = urlParams.error.stack;
    // 获取文件名
    const fileName = path.basename(stack.url);
    // 查找map文件
    const filePath = path.join(__dirname, "mapjs", fileName + ".map");
    const readFile = function (filePath) {
      return new Promise((resolve, reject) => {
        fs.readFile(filePath, { encoding: "utf-8" }, (err, data) => {
          if (err) {
            console.log("readFileErr", err);
            return reject(err);
          }
          resolve(JSON.parse(data));
        });
      });
    };

    async function searchSource({ filePath, line, column }) {
      const rawSourceMap = await readFile(filePath);
      const consumer = await new SourceMap.SourceMapConsumer(rawSourceMap);
      const res = consumer.originalPositionFor({ line, column });
      consumer.destroy();
      return res;
    }
    try {
      sourceMapParseResult = await searchSource({
        filePath,
        line: stack.line,
        column: stack.column,
      });
    } catch (err) {
      sourceMapParseResult = "SourceMap解析失败:";
    }
  }
  const writeStream = fs.createWriteStream(logFilePath, { flags: "a" });
  const appendLog = async (filePath, data) => {
    return new Promise((resolve, reject) => {
      fs.appendFile(filePath, data, (err) => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  };

  writeStream.on("open", async () => {
    const logData = [
      "错误类型：Window\n",
      "错误发生时间：" + urlParams.data.errTime + "\n",
      "IP：" + req.ip + "\n",
      `安卓: ${urlParams.data.isAndroid} IOS: ${urlParams.data.isIOS} 移动端: ${urlParams.data.isMobile} 微信: ${urlParams.data.isWechat} （安卓和ios同时为false表示未知设备）\n`,
      "用户代理：" + urlParams.browserInfo.userAgent + "\n",
      "错误信息：" + urlParams.error.message + "\n",
      sourceMapParseResult
        ? "详细文件" + JSON.stringify(sourceMapParseResult) + "\n"
        : "",
      "---------------------------------- \n",
    ].join("");

    try {
      await appendLog(logFilePath, logData);
      res.status(200).json({
        data: "错误上报成功",
        status: 200,
      });
    } catch (err) {
      res.status(404).json({
        data: "错误上报失败",
        status: 404,
      });
    }
  });
}
