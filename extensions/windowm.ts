import { call } from "../core/call";

const SPACENAME = "windowm";

/**
 * 窗口的背景模式
 * @property opaque 纯色背景
 * @property transparent 透明背景
 * @property mica 云母背景 #Windows11+
 * @property acrylic 亚克力背景 #Windows10+
 * @platform Windows
 */
type BackgroundMode = "opaque" | "transparent" | "mica" | "acrylic";

type HexColor = `#${string}`;
type RGBColor = `rgb(${number}, ${number}, ${number})`;
type RGBAColor = `rgba(${number}, ${number}, ${number}, ${number})`;
type NamedColor =
    | "red"
    | "blue"
    | "green"
    | "yellow"
    | "purple"
    | "orange"
    | "black"
    | "white"
    | "gray"
    | "pink"
    | "cyan"
    | "magenta"
    | "lime"
    | "teal"
    | "navy"
    | "maroon"
    | "olive"
    | "silver"
    | "gold";


type BeforeCloseMessage = {
    content: string;
    extraButton: string;
}

type BeforeCloseCallback = (result: "close" | "extra" | "cancel") => void;


/**
 * 窗口的属性选项
 * @platform Windows
 */
export type WindowOptions = {
    /**
     * 窗口加载的资源路径
     * 可以写本地的虚拟文件和远程url
     * @default "index.html"
     * @example "index.html"
     * @example "https://www.example.com"
     * @platform Windows
     */
    src?: string;
    /**
     * 窗口的标题
     * @default "EziApplication"
     * @platform Windows
     */
    title?: string;
    /**
     * 窗口的尺寸
     * @default { width: 800, height: 600 }
     * @platform Windows
     */
    size?: {
        width: number;
        height: number;
    };
    /**
     * 窗口的最小尺寸
     * @default { width: 100, height: 100 }
     * @platform Windows
     */
    minSize?: {
        width: number;
        height: number;
    };
    /**
     * 窗口的位置
     * @property {x: number, y: number} 窗口的左上角坐标
     * @property "center" 窗口居中显示
     * @property "remembered" 窗口记忆上次的位置显示，初次居中
     * @default "center"
     * @platform Windows
     */
    position?:
    | {
        x?: number;
        y?: number;
    }
    | "center"
    | "remembered";
    /**
     * 窗口的背景模式
     */
    backgroundMode?: BackgroundMode;
    /**
     * 窗口的背景颜色
     * 支持rgb、rgba、hex
     * @default "#ffffff"
     * @example backgroundColor: "rgb(255, 255, 255)"
     * @example backgroundColor: "rgba(255, 255, 255, 0.5)"
     * @example backgroundColor: "#ffffff"
     * @example backgroundColor: "#ffffffaa"
     * @platform Windows
     */
    backgroundColor?: string;
    /**
     * 窗口的主题
     * @property "light" 浅色主题
     * @property "dark" 深色主题
     * @property "system" 跟随系统
     * @default "system"
     * @platform Windows
     */
    theme?: "light" | "dark" | "system";

    /**
     * 窗口的强调色  
     * 作为css变量--ezi-accent-color提供
     * @property "system" 使用系统强调色
     * @property `#${string}` 十六进制颜色值
     * @property `rgb(${number}, ${number}, ${number})` rgb颜色值
     * @property `rgba(${number}, ${number}, ${number}, ${number})` rgba颜色值
     * @property NamedColor 常用颜色名称
     * @platform Windows
     * @example "red"
     * @example "#ff0000"
     * @example "rgb(255, 0, 0)"
     * @example "rgba(255, 0, 0, 0.5)"
     * @default "system"
     */
    accentColor?: "system" | HexColor | RGBColor | RGBAColor | NamedColor;

    /**
     * 窗口的启动画面
     * @property src 启动画面的图片路径，支持png、jpg
     * @property size 启动画面的尺寸，默认图片尺寸
     * @platform Windows
     * @default {src: "ezi-logo.png", size: {width: 150, height: 150}}
     */
    splashscreen?: {
        src: string;
        size?: {
            width: number;
            height: number;
        };
    },
    /**
     * 窗口是否无边框
     * @default false
     * @platform Windows
     */
    borderless?: boolean;
    /**
     * 窗口是否可移动
     * @default true
     * @platform Windows
     */
    movable?: boolean;
    /**
     * 窗口是否可缩放
     * @default true
     * @platform Windows
     */
    resizable?: boolean;
    /**
     * 窗口是否可最小化
     * @default true
     * @platform Windows
     */
    minimizable?: boolean;
    /**
     * 窗口是否可最大化
     * @default true
     * @platform Windows
     */
    maximizable?: boolean;
    /**
     * 是否忽略鼠标事件
     * @default false
     * @platform Windows
     */
    ignoreMouseEvents?: boolean;
    /**
     * 窗口是否忽略键盘事件
     * @default false
     * @platform Windows
     */
    ignoreKeyboardEvents?: boolean;
    /**
     * 窗口是否置顶
     * @default false
     * @platform Windows
     */
    alwaysOnTop?: boolean;
    /**
     * 窗口是否不显示在任务栏
     * @default false
     * @platform Windows
     */
    skipTaskbar?: boolean;
    /**
     * 窗口是否全屏显示
     * @default false
     * @platform Windows
     */
    fullscreen?: boolean;
};

export class Window {
    public id: number;
    public title: string;

    constructor(id: number, title: string) {
        this.id = id;
        this.title = title;
    }
    ///////////////////////////////////////////////IS

    /**
     * 判断窗口是否可最大化
     * @returns {Promise<boolean>} 窗口是否可最大化
     */
    public async isMaximizable() {
        return await call(SPACENAME, "isMaximizable", {
            winId: this.id,
        }) as Promise<boolean>;
    }

    /**
     * 判断窗口是否已最大化
     * @returns {Promise<boolean>} 窗口是否已最大化
     */
    public async isMaximized() {
        return await call(SPACENAME, "isMaximized", {
            winId: this.id,
        }) as Promise<boolean>;
    }

    /**
     * 判断窗口是否可最小化
     * @returns {Promise<boolean>} 窗口是否可最小化
     */
    public async isMinimizable() {
        return await call(SPACENAME, "isMinimizable", {
            winId: this.id,
        }) as Promise<boolean>;
    }

    /**
     * 判断窗口是否已最小化
     * @returns {Promise<boolean>} 窗口是否已最小化
     */
    public async isMinimized() {
        return await call(SPACENAME, "isMinimized", {
            winId: this.id,
        }) as Promise<boolean>;
    }

    /**
     * 判断窗口是否可移动
     * @returns {Promise<boolean>} 窗口是否可移动
     */
    public async isMovable() {
        return await call(SPACENAME, "isMovable", {
            winId: this.id,
        }) as Promise<boolean>;
    }

    /**
     * 判断窗口是否已关闭
     * @returns {Promise<boolean>} 窗口是否已关闭
     */
    public async isClosed() {
        return await call(SPACENAME, "isClosed", {
            winId: this.id,
        }) as Promise<boolean>;
    }

    /**
     * 判断窗口是否可聚焦
     * @returns {Promise<boolean>} 窗口是否可聚焦
     */
    public async isFocusable() {
        return await call(SPACENAME, "isFocusable", {
            winId: this.id,
        }) as Promise<boolean>;
    }

    /**
     * 判断窗口是否已聚焦
     * @returns {Promise<boolean>} 窗口是否已聚焦
     */
    public async isFocused() {
        return await call(SPACENAME, "isFocused", {
            winId: this.id,
        }) as Promise<boolean>;
    }

    /**
     * 判断窗口是否可见
     * @returns {Promise<boolean>} 窗口是否可见
     */
    public async isVisible() {
        return await call(SPACENAME, "isVisible", {
            winId: this.id,
        }) as Promise<boolean>;
    }

    /**
     * 判断窗口是否无边框
     * @returns {Promise<boolean>} 窗口是否无边框
     */
    public async isBorderless() {
        return await call(SPACENAME, "isBorderless", {
            winId: this.id,
        }) as Promise<boolean>;
    }

    ///////////////////////////////////////////////GET

    /**
     * 获取窗口的背景模式
     * @returns {Promise<BackgroundMode>} 窗口的背景模式
     */
    public async getBackgroundMode() {
        return await call(SPACENAME, "getBackgroundMode", {
            winId: this.id,
        }) as Promise<BackgroundMode>;
    }

    /**
     * 获取窗口的尺寸
     * @returns {Promise<{width: number; height: number}>} 窗口的尺寸
     */
    public async getSize() {
        return await call(SPACENAME, "getSize", {
            winId: this.id,
        }) as Promise<{ width: number; height: number }>;
    }

    /**
     * 获取窗口的最小尺寸
     * @returns {Promise<{width: number; height: number}>} 窗口的最小尺寸
     */
    public async getMinSize() {
        return await call(SPACENAME, "getMinSize", {
            winId: this.id,
        }) as Promise<{ width: number; height: number }>;
    }

    /**
     * 获取窗口的位置
     * @returns {Promise<{x: number; y: number}>} 窗口的位置
     */
    public async getPosition() {
        return await call(SPACENAME, "getPosition", {
            winId: this.id,
        }) as Promise<{ x: number; y: number }>;
    }

    ///////////////////////////////////////////////SET

    /**
     * 设置窗口的标题
     * @param title 窗口的标题
     * @returns {Promise<"success">} 设置结果
     */
    public async setTitle(title: string) {
        const res = await call(SPACENAME, "setTitle", {
            winId: this.id,
            title,
        }) as Promise<"success">;
        this.title = title;
        return res;
    }

    /**
     * 设置窗口的背景模式
     * @param mode 窗口的背景模式
     * @returns {Promise<"success">} 设置结果
     */
    public async setBackgroundMode(mode: BackgroundMode) {
        return await call(SPACENAME, "setBackgroundMode", {
            winId: this.id,
            mode,
        }) as Promise<"success">;
    }

    /**
     * 设置窗口的尺寸
     * @param { width, height } 窗口的宽度和高度
     * @returns {Promise<"success">} 设置结果
     */
    public async setSize({ width, height }: { width: number; height: number }) {
        return await call(SPACENAME, "setSize", {
            winId: this.id,
            width,
            height,
        }) as Promise<"success">;
    }

    /**
     * 设置窗口的最小尺寸
     * @param { width, height } 窗口的最小宽度和高度
     * @returns {Promise<"success">} 设置结果
     */
    public async setMinSize({ width, height }: { width: number; height: number }) {
        return await call(SPACENAME, "setMinSize", {
            winId: this.id,
            width,
            height,
        }) as Promise<"success">;
    }

    /**
     * 设置窗口的位置
     * @param { x, y } 窗口的左上角坐标
     * @returns {Promise<"success">} 设置结果
     */
    public async setPosition({ x, y }: { x: number; y: number }) {
        return await call(SPACENAME, "setPosition", {
            winId: this.id,
            x,
            y,
        }) as Promise<"success">;
    }

    /**
     * 设置窗口是否可最大化
     * @param enable 是否可最大化
     * @returns {Promise<"success">} 设置结果
     */
    public async setMaximizable(enable: boolean) {
        return await call(SPACENAME, "setMaximizable", {
            winId: this.id,
            enable,
        }) as Promise<"success">;
    }

    /**
     * 设置窗口是否可最小化
     * @param enable 是否可最小化
     * @returns {Promise<"success">} 设置结果
     */
    public async setMinimizable(enable: boolean) {
        return await call(SPACENAME, "setMinimizable", {
            winId: this.id,
            enable,
        }) as Promise<"success">;
    }

    /**
     * 设置窗口是否可移动
     * @param enable 是否可移动
     * @returns {Promise<"success">} 设置结果
     */
    public async setMovable(enable: boolean) {
        return await call(SPACENAME, "setMovable", {
            winId: this.id,
            enable,
        }) as Promise<"success">;
    }

    /**
     * 设置窗口是否可改变大小
     * @param enable 是否可改变大小
     * @returns {Promise<"success">} 设置结果
     */
    public async setResizable(enable: boolean) {
        return await call(SPACENAME, "setResizable", {
            winId: this.id,
            enable,
        }) as Promise<"success">;
    }

    /**
     * 设置窗口是否可聚焦
     * @param enable 是否可聚焦
     * @returns {Promise<"success">} 设置结果
     */
    public async setFocusable(enable: boolean) {
        return await call(SPACENAME, "setFocusable", {
            winId: this.id,
            enable,
        }) as Promise<"success">;
    }

    /**
     * 设置窗口是否无边框
     * @param enable 是否无边框
     * @returns {Promise<"success">} 设置结果
     */
    public async setBorderless(enable: boolean) {
        return await call(SPACENAME, "setBorderless", {
            winId: this.id,
            enable,
        }) as Promise<"success">;
    }

    /**
     * 设置窗口是否置顶
     * @param enable 是否置顶
     * @returns {Promise<"success">} 设置结果
     */
    public async setAlwaysOnTop(enable: boolean) {
        return await call(SPACENAME, "setAlwaysOnTop", {
            winId: this.id,
            enable,
        }) as Promise<"success">;
    }

    /**
     * 设置窗口关闭前的提示信息
     * @param options 提示信息选项
     * @param callback 回调函数，接收用户选择的结果
     * @returns 
     */
    public setBeforeCloseMessage(options: BeforeCloseMessage, callback: BeforeCloseCallback) {
        if (typeof callback !== "function") {
            throw new Error("Callback must be a function");
        }
        if (!options || typeof options.content !== "string" || typeof options.extraButton !== "string") {
            throw new Error("Options must have content and extraButton as strings");
        }

        const callbackName = '__beforeCloseCallback_' + this.id;
        (window as any)[callbackName] = callback;

        call(SPACENAME, "setBeforeCloseMessage", {
            winId: this.id,
            options,
            callbackName
        });
        return {
            cancel: () => {
                call(SPACENAME, "setBeforeCloseMessage", {
                    winId: this.id,
                });
                delete (window as any)[callbackName];
            }
        };
    }

    ///////////////////////////////////////////////METHODS

    /**
     * 关闭窗口
     */
    public async close() {
        return await call(SPACENAME, "close", {
            winId: this.id,
        }) as Promise<"success">;
    }

    /**
     * 刷新窗口
     */
    public async reload() {
        return await call(SPACENAME, "reload", {
            winId: this.id,
        }) as Promise<"success">;
    }

    /**
     * 聚焦到窗口
     */
    public async focus() {
        return await call(SPACENAME, "focus", {
            winId: this.id,
        }) as Promise<"success">;
    }

    /**
     * 取消聚焦窗口
     */
    public async blur() {
        return await call(SPACENAME, "blur", {
            winId: this.id,
        }) as Promise<"success">;
    }

    /**
     * 最小化窗口
     */
    public async minimize() {
        return await call(SPACENAME, "minimize", {
            winId: this.id,
        }) as Promise<"success">;
    }

    /**
     * 最大化窗口
     */
    public async maximize() {
        return await call(SPACENAME, "maximize", {
            winId: this.id,
        }) as Promise<"success">;
    }

    /**    
     * 恢复窗口
     */
    public async restore() {
        return await call(SPACENAME, "restore", {
            winId: this.id,
        }) as Promise<"success">;
    }

    /**
     * 隐藏窗口
     * 如果应用程序只有一个窗口并且没有托盘图标，隐藏窗口会导致应用程序退出
     */
    public async hide() {
        return await call(SPACENAME, "hide", {
            winId: this.id,
        }) as Promise<"success">;
    }

    /**
     * 拖动窗口
     */
    public async drag() {
        return await call(SPACENAME, "drag", {
            winId: this.id,
        }) as Promise<"success">;
    }

    /**
     * 显示窗口
     */
    public async show() {
        return await call(SPACENAME, "show", {
            winId: this.id,
        }) as Promise<"success">;
    }
}

type WindowInfo = {
    id: number;
    title: string;
};

class WindowManager {
    /**
     * 获取当前js环境所在的窗口
     * @returns {Promise<Window>} 一个窗口对象
     */
    public async getCurrentWindow() {
        const currentInfo = await call(
            SPACENAME,
            "getCurrentWindow",
            {},
        ) as WindowInfo;
        return new Window(currentInfo.id, currentInfo.title);
    }

    /**
     * 获取所有窗口
     * @returns {Promise<Window[]>} 一个窗口对象数组
     */
    public async getWindowList() {
        const windowsInfo = await call(
            SPACENAME,
            "getWindowList",
            {},
        ) as WindowInfo[];
        const windowList = windowsInfo.map((windowInfo) => {
            return new Window(windowInfo.id, windowInfo.title);
        });
        return windowList;
    }

    /**
     * 获取指定标题的窗口
     * @param {string} title 窗口的标题
     * @returns {Promise<Window | null>} 一个窗口对象或者null
     */
    public async getWindowByTitle(title: string) {
        const windowList = await this.getWindowList();
        return windowList.find((window) => window.title === title) || null;
    }
    /**
     * 获取指定id的窗口
     * @param {number} id 窗口的id
     * @returns {Promise<Window | null>} 一个窗口对象或者null
     */
    public async getWindowById(id: number) {
        const windowList = await this.getWindowList();
        return windowList.find((window) => window.id === id) || null;
    }

    /**
     * 创建一个新的窗口
     * @param {WindowOptions} options 窗口的属性选项
     * @returns {Promise<Window>} 一个窗口对象
     */
    public async createWindow(options?: WindowOptions) {
        const windowInfo = await call(SPACENAME, "createWindow", {
            options,
        }) as WindowInfo;
        return new Window(windowInfo.id, windowInfo.title);
    }
}

export default new WindowManager();
