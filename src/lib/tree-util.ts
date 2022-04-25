import cloneDeep from 'lodash/cloneDeep';
import { IMenuTree, IMenuItem, IFuncMenuTree, ICheckedAuthInfo } from "@/models/menu.interface";
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
    for (let item of selectedMenuTree) {
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
    for(let item of menuTree) {
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
export function queryMenuNode(menuTree: IMenuTree, key: string, value: any): IMenuItem {
    for(let i = 0; i < menuTree.length; i++) {
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
    let menuNodes = [];
    let funcNodes = [];
    for(let temp of selectedMenuTree) {
        if (temp.selected) {
            menuNodes.push(temp.menuId);
        }
        if (temp.permission && temp.permission.length > 0) {
            for(btemp of temp.permission) {
                funcNodes.push(btemp.id);
            }
        }
        if (temp.children) {
            const {menuCheckedIds, funcCheckedIds} = queryMenuAndFuncNodes(temp.children);
            menuNodes = menuNodes.concat(menuCheckedIds);
            funcNodes = funcNodes.concat(funcCheckedIds);
        }
    }
    return {menuNodes, funcNodes};
}

/**
 * 传入系统原始菜单树，和选中的菜单keys。返回选中的功能按钮树
 * @param systemMenuTree
 * @param menuIds 包含半选菜单id
 * @return funcMenuTree
 */
export function genFuncTree(pname: String = '', systemMenuTree: IMenuTree, menuCheckedIds: API.IID[]): IFuncMenuTree {
    let funcMenuTree = [];
    for(let i = 0; i < systemMenuTree.length; i++) {
        let temp = cloneDeep(systemMenuTree[i]);
        temp.menuName = pname ? `${pname}/${temp.menuName}` : temp.menuName;
        if (!menuCheckedIds.includes(temp.menuId)) {
            continue;
        }
        if ((!temp.permission || temp?.permission.length === 0)
            && (!temp.children || temp?.children.length === 0)) {
            continue;
        }
        if ((temp?.permission?.length === 0 || !temp.permission)
            && temp.children) {
            const funcMenuTreeOneLevel = genFuncTree(temp.menuName, temp.children, menuCheckedIds);
            funcMenuTree = funcMenuTree.concat(funcMenuTreeOneLevel);
        }
        if ((temp?.children?.length === 0 || !temp.children)
            && temp.permission) {
            const fucnMenuTreeNodeChildren = [];
            for (let pTemp of temp.permission) {
                fucnMenuTreeNodeChildren.push({
                    id: pTemp.id,
                    code: pTemp.code,
                    url: pTemp.url,
                    menuName: pTemp.menuName
                });
            }
            funcMenuTree.push({
                id: temp.menuId,
                code: temp.code,
                // url: string,
                menuName: temp.menuName,
                children: fucnMenuTreeNodeChildren,
            });
        }
    }
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
    const checkedTree = [];
    for(let i = 0; i < systemMenuTree.length; i++) {
        let temp = cloneDeep(systemMenuTree[i]);
        if (menuCheckedIds.includes(temp.menuId)) {
            temp.selected = true;
        }
        else if (!menuCheckedIds.includes(temp.menuId)
            && temp?.children?.length > 0) {
            const childrenTree = genSelectedAuthTree(temp.children, menuCheckedIds, funcCheckedIds);
            if (childrenTree?.length === 0) {
                continue;
            }
            temp.children = childrenTree;
            checkedTree.push(temp);
        }
        if (temp?.permission?.length > 0) {
            const pList = [];
            for(let pTemp of temp.permission) {
                if (!funcCheckedIds.includes(pTemp.id)) {
                    continue;
                }
                pList.push(pTemp);
            }
            temp.permission = pList;
            checkedTree.push(temp);
        }
    }
    return checkedTree;
}