import { IMenuTree } from "@/models/menu.interface";
import { IUser, IUserList, IUserPaginationResp } from "@/models/user.interface";
import { IShopStore, IShopStorePaginationResp } from "@/models/shop-store.interface";
import { LoginParams, LoginResult } from "@/models/login";
import { IUpdatePassParams, IUpdatePassResult } from "@/models/setting";
import { CurrentUserResult } from "@/models/user";
import { useBatch, useCreate, useCreateByQuery, useGetList, useGetOne, useUpdate } from "./request";

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
        "RolesList",
        '/manage/role/query',
        pagination,
        filters
    );
}
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
export const useGetShopStoreList = (pagination: any, filters: any) => {
    return useGetList<IShopStorePaginationResp>(
        "StoreList",
        '/app/store/query',
        pagination,
        filters
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

// export const useGetProjects = (pagination: any, filters: any) => {
//     return useGetList<API.ProjectPagination>(
//         "Projects",
//         projectResource,
//         pagination,
//         filters
//     );
// }
// export const useAddProject = () => {
//     return useCreate<API.Project, API.Project>(projectResource);
// }

// export const useUpdateProject = () => {
//     return useUpdate<API.Project>(projectResource);
// }

// export const useBatchDeleteProject = () => {
//     return useBatch(projectResource + ':batchDelete');
// }
