import { API } from "./typings";

export interface IButtonItem {
  id: API.IId;
  code: string;
  url: string;
  menuName: string;
  // mid?: number;
  // name?: string;
  // desc?: string;
}
export interface IMenuItem {
  menuId: API.IId;
  menuName: string;
  icon: string;
  url: string;
  selected?: boolean;
  // 子节点
  children?: IMenuItem[];
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
  id: API.IId;
  code: string;
  // url: string;
  menuName: string;
  children: IFuncMenuItem[];
}

export type MenuChild = Omit<IMenuItem, 'children'>;

export type IMenuTree = IMenuItem[];
export type IFuncMenuTree = IFuncMenuItem[];
export type PerssionList = string[];

export type ICheckedAuthInfo = {
   menuCheckedIds: API.IId[];
   funcCheckedIds: API.IId[];
}