import { IMenuTree } from "@/models/menu";
import { IUser, IUserList, IUserPaginationResp } from "@/models/user-mng";
import { ILog, ILogList, ILogPaginationResp } from "@/models/log";
import { IRole, IRoleList, IRolePaginationResp } from "@/models/role";
import { INotice, INoticeList, INoticePaginationResp } from "@/models/notice-mng";
import {
    IShopStore,
    IShopStoreList,
    IShopStorePaginationResp,
    IImportStorePayload,
    IExportStorePayload,
    IExportStoreResp
} from "@/models/shop-store";
import {IShopTaskList, IShopTask} from '@/models/shop-task';
import { IOption, IProvince, ICity, IArea } from "@/models/common";
import { LoginParams, LoginResult } from "@/models/login";
import { IUpdatePassParams, IUpdatePassResult } from "@/models/setting";
import { CurrentUserResult, IGetUserMenuPayload } from "@/models/user";
import { IRankPaginationResp } from "@/models/rank";
import {
    IReport, IReportList, IReportPayload,
    IConvert, IEvaluate, IPerformance, IMember,
} from "@/models/report-list";
import { useBatch, useCreate, useCreateByQuery, useGetList, useGetOne, useUpdate, useQueryGet } from "./request";

const projectResource = '/projects';

type IRequestConfig = {
    completeRes: boolean;
};

// 登陆
export const useLogin = () => {
    return useCreate<LoginParams, LoginResult>("/auth/loginWithAccount", {completeRes: false});
}
export const useUpdatePass = () => {
    return useCreate<IUpdatePassParams, IUpdatePassResult>("/auth/upatepwd");
}

export const useGetSystemMenuTree = () => {
    return useGetOne<IMenuTree>(
        "systemMenuTree",
        "/manage/menu/list",
        null,
        {completeRes: false}
      );
};

export const useGetUserMenuTree = (payload?: IGetUserMenuPayload = {}) => {
    const userName = localStorage.getItem('userName');
    const params = {username: userName, ...payload};
    return useGetOne<IMenuTree>(
        "userMenuTree",
        "/manage/user/menu",
        params,
        {completeRes: false}
      );
};

// 角色
export const useGetRoleList = (pagination: any, filters: any) => {
    return useGetList<IRolePaginationResp>(
        "RolesListPage",
        '/manage/role/query',
        pagination,
        filters
    );
}
export const useGetRoleListAll = () => {
    return useGetOne<IRoleList>(
        "RoleListAll",
        "/manage/role/list",
        null,
        {completeRes: false}
    );
};
export const useAddRole = () => {
    return useCreate<IRole, IRole>('/manage/role/create');
}

export const useUpdateRole = () => {
    return useCreate<IRole>('/manage/role/edit');
}

export const useBatchDeleteRole = () => {
    return useCreateByQuery('/manage/role/delete');
}

// 用户管理
export const useGetUserList = (pagination: any, filters: any) => {
    return useGetList<IUserPaginationResp>(
        "UserList",
        '/manage/user/query',
        pagination,
        filters
    );
}
export const useQueryUserDetail = () => {
    return useGetOne<IUser>(
        "userDetail",
        "/manage/user/query/one",
        null,
        {completeRes: true}
    );
}
export const useAddUser = () => {
    return useCreate<IUser, IUser>('/manage/user/create');
}
export const useUpdateUser = () => {
    return useCreate<IUser>('/manage/user/edit');
}
export const useBatchDeleteUser = () => {
    return useCreateByQuery('/manage/user/delete');
}
export const useSetUserApps = () => {
    return useCreateByQuery('/manage/user/app');
}


// 门店管理
export const useGetShopStoreListWithPage = (pagination: any, filters: any) => {
    return useGetList<IShopStorePaginationResp>(
        "StoreList",
        '/app/store/query',
        pagination,
        filters
    );
}
export const useGetShopStoreList = () => {
    return useGetOne<IShopStoreList>(
        "StoreListAll",
        "/app/store/list",
        null,
        {completeRes: false}
    );
    // return useQueryGet<{keyword: string}, IShopStoreList>('/app/store/list');
}
export const useQueryShopStoreDetail = () => {
    return useQueryGet<{id: string}, IShopStore>('/app/store/detial');
}
export const useAddShopStore = () => {
    return useCreate<IShopStore, IShopStore>('/manage/store/create');
}

export const useUpdateShopStore = () => {
    return useCreate<IShopStore>('/manage/store/edit');
}
export const useBatchDeleteShopStore = () => {
    return useCreateByQuery('/manage/store/delete');
}

// 日志管理
export const useGetLogList = (pagination: any, filters: any) => {
    return useGetList<ILogPaginationResp>(
        "LogList",
        '/app/log/query',
        pagination,
        filters
    );
}
export const useQueryLogDetail = () => {
    return useGetOne<ILog>(
        "logDetail",
        "/app/log/detial",
        null,
        {completeRes: true}
    );
}

// 公告管理
export const useQueryNoticeList = (pagination: any, filters: any) => {
    return useGetList<INoticePaginationResp>(
        "NoticeList",
        '/app/notice/query',
        pagination,
        filters
    );
}
export const useQueryNoticeAll = () => {
    return useQueryGet<any, INoticePaginationResp>('/app/notice/query');
}
export const useAddNotice = () => {
    return useCreate<INotice, INotice>('/app/notice/create');
}

export const useUpdateNotice = () => {
    return useCreate<INotice>('/app/notice/edit');
}

export const useBatchDeleteNotice = () => {
    return useCreateByQuery('/app/notice/delete');
}

// 省市区
export const useGetProvinceList = () => {
    return useGetOne<IProvince[]>(
        "provinceList",
        "/app/area/province",
        null,
        {completeRes: false}
    );
};
export const useGetCityList = () => {
    return useQueryGet<IPCRParams, ICity[]>('/app/area/city');
};
export const useGetAreaList = () => {
    return useQueryGet<IPCRParams, IArea[]>('/app/area/area');
};

// 查询营业额总榜
export const useGetRankList = (type: string, config?: IRequestConfig) => {
    let url = '';
    if (type == 1) {
        url = '/app/leaderboard/turnover/list';
    }
    else if (type == 2) {
        url = '/app/leaderboard/praise/list';
    }
    else if (type == 3 ) {
        url = '/app/leaderboard/memberconversion/list';
    }
    return useQueryGet<any, IRankPaginationResp>(url, config);
}

// 经营管理-报表-转化数据
export const useGetConvertList = () => {
    return useQueryGet<IReportPayload, IConvert[]>('/app/business/convert/list', {completeRes: false});
}
// 经营管理-报表-评价数据
export const useGetEvaluateList = () => {
    return useQueryGet<IReportPayload, IEvaluate[]>('/app/business/evaluate/list', {completeRes: false});
}
// 经营管理-报表-会员数据
export const useGetMemberList = () => {
    return useQueryGet<IReportPayload, IMember[]>('/app/business/member/list', {completeRes: false});
}
// 经营管理-报表-会员数据
export const useGetPerformanceList = () => {
    return useQueryGet<IReportPayload, IPerformance[]>('/app/business/performance/list', {completeRes: false});
}

// 获取导入模版地址
export const useGetStoreImportTplLink = () => {
    return useQueryGet<IImportStorePayload, string>('/app/store/template', {completeRes: false});
};

// 导入门店excel
export const useImportStoreList = () => {
    return useCreate<IImportStorePayload, IImportStoreResp>('/app/store/import');
};

// 导出门店excel
export const useExportStoreList = () => {
    return useQueryGet<IExportStorePayload, IExportStoreResp>('/app/store/export');
};


// 门店月度任务
export const useGetShopTaskList = (pagination: any, filters: any) => {
    return useGetList<IShopTaskList>(
        "ShopTaskListPage",
        '/app/store/task/list',
        pagination,
        filters
    );
}
export const useAddShopTask = () => {
    return useCreate<IShopTask, IShopTask>('/app/store/task/create');
}

export const useUpdateShopTask = () => {
    return useCreate<IShopTask>('/app/store/task/edit');
}

export const useBatchDeleteShopTask = () => {
    return useCreateByQuery('/app/store/delete');
}

