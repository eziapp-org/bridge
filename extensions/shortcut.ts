import { call } from "../core/call";
const SPACENAME = "shortcut";

// 快捷键回调管理器
const shortcutCallbacks = new Map<number, () => void>();

type Numbers = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
type Letters = "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h" | "i" | "j" | "k" | "l" | "m" | "n" | "o" | "p" | "q" | "r" | "s" | "t" | "u" | "v" | "w" | "x" | "y" | "z";

// 特殊键映射
const specialKeyMap = {
    enter: 13,
    backspace: 8,
    tab: 9,
    shift: 16,
    ctrl: 17,
    alt: 18,
    pause: 19,
    capslock: 20,
    escape: 27,
    space: 32,
    pageup: 33,
    pagedown: 34,
    end: 35,
    home: 36,
    left: 37,
    up: 38,
    right: 39,
    down: 40,
    insert: 45,
    delete: 46,
} as const;

interface options {
    ctrl?: boolean;
    alt?: boolean;
    shift?: boolean;
    meta?: boolean;
    key: Numbers | Letters | keyof typeof specialKeyMap;
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
        let id = 0;
        if (options.key.length === 1) {
            id = options.key.toUpperCase().charCodeAt(0);
        } else {
            const key = options.key.toLowerCase();
            if (key in specialKeyMap) {
                id = specialKeyMap[key as keyof typeof specialKeyMap];
            } else {
                throw new Error(`Unsupported key: ${options.key}`);
            }
        }

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