export interface INotice {
    // 发布人
    author: string;
    // 公告内容
    content: string;
    // 公告编号
    id: number;
    // 公告标题
    title: string;
    // 发布时间
    tm: string;
}

export type INoticeList = INotice[];
export interface INoticePaginationResp {
    status: number;
    msg: string;
    total: number;
    pages: number;
    success: boolean;
    data: INoticeList;
}