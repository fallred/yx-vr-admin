export enum ShopStoreStatusEnum {
    'NORMAL' = 1,
    'DISABLED' = 2
}
type IProvinceCityDistrict = {
    "province": string;
    // 市
    "city": string;
    // 区
    "district": string;
};
export interface IShopStore {
    // 门店编号
    "appId": string;
    // 门店名称
    "nm": string;
    // 省
    "province": string;
    // 市
    "city": string;
    // 区
    "district": string;
    // 详细地址
    "address": string;
    // 加盟商
    "franchisee": string;
    // 店长
    "manager": string;
    // 状态
    "status": AppStatusEnum;
    // 门店评级
    "grade": number;
    // 合伙人
    "partner": string;
    // 签约时间
    "tm": string;
    // 门店编码
    "code": string;
    provinceCityDistrict: IProvinceCityDistrict;
}

export type IShopStoreList = IShopStore[];

export interface IShopStorePaginationResp {
    status: number;
    msg: string;
    total: number;
    pages: number;
    success: boolean;
    data: IShopStoreList;
};

export interface IImportStorePayload {
};
export interface IImportStoreResp {
    status: number;
    msg: string;
    total: number;
    pages: number;
    success: boolean;
    data: boolean;
};

export interface IExportStorePayload {
    keyword: string;
};
export interface IExportStoreResp {
    status: number;
    msg: string;
    total: number;
    pages: number;
    success: boolean;
    data: boolean;
};