import {IMenuTree} from './menu';

  // 角色
  export interface IRole {
    id: number;
    name: string;
    code: string;
    comment: string;
    deleted: number;
    // menus?:string;
    powerSelected?: string;
    selectedMenuTree?: IMenuTree;
    selectedMenuCodeList?: string[]
  }
  // 角色列表-分页
  export interface IRolePaginationResp {
    status: number;
    msg: string;
    total: number;
    pages: number;
    success: boolean;
    data: IRole[];
  }

  export type IRoleList = IRole[];