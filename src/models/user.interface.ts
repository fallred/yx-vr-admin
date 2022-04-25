import {IApp} from '@/models/app.interface';

export enum IdentifyTypeEnum {
    'PLATFORM' = 1,
    'RELATION' = 2,
}

export enum UserStatusEnum {
    'NORMAL' = 0,
    'FREEZE' = 1,
    'DISABLED' = 2
}

export interface IUser {
    id: API.IId;
    username: string;
    realName: string;
    password: string;
    mobile: number;
    email: string;
    companyName: string;
    attention: string;
    // 账号类型 1:平台用户，2.关联人用户
    identityType: IdentifyTypeEnum;
    // 用途说明
    remark: string;
    status: UserStatusEnum;
    createDate: string;
    loginDate: string;
    imageUrl: string;
    loginIp: string;
    roleId: number;
    roleNm: string;
    appId: string;
    apps: IApp[];
}
export type IUserList = IUser[];

export interface IUserPaginationResp {
    status: number;
    msg: string;
    total: number;
    pages: number;
    success: boolean;
    data: IUserList;
  }