
import {PageFuncEnum, SexEnum} from '@/models/common';
import {UserStatusEnum, IdentifyTypeEnum} from '@/models/user-mng';
import {ShopStoreStatusEnum} from '@/models/shop-store';
import {RankTypeEnum} from '@/models/rank';

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

export const RankTypeMap = new Map([
    [RankTypeEnum.SUMMARY, '营业额总榜'],
    [RankTypeEnum.GOOD_COMMENT, '好评能力榜'],
    [RankTypeEnum.MEMBER_CONVERT, '会员转化能力榜'],
]);

export const RankTypeOptions = [
    {
        tab: RankTypeMap.get(RankTypeEnum.SUMMARY),
        key: RankTypeEnum.SUMMARY,
    },
    {
        tab: RankTypeMap.get(RankTypeEnum.GOOD_COMMENT),
        key: RankTypeEnum.GOOD_COMMENT,
    },
    {
        tab: RankTypeMap.get(RankTypeEnum.MEMBER_CONVERT),
        key: RankTypeEnum.MEMBER_CONVERT,
    },
];
