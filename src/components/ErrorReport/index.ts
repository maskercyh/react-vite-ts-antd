import TraceKit from "tracekit";
import dayjs from "dayjs";
import { errorReportHandle } from "@/api/common";

const reportedErrors = new Set();

export default function errorReport() {
    // 订阅 TraceKit 错误
    TraceKit.report.subscribe((error) => {
        const { message, stack } = error || {};
        const obj = {
            message,
            stack: {
                column: stack[0]?.column,
                line: stack[0]?.line,
                func: stack[0]?.func,
                url: stack[0]?.url,
            },
            handledByTraceKit: true,
        };
        report(obj);
    });

    window.addEventListener(
        "error",
        (args) => {
            if (args.target instanceof HTMLImageElement || args.target instanceof HTMLLinkElement) {
                const err = args.target.src || args.target.href;
                if (!err) return true;

                const obj = {
                    message: "加载异常: " + err,
                };
                report(obj);
            }
        },
        true
    );
}

function report(error: any) {
    // 判断是否是 errorReportHandle 相关错误
    if (error?.error?.message?.includes("errorReportHandle")) {
        console.warn("忽略 errorReportHandle 错误");
        return;
    }

    const errorKey = JSON.stringify(error);
    if (reportedErrors.has(errorKey)) return;

    reportedErrors.add(errorKey);

    const data = {
        error,
        data: {
            errTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
            isMobile: /iPhone|iPad|iPod|Android/i.test(navigator.userAgent),
            isWechat: /MicroMessenger/i.test(navigator.userAgent),
            isIOS: /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream,
            isAndroid: /Android/.test(navigator.userAgent) && !/Windows Phone/.test(navigator.userAgent),
        },
        browserInfo: {
            userAgent: navigator.userAgent,
            protcol: window.location.protocol,
        },
    };

    // 错误上报带重试机制
    const maxRetries = 3;
    let retryCount = 0;

    const attempt = () => {
        errorReportHandle(data)
            .then(() => {
                console.log("错误上报成功");
            })
            .catch((err) => {
                retryCount++;
                if (retryCount < maxRetries) {
                    console.warn(`错误上报失败，重试第 ${retryCount} 次`, err);
                    setTimeout(attempt, 1000 * retryCount); // 指数退避
                } else {
                    console.error("错误上报失败，达到最大重试次数:", err);
                }
            });
    };

    attempt();
}
