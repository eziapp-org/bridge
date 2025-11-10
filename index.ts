import { TrayMenuItem } from "./extensions/tray";
import { WindowOptions } from "./extensions/windowm";

type EziApplication = {
    /**
     * 应用的名称
     * @default "EziApplication"
     * @platform Windows
     */
    name: string;
    /**
     * 应用的包名
     * @default "com.ezi.app"
     * @platform Windows
     */
    package: string;
    /**
     * 应用的版本号
     * @default "0.0.0"
     * @platform Windows
     */
    version?: string;
    /**
     * 应用的描述
     * @default "A Ezi Application"
     * @platform Windows
     */
    description?: string;
    /**
     * 应用的作者
     * @default "Ezi"
     * @platform Windows
     */
    author?: string;
    /**
     * 应用的图标
     * 仅支持png
     * @default "icon.png"
     * @platform Windows
     */
    icon?: string;
    /**
     * 应用是否为单实例
     * @default false
     * @platform Windows
     */
    singleInstance?: boolean;
    /**
     * 开发环境下的入口路径
     * @default "http://localhost:5173/"
     * @platform Windows
     */
    devEntry?: string;
    /**
     * 生产环境下的入口路径
     * @default "dist"
     * @platform Windows
     */
    buildEntry?: string;
};

export type EziConfig = {
    application: EziApplication;
    window?: WindowOptions;
    tray?: TrayMenuItem[];
};

export function defineConfig(config: EziConfig) {
    return config;
}