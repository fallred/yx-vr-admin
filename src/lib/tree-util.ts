import { IMenuTree, MenuItem, IFuncMenuTree, ICheckedAuthInfo } from "@/models/menu.interface";
import { API } from "@/models/typings";
import Item from "antd/lib/list/Item";
import { MenuItemGroupProps } from "antd/lib/menu";
import { POINT_CONVERSION_COMPRESSED } from "constants";
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
    menuNodes, funcNodes = list(), list()
    for temp in selectedMenuTree:
        if temp.selected  == 1:
            menuNodes.append(temp.menuId)
        if temp.permission:
            for btemp in temp.permission:
                funcNodes.append(temp.id)
        if temp.children:
            s_menuNodes, s_funcNodes = queryMenuAndFuncNodes(tem.children)
            menuNodes.extends(s_menuNodes)
            funcNodes.extends(s_funcNodes)
    return menuNodes, funcNodes

}

/**
 * 传入系统原始菜单树，和选中的菜单keys。返回选中的功能按钮树
 * @param systemMenuTree
 * @param menuIds 包含半选菜单id
 * @return funcMenuTree
 */
export function genFuncTree(pname: String, systemMenuTree: IMenuTree, menuCheckedIds: API.IID[]): IFuncMenuTree {
    funcMenuTree = list()
    for temp in systemMenuTree:
        temp.menuName = pname is not null ? (pname +"/"+temp.menuName) : temp.menuName
        if not menuCheckedIds.contains(temp.menuId):
            continue
        if not temp.permission and not temp.children:
            continue
        if temp.children and not temp.permission:
            c_funcMenuTree = getFuncTree(temp.menuName, temp.children, menuCheckedIds)
            funcMenuTree.extends(c_funcMenuTree)
        if not temp.children and temp.permission:
            fucnMenuTreeNodeChildren = list()
            for p_temp in temp.permission:
                fucnMenuTreeNodeChildren.append({
                    id: p_temp.id;
                    code: p_temp.code;
                    url: p_temp.url;
                    menuName: p_temp.menuName
                })
            funcMenuTree.append({
                id: temp.id;
                code: temp.code;
                // url: string;
                menuName: temp.menuName;
                children: fucnMenuTreeNodeChildren;
            })
    return funcMenuTree
}

/**
 * 传入系统菜单，选中的菜单id列表，选中的按钮id列表。返回后端的选中的权限树（包含perssions按钮权限）
 * @param systemMenuTree
 * @param menuCheckedIds 半选不给父节点id
 * @param funcCheckedIds
 * @return selectedMenuTree
 */
export function genSelectedAuthTree(systemMenuTree: IMenuTree, menuCheckedIds: API.IID[], funcCheckedIds: API.IID[]): IMenuTree {
    checkedTree = list()
    for temp in systemMenuTree:
        if menuCheckedIds.contains(temp.menuId):
            temp.selected = 1
        else if not menuCheckedIds.contains(temp.menuId) and temp.children is not null:
            selected_children = genSelectedAuthTree(temp.children, menuCheckedIds, funcCheckedIds)
            if selected_children is null:
                continue
            temp.children = selected_children
        if temp.permission is not null:
            p_list = list()
            for p_temp in temp.permission:
                if not funcCheckedIds.contains(p_temp.id):
                    continue
                p_list.append(p_temp)
            temp.permission = p_list
        checkedTree.append(temp)
    return checkedTree
}