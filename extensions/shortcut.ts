import { call } from "../core/call";
const SPACENAME = "shortcut";

// 快捷键回调管理器
const shortcutCallbacks = new Map<number, () => void>();

interface options {
    ctrl?: boolean;
    alt?: boolean;
    shift?: boolean;
    meta?: boolean;
    key: string;
}

class Shortcut {
    /**
     * 注册全局快捷键
     * @param options 快捷键选项
     * @param callback 快捷键触发时的回调函数
     * @returns 注册成功返回 "success"，失败 throw 错误信息
     */
    public async register(options: options, callback: () => void) {
        // id不应该用随机数字
        // 相同触发条件应该使用相同id，避免重复注册
        let id = options.key.toUpperCase().charCodeAt(0);
        if (options.ctrl) id += 1000;
        if (options.alt) id += 2000;
        if (options.shift) id += 3000;
        if (options.meta) id += 4000;

        shortcutCallbacks.set(id, callback);

        const callbackName = '__ShortCutCallback_' + id;
        (window as any)[callbackName] = callback;

        return await call(SPACENAME, "registerHotKey", {
            id,
            options,
        }) as "success";
    }
}

export default new Shortcut();