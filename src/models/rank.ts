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

export interface IRank1 {
    appId: string;
    store: string;
    city: string;
    rank: number;
    rankValue: number;
    manager: string;
    imageUrl: string;
}

export type IRankList = IRank[];

export interface IRankPaginationResp {
    status: number;
    msg: string;
    total: number;
    pages: number;
    success: boolean;
    data: IRankList;
}