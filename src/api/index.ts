import { IMenuTree } from "@/models/menu.interface";
import { LoginParams, LoginResult } from "@/models/login";
import { IUpdatePassParams, IUpdatePassResult } from "@/models/setting";
import { CurrentUserResult } from "@/models/user";
import { useBatch, useCreate, useCreateByQuery, useGetList, useGetOne, useUpdate } from "./request";

const projectResource = '/projects';

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


export const useGetCurrentUser = () => {
    return useGetOne<CurrentUserResult>(
        "CurrentUser",
        "/current/user"
      );
}

export const useGetCurrentMenus = () => {
    return useGetList<IMenuTree>("CurrentMenuList",
        "/current/menu"
    );
}

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
