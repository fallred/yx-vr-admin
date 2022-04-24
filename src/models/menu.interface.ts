export interface IButtonItem {
  id: number;
  mid: number;
  code: string;
  name: string;
  desc: string;
  url: string;
  menuName: string;
}
export interface MenuItem {
  menuId: number | strig;
  menuName: string;
  menuType: string;
  icon?: string;
  pid: number;
  sort: number;
  visible: number;
  url: string;
  target: string;
  mustLogin: boolean;
  selected?: boolean;
  // 子节点
  children?: MenuItem[];
  // 按钮权限
  permission?: IButtonItem[];
}

export type MenuChild = Omit<MenuItem, 'children'>;

export type MenuList = MenuItem[];
export type PerssionList = string[];
