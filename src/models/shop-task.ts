export interface IShopTask {
    appId: string;
    id: number;
    taskAmount: number;
    tm:  string;
}
export interface IShopTaskPaginationResp {
    status: number;
    msg: string;
    total: number;
    pages: number;
    success: boolean;
    data: IShopTask[];
}

export type IShopTaskList = IShopTask[];
