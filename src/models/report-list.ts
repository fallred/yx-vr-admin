export enum ReportTypeEnum {
    'SUMMARY' = '0',
    'GOOD_COMMENT' = '1',
    'MEMBER_CONVERT' = '2'
}

export interface IReport {
    id: string;
};
export type IReportList = IReport[];

export type IReportPayload = {
    appIds: string;
    stm: string;
    etm: string;
}
// 查询业绩数据
export interface IPerformance {
    mtConsumeAmount: number;
    mtConsumeAmountRate: number;
    mtTradeAmount: number;
    mtTradeAmountRate: number;
    tkConsumeAmount: number;
    tkConsumeAmountRate: number;
    kbConsumeAmount: number;
    kbConsumeAmountRate: number;
    total: number;
    totalRate: number;
    holiday: number;
    holidayProp: number;
    taskAmount: number;
    taskAmountProp: number;
};
export type IIPerformanceList = IPerformance[];
// export enum MemberEnum {
//     'memberNum' = 'memberNum',
// }
// 查询会员数据
export interface IMember {
    memberNum: number;
    memberNumRate: number;
    memberConv:number;
    memberConvRate: number;
    consumeNum: number;
    consumeNumRate: number;
    consumeAmount: number;
    consumeAmountRate: number;
    rechargeAmount: number;
    rechargeAmountRate: number;
    rechargeAmountProp: number;
    rechargeAmountPropRate: number;
};

// 查询评价数据
export interface IEvaluate {
    weekEvalNum: number;
    evalTotal: number;
    evalTotalRate: number;
    popleNum: number;
    popleNumRate: number;
    goodTotal: number;
    goodNumRate: number;
    badTotal: number;
    badNumRate: number;
    goodProp: number;
    goodPropRate: number;
    featureNum: number;
    featureRate: number;
};

// 查询转化数据
export interface IConvert {
    exposureNum: number;
    exposureNumRate: number;
    visitorNum: number;
    visitorNumRate: number;
    visitorConv: number;
    visitorConvRate: number;
    orderNum: number;
    orderNumRate: number;
    orderNumConv: number;
    orderNumConvRate: number;
    storeNum: number;
    storeNumRate: number;
}
