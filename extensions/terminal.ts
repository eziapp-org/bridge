import { call } from "../core/call";
import version from "./version";

const console_log = console.log;

const isRelease = version.isRelease();

class Terminal {
    /**
     * 将消息输出到终端（仅调试模式可用）
     * @param message 
     * @returns 
     */
    public log(...argv: any[]) {
        if (isRelease) {
            // @ts-ignore
            this.log = function () { };
            return;
        }
        console_log(...argv);
        return call("terminal", "log", {
            argv: argv,
        }) as Promise<"success">;
    }

    /**
     * 将错误消息输出到终端（仅调试模式可用）
     * @param message 
     * @returns 
     */
    public error(...argv: any[]) {
        if (isRelease) {
            // @ts-ignore
            this.error = function () { };
            return;
        }
        return call("terminal", "error", {
            argv: argv,
        }) as Promise<"success">;
    }

    /**
     * 转发所有错误信息到终端（仅调试模式可用）
     */
    public forwardErrors() {
        if (isRelease) {
            // @ts-ignore
            this.forwardErrors = function () { };
            return;
        }
        function formater(msg: any) {
            if (!msg) return "Unknown Error";
            msg = msg.replaceAll(location.origin, "LOCATION_ORIGIN");
            msg = msg.replaceAll("file:///", "");
            return msg;
        }

        window.onerror = (message, source, lineno, colno, error) => {
            const errorMsg = `Uncaught ${formater(error?.stack)}`;
            this.error(errorMsg);
        };
        window.onunhandledrejection = (event) => {
            const errorMsg = `Uncaught (in promise) ${formater(event.reason?.stack)}`;
            this.error(errorMsg);
        }
    }
}

export default new Terminal();