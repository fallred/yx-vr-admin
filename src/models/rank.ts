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