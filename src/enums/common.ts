
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

// 业绩数据
export const PerformanceMap = new Map([
    ['holiday', '节假日销售金额'],
    ['holidayProp', '节假日销售金额-环比'],
    ['kbConsumeAmount', '口碑验券金额'],
    ['kbConsumeAmountRate', '口碑验券金额-环比'],
    ['mtConsumeAmount', '美团验券金额'],
    ['mtConsumeAmountRate', '美团验券金额-环比'],
    ['mtTradeAmount', '美团收单金额'],
    ['mtTradeAmountRate', '美团收单金额-环比'],
    ['taskAmount', '本周任务'],
    ['taskAmountProp', '本周完成率'],
    ['tkConsumeAmount', '抖音验券金额'],
    ['tkConsumeAmountRate', '抖音验券金额-环比'],
    ['total', '销售金额'],
    ['totalRate', '销售金额-环比'],
   
   
]);

export const PerformanceConfigList = [
    {
        key: 'holiday',
        name: '节假日销售金额',
        valueKey: 'holiday',
        rateKey: 'holidayProp',
        value: '',
        rate: ''
    },
    {
        key: 'kbConsumeAmount',
        name: '口碑验券金额',
        valueKey: 'kbConsumeAmount',
        rateKey: 'kbConsumeAmountRate',
        value: '',
        rate: ''
    },
    {
        key: 'mtConsumeAmount',
        name: '美团验券金额',
        valueKey: 'mtConsumeAmount',
        rateKey: 'mtConsumeAmountRate',
        value: '',
        rate: ''
    },
    {
        key: 'mtTradeAmount',
        name: '美团收单金额',
        valueKey: 'mtTradeAmount',
        rateKey: 'mtTradeAmountRate',
        value: '',
        rate: ''
    },
    {
        key: 'taskAmount',
        name: '本周任务',
        valueKey: 'taskAmount',
        rateKey: 'taskAmountProp',
        value: '',
        rate: ''
    },
    {
        key: 'tkConsumeAmount',
        name: '抖音验券金额',
        valueKey: 'tkConsumeAmount',
        rateKey: 'tkConsumeAmountRate',
        value: '',
        rate: ''
    },
    {
        key: 'total',
        name: '销售金额',
        valueKey: 'total',
        rateKey: 'totalRate',
        value: '',
        rate: ''
    },
];

// 会员数据
export const MemberMap = new Map([
    ['consumeAmount', '会员消费金额'],
    ['consumeAmountRate', '会员消费金额-环比'],
    ['memberNum', '新增会员数'],
    ['memberNumRate', '新增会员数-环比'],
    ['memberConv', '会员人数转化率'],
    ['memberConvRate', '会员人数转化率-环比'],
    ['consumeNum', '会员消费人数'],
    ['consumeNumRate', '会员消费人数-环比'],
    ['rechargeAmount', '会员业绩'],
    ['rechargeAmountRate', '会员业绩-环比'],
    ['rechargeAmountProp', '会员业绩占比'],
    ['rechargeAmountPropRate', '会员业绩占比-环比'],
]);
export const MemberConfigList = [
    {
        key: 'consumeAmount',
        valueKey: 'consumeAmount',
        rateKey: 'consumeAmountRate',
        name: '会员消费金额',
        value: '',
        rate: ''
    },
    {
        key: 'memberNum',
        valueKey: 'memberNum',
        rateKey: 'memberNumRate',
        name: '新增会员数',
        value: '',
        rate: ''
    },
    {
        key: 'memberConv',
        valueKey: 'memberConv',
        rateKey: 'memberConvRate',
        name: '会员人数转化率',
        value: '',
        rate: ''
    },
    {
        key: 'consumeNum',
        valueKey: 'consumeNum',
        rateKey: 'consumeNumRate',
        name: '会员消费人数',
        value: '',
        rate: ''
    },
    {
        key: 'rechargeAmount',
        valueKey: 'rechargeAmount',
        rateKey: 'rechargeAmountRate',
        name: '会员业绩',
        value: '',
        rate: ''
    },
    {
        key: 'rechargeAmountProp',
        valueKey: 'rechargeAmountProp',
        rateKey: 'rechargeAmountPropRate',
        name: '会员业绩占比',
        value: '',
        rate: ''
    },
];
// 评价数据
export const EvaluateMap = new Map([
    ['badTotal', '差评总数'],
    ['badNumRate', '差评总数-环比'],
    ['evalTotal', '评价数'],
    ['evalTotalRate', '评价数-环比'],
    ['featureNum', '精选数'],
    ['featureRate', '精选数-环比'],
    ['goodTotal', '好评总数'],
    ['goodNumRate', '好评总数-环比'],
    ['goodProp', '好评率'],
    ['goodPropRate', '好评率-环比'],
    ['popleNum', '来客数'],
    ['popleNumRate', '来客数-环比'],
    ['weekEvalNum', '周评价数据'], 
]);
export const EvaluateConfigList = [
    {
        key: 'badTotal',
        valueKey: 'badTotal',
        rateKey: 'badNumRate',
        name: '差评总数',
        value: '',
        rate: ''
    },
    {
        key: 'evalTotal',
        valueKey: 'evalTotal',
        rateKey: 'evalTotalRate',
        name: '评价数',
        value: '',
        rate: ''
    },
    {
        key: 'featureNum',
        valueKey: 'featureNum',
        rateKey: 'featureRate',
        name: '精选数',
        value: '',
        rate: ''
    },
    {
        key: 'goodTotal',
        valueKey: 'goodTotal',
        rateKey: 'goodNumRate',
        name: '好评总数',
        value: '',
        rate: ''
    },
    {
        key: 'goodProp',
        valueKey: 'goodProp',
        rateKey: 'goodPropRate',
        name: '好评率',
        value: '',
        rate: ''
    },
    {
        key: 'popleNum',
        valueKey: 'popleNum',
        rateKey: 'popleNumRate',
        name: '来客数',
        value: '',
        rate: ''
    },
];

// 转化数据
export const ConvertMap = new Map([
    ['exposureNum', '曝光人数'],
    ['exposureNumRate', '曝光人数-环比'],

    ['orderNum', '下单人数'],
    ['orderNumRate', '下单人数-环比'],

    ['orderNumConv', '下单转化率'],
    ['orderNumConvRate', '下单转化率-环比'],

    ['storeNum', '到店人数'],
    ['storeNumRate', '到店人数-环比'],
    ['visitorConv', '访客转化率'],
    ['visitorConvRate', '访客转化率-环比'],

    ['visitorNum', '访客人数'],
    ['visitorNumRate', '访客人数-环比'],
]);
export const ConvertConfigList = [
    {
        key: 'exposureNum',
        valueKey: 'exposureNum',
        rateKey: 'exposureNumRate',
        name: '曝光人数',
        value: '',
        rate: ''
    },
    {
        key: 'orderNum',
        valueKey: 'orderNum',
        rateKey: 'orderNumRate',
        name: '下单人数',
        value: '',
        rate: ''
    },
    {
        key: 'orderNumConv',
        valueKey: 'orderNumConv',
        rateKey: 'orderNumConvRate',
        name: '下单转化率',
        value: '',
        rate: ''
    },
    {
        key: 'storeNum',
        valueKey: 'storeNum',
        rateKey: 'storeNumRate',
        name: '到店人数',
        value: '',
        rate: ''
    },
    {
        key: 'visitorConv',
        valueKey: 'visitorConv',
        rateKey: 'visitorConvRate',
        name: '访客转化率',
        value: '',
        rate: ''
    },
    {
        key: 'visitorNum',
        valueKey: 'visitorNum',
        rateKey: 'visitorNumRate',
        name: '访客人数',
        value: '',
        rate: ''
    },
];

