import TraceKit from "tracekit";
import dayjs from "dayjs";
import { errorReportHandle } from "@/api/common";


export default function errorReport() {
    const reportedErrors = new Map();

    TraceKit.report.subscribe((error) => {
        const { message, stack } = error || {};
        const obj = {
            message,
            type: 'trace',
            stack: {
                column: stack[0]?.column,
                line: stack[0]?.line,
                func: stack[0]?.func,
                url: stack[0]?.url,
            },
            handledByTraceKit: true,
        };
        report(obj, reportedErrors);
    });

    window.addEventListener(
        "error",
        (args) => {
            if (args.target instanceof HTMLImageElement || args.target instanceof HTMLLinkElement) {
                const err = args.target.src || args.target.href;
                if (!err) return true;

                const obj = {
                    message: "加载异常: " + err,
                    type: 'error'
                };
                report(obj, reportedErrors);
            }
        },
        true
    );
}

function report(error: any, reportedErrors: Map<string, number>) {
    const errorKey = JSON.stringify(error);
    const now = Date.now();

    if (reportedErrors.has(errorKey)) {
        const lastReportedTime = reportedErrors.get(errorKey) as number;
        if (now - lastReportedTime < 60000) {
            return;
        }
    }

    reportedErrors.set(errorKey, now);
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

    const maxRetries = 3;
    let retryCount = 0;

    const attempt = () => {
        errorReportHandle(data).catch((err) => {
            retryCount++;
            if (retryCount < maxRetries) {
                setTimeout(attempt, 1000 * retryCount);
            }
        });
    };

    attempt();
}
