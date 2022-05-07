export enum RankTypeEnum {
    'SUMMARY' = '0',
    'GOOD_COMMENT' = '1',
    'MEMBER_CONVERT' = '2'
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