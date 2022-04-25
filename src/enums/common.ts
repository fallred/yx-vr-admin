
import {PageFuncEnum} from '@/models/common';
import {UserStatusEnum} from '@/models/user.interface';
import {ShopStoreStatusEnum} from '@/models/shop-store.interface';

export const PageFuncMap = new Map([
    [PageFuncEnum.LIST, '查询'],
    [PageFuncEnum.ADD, '新增'],
    [PageFuncEnum.EDIT, '修改'],
    [PageFuncEnum.DELETE, '删除'],
]);

export const UserStatusMap = new Map([
    [UserStatusEnum.NORMAL, '正常'],
    [UserStatusEnum.FREEZE, '冻结'],
    [UserStatusEnum.DISABLED, '禁用'],
]);

export const UserStatusMap = new Map([
    [UserStatusEnum.NORMAL, '正常'],
    [UserStatusEnum.FREEZE, '冻结'],
    [UserStatusEnum.DISABLED, '禁用'],
]);

export const ShopStoreStatusMap = new Map([
    [ShopStoreStatusEnum.NORMAL, '正常'],
    [ShopStoreStatusEnum.DISABLED, '禁用'],
]);