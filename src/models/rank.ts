export enum RankTypeEnum {
    'SUMMARY' = '1',
    'GOOD_COMMENT' = '2',
    'MEMBER_CONVERT' = '3'
}


export interface IRank {
    id: string;
    rankNum: number;
    cityName: string;
    shopName: string;
    shoperManagerName: string;
    shoperManagerAvatar: string;
};

export type IRankList = IRank[];

export interface IRankPaginationResp {
    status: number;
    msg: string;
    total: number;
    pages: number;
    success: boolean;
    data: IRankList;
}