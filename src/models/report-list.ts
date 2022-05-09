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
    appId: string;
}