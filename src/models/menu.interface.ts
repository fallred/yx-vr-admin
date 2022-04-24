import { API } from "./typings";

export interface IButtonItem {
  id: number;
  code: string;
  url: string;
  menuName: string;
  // mid?: number;
  // name?: string;
  // desc?: string;
}
export interface MenuItem {
  menuId: number | strig;
  menuName: string;
  icon: string;
  url: string;
  selected?: boolean;
  // 子节点
  children?: MenuItem[];
  // 按钮权限
  permission?: IButtonItem[];
  target?: string;
  menuType?: string;
  pid?: number;
  sort?: number;
  visible?: number;
  mustLogin?: boolean;
}

export interface IFuncMenuItem {
  id: number;
  code: string;
  url: string;
  menuName: string;
}

export type MenuChild = Omit<MenuItem, 'children'>;

export type IMenuTree = MenuItem[];
export type IFuncMenuTree = IFuncMenuItem[];
export type PerssionList = string[];

export type ICheckedAuthInfo = {
   menuCheckedIds: API.IId[];
   funcCheckedIds: API.IId[];
}