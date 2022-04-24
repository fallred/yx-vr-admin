import { IMenuTree, MenuItem, IFuncMenuTree, ICheckedAuthInfo } from "@/models/menu.interface";
import { API } from "@/models/typings";
import Item from "antd/lib/list/Item";
import { MenuItemGroupProps } from "antd/lib/menu";
// 传入选中的树形菜单

/**
 * 将选中的树结构，转化成选中的树节点id，存入一个数组中
 * @param selectedMenuTree
 * @return selectedMenuIdList
 */
export function transToSelectedIds(selectedMenuTree: IMenuTree) {
    const selectedIds = [];
    for (let item in selectedMenuTree) {
        if (item.visible) {
            selectedIds.push(item.menuId);
        }
        if (!item?.children || item?.children?.length === 0) {
            continue;
        }
        const selectedChildren = transToSelectedIds(item.children);
        selectedIds.push(selectedChildren);
    }
    return selectedIds
}

/**
 * 将所有菜单节点树，选中的菜单id, 半选的菜单id，转化为选中的节点的树
 * @param menuTree
 * @param selectedMenuIdList
 * @param selectedMenuIdList
 * @return selectedMenuTree
 */
export function transToSelectedTree(menuTree: IMenuTree, selectedMenuIdList: number[], halfCheckedIdList: number[]) {
    const tempTree = [];
    for (let item in menuTree) {
        const {
            children,
            ...menuProps
        } = item;
        const itemTemp = {...menuProps};
        if (selectedMenuIdList.includes(item.menuId)) {
            itemTemp.selected = true;
            if (!children || children.length === 0) {
                continue;
            }
            itemTemp.children = transToSelectedTree(children, selectedMenuIdList);
            tempTree.push(itemTemp);
        }
        // 半选，说明一定有子节点，无需判断
        if (halfCheckedIdList.includes(item.menuId)) {
            itemTemp.selected = false;
            // 说明一定有子节点，无需判断
            // if (!children || children.length === 0) {
            //     continue;
            // }
            itemTemp.children = transToSelectedTree(children, selectedMenuIdList);
            tempTree.push(itemTemp);
        }
    }
    return tempTree;
}

/**
 * 查询根据节点key查询菜单节点信息
 * @param menuTree
 * @param key 'menuId'
 * @param value menuId -> value
 * @return menuNode
 */
export function queryMenuNode(menuTree: IMenuTree, key: string, value: any): MenuItem {
    for (let i = 0; i < menuTree.length; i++) {
        const item = menuTree[i];
        if (item?.[key] === value) {
            return item;
        }
        if (!item?.children || item?.children?.length === 0) {
            continue;
        }
        return queryMenuNode(item?.children, key, value);
    }
}

/**
 * 传入选中的树，返回选中的菜单keys, 和功能按钮keys
 * @param selectedMenuTree
 * @return menuNodes  funcNodes
 */
export function queryMenuAndFuncNodes(selectedMenuTree: IMenuTree): ICheckedAuthInfo {
}

/**
 * 传入系统原始菜单树，和选中的菜单keys。返回选中的功能按钮树
 * @param systemMenuTree
 * @param menuIds
 * @return funcMenuTree
 */
export function genFuncTree(systemMenuTree: IMenuTree, menuCheckedIds: API.IID[]): IFuncMenuTree {
}