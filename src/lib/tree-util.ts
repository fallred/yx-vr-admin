import { MenuList } from "@/models/menu.interface";
// 传入选中的树形菜单

/**
 * 将选中的树结构，转化成选中的树节点id，存入一个数组中
 * @param selectedMenuTree
 * @returns selectedMenuIdList
 */
export function transToSelectedIds(selectedMenuTree: MenuList) {
    selectedIds = []
    for item in selectedMenuTree:
        if item.visible:
            selectedIds.append(item.menuId)
        children = item?.children
        if not children:
            continue
        select_children = transToSelectedIds(children)
        selectedIds.append(select_children)
    return selectedIds
}

/**
 * 将所有菜单节点树，选中的菜单id。转化为选中的节点的树
 * @param menuTree
 * @param selectedMenuIdList
 * @return selectedMenuTree
 */
export function transToSelectedTree(menuTree: MenuList, selectedMenuIdList: number[]) {
    for item in menuTree:
        if selectedMenuIdList.contains(item.menuId):
            item.visible = 1
        children = item?.children
        if not children:
            continue
        transToSelectedTree(children, selectedMenuIdList)
    return menuTree
        
}

export function queryMenuNode(menuTree: MenuList, menuId: number) {
    for item in menuTree:
        if item.menuId == menuId:
            return item
        children = item?.children
        if not children:
            continue
        reutrn queryMenuNode(children, menuId)
}