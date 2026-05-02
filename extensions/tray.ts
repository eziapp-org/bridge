import { call } from "../core/call"
import windowm from "./windowm";

const SPACENAME = "tray";

export type TrayMenuItem = {
    /**
     * 菜单项的类型
     */
    type: "text" | "separator" | "submenu";

    /**
     * 菜单项的标签
     */
    label: string;

    /**
     * 菜单项的id，目前不需要填，框架会自动分配
     */
    id?: number;

    /**
     * 菜单项是否可用
     */
    enabled?: boolean;

    /**
     * 菜单项是否被勾选
     */
    checked?: boolean;

    /**
     * 子菜单项，仅当type为submenu时有效
     */
    submenu?: TrayMenuItem[];

    /**
     * 点击该选项时候的回调函数
     */
    onClick?: () => void;
};

class Tray {
    private menuItems: TrayMenuItem[] = [];

    /**
     * 显示托盘图标  
     * 点击托盘图标时会显示当前js引擎所在的窗口
     * @returns 
     */
    public async show() {
        // 获取当前窗口对象
        const mainWindow = await windowm.getCurrentWindow();
        await call(SPACENAME, "show", {
            mainWindowId: mainWindow.id,
        });
        return "success";
    }

    /**
     * 隐藏托盘图标
     * @returns 
     */
    public async hide() {
        await call(SPACENAME, "hide", {});
        return "success";
    }

    /**
     * 设置托盘图标的右键菜单
     * @param menuItems 菜单项数组
     * @returns 
     */
    public async setContextMenu(menuItems: TrayMenuItem[]) {
        (window as any).__TrayMenuItemClickCallbacks_ = {};
        function assignIds(items: TrayMenuItem[], startId: number) {
            for (const item of items) {
                item.id = startId++;
                if (item.type === "submenu" && item.submenu) {
                    assignIds(item.submenu, startId);
                }
                if (item.type == "text" && typeof item.onClick === "function") {
                    (window as any)["__TrayMenuItemClickCallbacks_"][`func_${item.id}`] = item.onClick;
                }
            }
        }
        assignIds(menuItems, 2000);
        await call(SPACENAME, "setContextMenu", {
            menuItems
        });
        this.menuItems = menuItems;
        return menuItems;
    }

    /**
     * 更新托盘图标的右键菜单
     * 自动引用之前设置的菜单项数组
     * @returns 
     */
    public async update() {
        if (this.menuItems.length === 0) {
            return;
        }
        await call(SPACENAME, "setContextMenu", {
            menuItems: this.menuItems
        });
        return this.menuItems;
    }

    /**
     * 获取当前托盘图标的右键菜单项数组
     * @returns 
     */
    public getContextMenu() {
        return this.menuItems;
    }
}

export default new Tray();
