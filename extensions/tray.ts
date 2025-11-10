import { call } from "../core/call"
import { Window } from "./windowm";

const SPACENAME = "tray";

export type TrayMenuItem = {
    type: "normal" | "separator" | "submenu";
    label: string;
    id?: number;
    enabled?: boolean;
    checked?: boolean;
    submenu?: TrayMenuItem[];
};

class Tray {
    private menuItems: TrayMenuItem[] = [];
    public async show(mainWindow: Window) {
        await call(SPACENAME, "show", {
            mainWindowId: mainWindow.id,
        });
        return "success";
    }
    public async hide() {
        await call(SPACENAME, "hide", {});
        return "success";
    }

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
    public async update() {
        if (this.menuItems.length === 0) {
            return;
        }
        await call(SPACENAME, "setContextMenu", {
            menuItems: this.menuItems
        });
        return this.menuItems;
    }
    public getContextMenu() {
        return this.menuItems;
    }
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
