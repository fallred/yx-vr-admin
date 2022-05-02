import { IMenuTree } from "@/models/menu.interface";
import { IUser, IUserList, IUserPaginationResp } from "@/models/user.interface";
import { ILog, ILogList, ILogPaginationResp } from "@/models/log.interface";
import { INotice, INoticeList, INoticePaginationResp } from "@/models/notice-mng";
import { IShopStore, IShopStoreList, IShopStorePaginationResp } from "@/models/shop-store.interface";
import { IOption, IProvince, ICity, IArea } from "@/models/common";
import { LoginParams, LoginResult } from "@/models/login";
import { IUpdatePassParams, IUpdatePassResult } from "@/models/setting";
import { CurrentUserResult } from "@/models/user";
import { useBatch, useCreate, useCreateByQuery, useGetList, useGetOne, useUpdate, useQueryGet } from "./request";

const projectResource = '/projects';

// 登陆
export const useLogin = () => {
    return useCreate<LoginParams, LoginResult>("/login");
}
export const useUpdatePass = () => {
    return useCreate<IUpdatePassParams, IUpdatePassResult>("/auth/upatepwd");
}

export const useGetSystemMenuTree = () => {
    return useGetOne<IMenuTree>(
        "systemMenuTree",
        "/manage/menu/list"
      );
};

export const useGetUserMenuTree = () => {
    return useGetOne<IMenuTree>(
        "userMenuTree",
        "/manage/user/menu"
      );
};

// 角色
export const useGetRoleList = (pagination: any, filters: any) => {
    return useGetList<API.IRolePaginationResp>(
        "RolesListPage",
        '/manage/role/query',
        pagination,
        filters
    );
}
export const useGetRoleListAll = () => {
    return useGetOne<API.IRoleList>(
        "RoleListAll",
        "/manage/role/list",
    );
};
export const useAddRole = () => {
    return useCreate<API.IRole, API.IRole>('/manage/role/create');
}

export const useUpdateRole = () => {
    return useCreate<API.IRole>('/manage/role/edit');
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
        "/manage/user/query/one"
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
    );
}
export const useQueryShopStoreDetail = () => {
    return useGetOne<IShopStore>(
        "storeDetail",
        "/app/store/detial"
    );
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
        "/app/log/detial"
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
        "/app/area/province"
    );
};
export const useGetCityList = () => {
    return useQueryGet<IPCRParams, ICity[]>('/app/area/city');
};
export const useGetAreaList = () => {
    return useQueryGet<IPCRParams, IArea[]>('/app/area/area');
};
// export const useGetCurrentUser = () => {
//     return useGetOne<CurrentUserResult>(
//         "CurrentUser",
//         "/current/user"
//       );
// }

// export const useGetCurrentMenus = () => {
//     return useGetList<IMenuTree>("CurrentMenuList",
//         "/current/menu"
//     );
// }

export const useGetProjects = (pagination: any, filters: any) => {
    return useGetList<API.ProjectPagination>(
        "Projects",
        projectResource,
        pagination,
        filters
    );
}
export const useAddProject = () => {
    return useCreate<API.Project, API.Project>(projectResource);
}

export const useUpdateProject = () => {
    return useUpdate<API.Project>(projectResource);
}

export const useBatchDeleteProject = () => {
    return useBatch(projectResource + ':batchDelete');
}
