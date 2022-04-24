import { MenuList } from "@/models/menu.interface";
import Item from "antd/lib/list/Item";
import { MenuItemGroupProps } from "antd/lib/menu";
// 传入选中的树形菜单

/**
 * 将选中的树结构，转化成选中的树节点id，存入一个数组中
 * @param selectedMenuTree
 * @return selectedMenuIdList
 */
export function transToSelectedIds(selectedMenuTree: MenuList) {
    const selectedIds = [];
    for (item in selectedMenuTree) {
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
export function transToSelectedTree(menuTree: MenuList, selectedMenuIdList: number[], halfCheckedIdList: number[]) {
    const tempTree = [];
    for (item in menuTree) {
        const {
            ...menuProps,
            children
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
 * 查询菜单节点信息
 * @param menuTree
 * @param menuId
 * @return menuNode
 */
export function queryMenuNode(menuTree: MenuList, menuId: number) {
    for (item in menuTree) {
        if (item.menuId === menuId) {
            return item;
        }
        if (!item?.children || item?.children?.length === 0) {
            continue;
        }
        return queryMenuNode(children, menuId);
    }
}