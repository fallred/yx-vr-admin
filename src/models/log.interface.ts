export interface ILog {
    id: number;
    username: string;
    operation: string;
    method: string;
    params: string;
    ip: string;
    createDate: string;
};
export type ILogList = ILog[];
export interface ILogPaginationResp {
    status: number;
    msg: string;
    total: number;
    pages: number;
    success: boolean;
    data: ILogList;
}