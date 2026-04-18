import { call } from "../core/call";
const SPACENAME = "shortcut";

// 快捷键回调管理器
const shortcutCallbacks = new Map<number, () => void>();

interface options{
    ctrl?: boolean;
    alt?: boolean;
    shift?: boolean;
    meta?: boolean;
    key: string;
}

// 随机id数字 min max之间的整数
function randomId(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

class Shortcut {
    /**
     * 注册全局快捷键
     * @param options 快捷键选项
     * @param callback 快捷键触发时的回调函数
     * @returns 注册成功返回 "success"，失败 throw 错误信息
     */
    public async register(options: options, callback: () => void) {
        // 随机id数字
        const id = randomId(1, 1000000);
        shortcutCallbacks.set(id, callback);
        const result = await call(SPACENAME, "registerHotKey", {
            id,
            options,
        }) as "success";
        const callbackName = '__ShortCutCallback_' + id;
        (window as any)[callbackName] = callback;
        
        return result;
    }
}

export default new Shortcut();