import SourceMap from "source-map";
import dayjs from "dayjs";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

export default function errorReportHandle(req, res) {
  const urlParams = req.body;
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const today = dayjs().format("YYYY-MM-DD"); // 今天

  const logDirPath = path.join(__dirname, "log");
  const logFilePath = path.join(logDirPath, `log-${today}.txt`);

  if (!fs.existsSync(logDirPath)) {
    fs.mkdirSync(logDirPath, { recursive: true });
  }
  if (!fs.existsSync(logFilePath)) {
    fs.writeFileSync(logFilePath, "", "utf8");
  }

  const writeStream = fs.createWriteStream(logFilePath, { flags: "a" });
  writeStream.on("open", () => {
    writeStream.write("错误类型：Window" + "\n");
    writeStream.write("错误发生时间：" + urlParams.data.errTime + "\n");
    writeStream.write("IP：" + req.ip + "\n");
    writeStream.write(
      `安卓: ${urlParams.data.isAndroid} IOS: ${urlParams.data.isIOS} 移动端: ${urlParams.data.isMobile} 微信: ${urlParams.data.isWechat} （安卓和ios同时为false表示未知设备）` +
        "\n"
    );
    writeStream.write("用户代理：" + urlParams.browserInfo.userAgent + "\n");
    writeStream.write("错误信息：" + urlParams.error.message + "\n");
    writeStream.write("---------------------------------- \n");

    writeStream.end(() => {
      res.status(200).json({
        data: "错误上报成功",
        status: 200,
      });
    });
  });

  writeStream.on("error", (err) => {
    res.status(404).json({
      data: "错误上报失败",
      status: 404,
    });
  });
}
