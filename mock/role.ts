import { MockMethod } from 'vite-plugin-mock';

const roleInfo = {
    "status": 200,
    "msg": "角色信息查询成功",
    "total": 2,
    "pages": 1,
    "success": true,
    "data": [
        {
            "id": 1,
            "name": "超级管理员",
            "code": "super_admin",
            "comment": "超级管理员可以使用所有功能权限",
            "deleted": 0,
            "powerSelected": "[{\"menuId\":16,\"menuName\":\"平台管理\",\"menuType\":\"label\",\"pid\":0,\"sort\":16,\"visible\":1,\"url\":null,\"target\":\"_single\",\"mustLogin\":true,\"children\":[{\"menuId\":17,\"menuName\":\"用户管理\",\"menuType\":\"component\",\"pid\":16,\"sort\":17,\"visible\":1,\"url\":\"/visionExperience/internet_platform/platform_management/user_manage\",\"target\":\"_single\",\"mustLogin\":true,\"children\":[{\"id\":27,\"mid\":17,\"code\":\"user_info:list\",\"name\":null,\"desc\":null,\"url\":\"/api/userinfo/list\",\"menuName\":\"查询\",\"selected\":true},{\"id\":28,\"mid\":17,\"code\":\"user_info:edit\",\"name\":null,\"desc\":null,\"url\":\"/api/userinfo/edit\",\"menuName\":\"编辑\",\"selected\":true},{\"id\":29,\"mid\":17,\"code\":\"user_info:delete\",\"name\":null,\"desc\":null,\"url\":\"/api/userinfo/delete\",\"menuName\":\"删除\",\"selected\":true}],\"permission\":[{\"id\":27,\"mid\":17,\"code\":\"user_info:list\",\"name\":null,\"desc\":null,\"url\":\"/api/userinfo/list\",\"menuName\":\"查询\",\"selected\":true},{\"id\":28,\"mid\":17,\"code\":\"user_info:edit\",\"name\":null,\"desc\":null,\"url\":\"/api/userinfo/edit\",\"menuName\":\"编辑\",\"selected\":true},{\"id\":29,\"mid\":17,\"code\":\"user_info:delete\",\"name\":null,\"desc\":null,\"url\":\"/api/userinfo/delete\",\"menuName\":\"删除\",\"selected\":true}]},{\"menuId\":18,\"menuName\":\"角色管理\",\"menuType\":\"component\",\"pid\":16,\"sort\":18,\"visible\":1,\"url\":\"/visionExperience/internet_platform/platform_management/role_manage\",\"target\":\"_single\",\"mustLogin\":true,\"children\":[{\"id\":30,\"mid\":18,\"code\":\"role_info:list\",\"name\":null,\"desc\":null,\"url\":\"/api/userrole/list\",\"menuName\":\"查询\",\"selected\":true},{\"id\":31,\"mid\":18,\"code\":\"role_info:edit\",\"name\":null,\"desc\":null,\"url\":\"/api/userrole/edit\",\"menuName\":\"编辑\",\"selected\":true},{\"id\":32,\"mid\":18,\"code\":\"role_info:delete\",\"name\":null,\"desc\":null,\"url\":\"/api/userrole/delete\",\"menuName\":\"删除\",\"selected\":true}],\"permission\":[{\"id\":30,\"mid\":18,\"code\":\"role_info:list\",\"name\":null,\"desc\":null,\"url\":\"/api/userrole/list\",\"menuName\":\"查询\",\"selected\":true},{\"id\":31,\"mid\":18,\"code\":\"role_info:edit\",\"name\":null,\"desc\":null,\"url\":\"/api/userrole/edit\",\"menuName\":\"编辑\",\"selected\":true},{\"id\":32,\"mid\":18,\"code\":\"role_info:delete\",\"name\":null,\"desc\":null,\"url\":\"/api/userrole/delete\",\"menuName\":\"删除\",\"selected\":true}]}],\"permission\":[]},{\"menuId\":17,\"menuName\":\"用户管理\",\"menuType\":\"component\",\"pid\":16,\"sort\":17,\"visible\":1,\"url\":\"/visionExperience/internet_platform/platform_management/user_manage\",\"target\":\"_single\",\"mustLogin\":true,\"children\":[{\"id\":27,\"mid\":17,\"code\":\"user_info:list\",\"name\":null,\"desc\":null,\"url\":\"/api/userinfo/list\",\"menuName\":\"查询\",\"selected\":true},{\"id\":28,\"mid\":17,\"code\":\"user_info:edit\",\"name\":null,\"desc\":null,\"url\":\"/api/userinfo/edit\",\"menuName\":\"编辑\",\"selected\":true},{\"id\":29,\"mid\":17,\"code\":\"user_info:delete\",\"name\":null,\"desc\":null,\"url\":\"/api/userinfo/delete\",\"menuName\":\"删除\",\"selected\":true}],\"permission\":[{\"id\":27,\"mid\":17,\"code\":\"user_info:list\",\"name\":null,\"desc\":null,\"url\":\"/api/userinfo/list\",\"menuName\":\"查询\",\"selected\":true},{\"id\":28,\"mid\":17,\"code\":\"user_info:edit\",\"name\":null,\"desc\":null,\"url\":\"/api/userinfo/edit\",\"menuName\":\"编辑\",\"selected\":true},{\"id\":29,\"mid\":17,\"code\":\"user_info:delete\",\"name\":null,\"desc\":null,\"url\":\"/api/userinfo/delete\",\"menuName\":\"删除\",\"selected\":true}]},{\"id\":27,\"mid\":17,\"code\":\"user_info:list\",\"name\":null,\"desc\":null,\"url\":\"/api/userinfo/list\",\"menuName\":\"查询\",\"selected\":true},{\"id\":28,\"mid\":17,\"code\":\"user_info:edit\",\"name\":null,\"desc\":null,\"url\":\"/api/userinfo/edit\",\"menuName\":\"编辑\",\"selected\":true},{\"id\":29,\"mid\":17,\"code\":\"user_info:delete\",\"name\":null,\"desc\":null,\"url\":\"/api/userinfo/delete\",\"menuName\":\"删除\",\"selected\":true},{\"menuId\":18,\"menuName\":\"角色管理\",\"menuType\":\"component\",\"pid\":16,\"sort\":18,\"visible\":1,\"url\":\"/visionExperience/internet_platform/platform_management/role_manage\",\"target\":\"_single\",\"mustLogin\":true,\"children\":[{\"id\":30,\"mid\":18,\"code\":\"role_info:list\",\"name\":null,\"desc\":null,\"url\":\"/api/userrole/list\",\"menuName\":\"查询\",\"selected\":true},{\"id\":31,\"mid\":18,\"code\":\"role_info:edit\",\"name\":null,\"desc\":null,\"url\":\"/api/userrole/edit\",\"menuName\":\"编辑\",\"selected\":true},{\"id\":32,\"mid\":18,\"code\":\"role_info:delete\",\"name\":null,\"desc\":null,\"url\":\"/api/userrole/delete\",\"menuName\":\"删除\",\"selected\":true}],\"permission\":[{\"id\":30,\"mid\":18,\"code\":\"role_info:list\",\"name\":null,\"desc\":null,\"url\":\"/api/userrole/list\",\"menuName\":\"查询\",\"selected\":true},{\"id\":31,\"mid\":18,\"code\":\"role_info:edit\",\"name\":null,\"desc\":null,\"url\":\"/api/userrole/edit\",\"menuName\":\"编辑\",\"selected\":true},{\"id\":32,\"mid\":18,\"code\":\"role_info:delete\",\"name\":null,\"desc\":null,\"url\":\"/api/userrole/delete\",\"menuName\":\"删除\",\"selected\":true}]},{\"id\":30,\"mid\":18,\"code\":\"role_info:list\",\"name\":null,\"desc\":null,\"url\":\"/api/userrole/list\",\"menuName\":\"查询\",\"selected\":true},{\"id\":31,\"mid\":18,\"code\":\"role_info:edit\",\"name\":null,\"desc\":null,\"url\":\"/api/userrole/edit\",\"menuName\":\"编辑\",\"selected\":true},{\"id\":32,\"mid\":18,\"code\":\"role_info:delete\",\"name\":null,\"desc\":null,\"url\":\"/api/userrole/delete\",\"menuName\":\"删除\",\"selected\":true}]",
            "menus": null
        },
        {
            "id": 25,
            "name": "普通角色",
            "code": "0",
            "comment": "对外用户注册使用",
            "deleted": 0,
            "powerSelected": "[{\"menuId\":16,\"menuName\":\"平台管理\",\"menuType\":\"label\",\"pid\":0,\"sort\":16,\"visible\":1,\"url\":null,\"target\":\"_single\",\"mustLogin\":true,\"children\":[{\"menuId\":17,\"menuName\":\"用户管理\",\"menuType\":\"component\",\"pid\":16,\"sort\":17,\"visible\":1,\"url\":\"/visionExperience/internet_platform/platform_management/user_manage\",\"target\":\"_single\",\"mustLogin\":true,\"children\":[{\"id\":27,\"mid\":17,\"code\":\"user_info:list\",\"name\":null,\"desc\":null,\"url\":\"/api/userinfo/list\",\"menuName\":\"查询\",\"selected\":true},{\"id\":28,\"mid\":17,\"code\":\"user_info:edit\",\"name\":null,\"desc\":null,\"url\":\"/api/userinfo/edit\",\"menuName\":\"编辑\",\"selected\":true},{\"id\":29,\"mid\":17,\"code\":\"user_info:delete\",\"name\":null,\"desc\":null,\"url\":\"/api/userinfo/delete\",\"menuName\":\"删除\",\"selected\":true}],\"permission\":[{\"id\":27,\"mid\":17,\"code\":\"user_info:list\",\"name\":null,\"desc\":null,\"url\":\"/api/userinfo/list\",\"menuName\":\"查询\",\"selected\":true},{\"id\":28,\"mid\":17,\"code\":\"user_info:edit\",\"name\":null,\"desc\":null,\"url\":\"/api/userinfo/edit\",\"menuName\":\"编辑\",\"selected\":true},{\"id\":29,\"mid\":17,\"code\":\"user_info:delete\",\"name\":null,\"desc\":null,\"url\":\"/api/userinfo/delete\",\"menuName\":\"删除\",\"selected\":true}]},{\"menuId\":18,\"menuName\":\"角色管理\",\"menuType\":\"component\",\"pid\":16,\"sort\":18,\"visible\":1,\"url\":\"/visionExperience/internet_platform/platform_management/role_manage\",\"target\":\"_single\",\"mustLogin\":true,\"children\":[{\"id\":30,\"mid\":18,\"code\":\"role_info:list\",\"name\":null,\"desc\":null,\"url\":\"/api/userrole/list\",\"menuName\":\"查询\",\"selected\":true},{\"id\":31,\"mid\":18,\"code\":\"role_info:edit\",\"name\":null,\"desc\":null,\"url\":\"/api/userrole/edit\",\"menuName\":\"编辑\",\"selected\":true},{\"id\":32,\"mid\":18,\"code\":\"role_info:delete\",\"name\":null,\"desc\":null,\"url\":\"/api/userrole/delete\",\"menuName\":\"删除\",\"selected\":true}],\"permission\":[{\"id\":30,\"mid\":18,\"code\":\"role_info:list\",\"name\":null,\"desc\":null,\"url\":\"/api/userrole/list\",\"menuName\":\"查询\",\"selected\":true},{\"id\":31,\"mid\":18,\"code\":\"role_info:edit\",\"name\":null,\"desc\":null,\"url\":\"/api/userrole/edit\",\"menuName\":\"编辑\",\"selected\":true},{\"id\":32,\"mid\":18,\"code\":\"role_info:delete\",\"name\":null,\"desc\":null,\"url\":\"/api/userrole/delete\",\"menuName\":\"删除\",\"selected\":true}]}],\"permission\":[]},{\"menuId\":17,\"menuName\":\"用户管理\",\"menuType\":\"component\",\"pid\":16,\"sort\":17,\"visible\":1,\"url\":\"/visionExperience/internet_platform/platform_management/user_manage\",\"target\":\"_single\",\"mustLogin\":true,\"children\":[{\"id\":27,\"mid\":17,\"code\":\"user_info:list\",\"name\":null,\"desc\":null,\"url\":\"/api/userinfo/list\",\"menuName\":\"查询\",\"selected\":true},{\"id\":28,\"mid\":17,\"code\":\"user_info:edit\",\"name\":null,\"desc\":null,\"url\":\"/api/userinfo/edit\",\"menuName\":\"编辑\",\"selected\":true},{\"id\":29,\"mid\":17,\"code\":\"user_info:delete\",\"name\":null,\"desc\":null,\"url\":\"/api/userinfo/delete\",\"menuName\":\"删除\",\"selected\":true}],\"permission\":[{\"id\":27,\"mid\":17,\"code\":\"user_info:list\",\"name\":null,\"desc\":null,\"url\":\"/api/userinfo/list\",\"menuName\":\"查询\",\"selected\":true},{\"id\":28,\"mid\":17,\"code\":\"user_info:edit\",\"name\":null,\"desc\":null,\"url\":\"/api/userinfo/edit\",\"menuName\":\"编辑\",\"selected\":true},{\"id\":29,\"mid\":17,\"code\":\"user_info:delete\",\"name\":null,\"desc\":null,\"url\":\"/api/userinfo/delete\",\"menuName\":\"删除\",\"selected\":true}]},{\"id\":27,\"mid\":17,\"code\":\"user_info:list\",\"name\":null,\"desc\":null,\"url\":\"/api/userinfo/list\",\"menuName\":\"查询\",\"selected\":true},{\"id\":28,\"mid\":17,\"code\":\"user_info:edit\",\"name\":null,\"desc\":null,\"url\":\"/api/userinfo/edit\",\"menuName\":\"编辑\",\"selected\":true},{\"id\":29,\"mid\":17,\"code\":\"user_info:delete\",\"name\":null,\"desc\":null,\"url\":\"/api/userinfo/delete\",\"menuName\":\"删除\",\"selected\":true},{\"menuId\":18,\"menuName\":\"角色管理\",\"menuType\":\"component\",\"pid\":16,\"sort\":18,\"visible\":1,\"url\":\"/visionExperience/internet_platform/platform_management/role_manage\",\"target\":\"_single\",\"mustLogin\":true,\"children\":[{\"id\":30,\"mid\":18,\"code\":\"role_info:list\",\"name\":null,\"desc\":null,\"url\":\"/api/userrole/list\",\"menuName\":\"查询\",\"selected\":true},{\"id\":31,\"mid\":18,\"code\":\"role_info:edit\",\"name\":null,\"desc\":null,\"url\":\"/api/userrole/edit\",\"menuName\":\"编辑\",\"selected\":true},{\"id\":32,\"mid\":18,\"code\":\"role_info:delete\",\"name\":null,\"desc\":null,\"url\":\"/api/userrole/delete\",\"menuName\":\"删除\",\"selected\":true}],\"permission\":[{\"id\":30,\"mid\":18,\"code\":\"role_info:list\",\"name\":null,\"desc\":null,\"url\":\"/api/userrole/list\",\"menuName\":\"查询\",\"selected\":true},{\"id\":31,\"mid\":18,\"code\":\"role_info:edit\",\"name\":null,\"desc\":null,\"url\":\"/api/userrole/edit\",\"menuName\":\"编辑\",\"selected\":true},{\"id\":32,\"mid\":18,\"code\":\"role_info:delete\",\"name\":null,\"desc\":null,\"url\":\"/api/userrole/delete\",\"menuName\":\"删除\",\"selected\":true}]},{\"id\":30,\"mid\":18,\"code\":\"role_info:list\",\"name\":null,\"desc\":null,\"url\":\"/api/userrole/list\",\"menuName\":\"查询\",\"selected\":true},{\"id\":31,\"mid\":18,\"code\":\"role_info:edit\",\"name\":null,\"desc\":null,\"url\":\"/api/userrole/edit\",\"menuName\":\"编辑\",\"selected\":true},{\"id\":32,\"mid\":18,\"code\":\"role_info:delete\",\"name\":null,\"desc\":null,\"url\":\"/api/userrole/delete\",\"menuName\":\"删除\",\"selected\":true}]",
            "menus": null
        }
    ]
};

const delResp = {
  "status": 200,
  "msg": null,
  "total": 0,
  "pages": 0,
  "success": true,
  "data": "角色删除成功!"
}

const editResp = {
  status: 200,
  msg: '',
  data: true
};

export default [
  {
      url: '/api/v1/manage/role/query',
      method: 'GET',
      response: ({ body }) => {
        return roleInfo;
      },
  },
  {
      url: '/api/v1/manage/role/edit',
      method: 'POST',
      response: ({ body }) => {
        return editResp;
      },
  },
  {
      url: '/api/v1/manage/role/create',
      method: 'POST',
      response: ({ body }) => {
        return editResp;
      },
  },
  {
      url: '/api/v1/manage/role/delete',
      method: 'POST',
      response: ({ body, query }) => {
        return delResp;
      },
  }
] as MockMethod[];

