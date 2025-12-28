import { call } from "../core/call"
import { Window } from "./windowm";

const SPACENAME = "tray";

export type TrayMenuItem = {
    /**
     * 菜单项的类型
     */
    type: "normal" | "separator" | "submenu";

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
};

class Tray {
    private menuItems: TrayMenuItem[] = [];

    /**
     * 显示托盘图标
     * @param mainWindow 指定点击托盘图标时要显示的主窗口
     * @returns 
     */
    public async show(mainWindow: Window) {
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
        function assignIds(items: TrayMenuItem[], startId: number) {
            for (const item of items) {
                item.id = startId++;
                if (item.type === "submenu" && item.submenu) {
                    assignIds(item.submenu, startId);
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

    /**
     * 设置托盘图标菜单项点击回调
     * @param callback 点击回调函数，参数为被点击的菜单项，参数是被点击的菜单项对象
     */
    public setOnClick(callback: (item: TrayMenuItem) => void) {
        function findMenuItemById(items: TrayMenuItem[], id: number): TrayMenuItem {
            for (const item of items) {
                if (item.id === id) {
                    return item;
                }
                if (item.type === "submenu" && item.submenu) {
                    const found = findMenuItemById(item.submenu, id);
                    if (found) {
                        return found;
                    }
                }
            }
            return {
                type: "normal",
                id: -1,
                label: "unknown"
            };
        }

        (window as any)["__TrayMenuItemClickCallback_"] = (id: number) => {
            const menuItem = findMenuItemById(this.menuItems, id);
            callback(menuItem);
        };
        return "success";
    }
}

export default new Tray();
