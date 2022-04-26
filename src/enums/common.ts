
import {PageFuncEnum, SexEnum} from '@/models/common';
import {UserStatusEnum, IdentifyTypeEnum} from '@/models/user.interface';
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

export const ShopStoreStatusMap = new Map([
    [ShopStoreStatusEnum.NORMAL, '正常'],
    [ShopStoreStatusEnum.DISABLED, '禁用'],
]);

export const SexMap = new Map([
    [SexEnum.FEMALE, '女'],
    [SexEnum.MALE, '男'],
]);
export const IdentifyTypeMap = new Map([
    [IdentifyTypeEnum.PLATFORM, '平台用户'],
    [IdentifyTypeEnum.RELATION, '关联人用户'],
]);

export const SexOptions = [
    {
        label: SexMap.get(SexEnum.FEMALE),
        value: SexEnum.FEMALE,
    },
    {
        label: SexMap.get(SexEnum.MALE),
        value: SexEnum.MALE,
    },
];
export const IdentifyOptions = [
    {
        label: IdentifyTypeMap.get(IdentifyTypeEnum.PLATFORM),
        value: IdentifyTypeEnum.PLATFORM,
    },
    {
        label: IdentifyTypeMap.get(IdentifyTypeEnum.RELATION),
        value: IdentifyTypeEnum.RELATION,
    },
];
export const UserStatusOptions = [
    {
        label: UserStatusMap.get(UserStatusEnum.NORMAL),
        value: UserStatusEnum.NORMAL,
    },
    {
        label: UserStatusMap.get(UserStatusEnum.DISABLED),
        value: UserStatusEnum.DISABLED,
    },
    {
        label: UserStatusMap.get(UserStatusEnum.FREEZE),
        value: UserStatusEnum.FREEZE,
    },
];

export const ShopStoreStatusOptions = [
    {
        label: ShopStoreStatusMap.get(ShopStoreStatusEnum.NORMAL),
        value: ShopStoreStatusEnum.NORMAL,
    },
    {
        label: ShopStoreStatusMap.get(ShopStoreStatusEnum.DISABLED),
        value: ShopStoreStatusEnum.DISABLED,
    },
];