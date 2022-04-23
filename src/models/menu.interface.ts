export interface IButtonItem {
  id: number,
  mid: number,
  code: string,
  name: string,
  desc: string,
  url: string,
  menuName: string,
}
export interface MenuItem {
  menuId: number;
  menuName: string;
  menuType: string;
  icon?: string;
  pid: number;
  sort: number;
  visible: number;
  url: string;
  target: string;
  mustLogin: boolean;
  // 子节点
  children?: MenuItem[];
  // 按钮权限
  permission?: IButtonItem[];

  /** menu item name */
  name: string;
  /** menu labels */
  label: {
    zh_CN: string;
    en_US: string;
  };
  /** 菜单id */
  key: string;
  /** 菜单路由 */
  path: string;
}

export type MenuChild = Omit<MenuItem, 'children'>;

export type MenuList = MenuItem[];
export type PerssionList = string[];
