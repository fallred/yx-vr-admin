import { MockMethod } from 'vite-plugin-mock';

const roleListPage = {
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
            "powerSelected": '[{"menuId":"0-1","url":"/system","menuName":"系统管理","icon":"system","children":[{"menuId":"0-1-0","url":"/system/role","menuName":"角色管理","icon":"smile","permission":[{"id":"0100","mid":18,"code":"role_info:list","name":null,"desc":null,"url":"/api/userrole/list","menuName":"查询"},{"id":"0101","mid":18,"code":"role_info:edit","name":null,"desc":null,"url":"/api/userrole/edit","menuName":"编辑"},{"id":"0102","mid":18,"code":"role_info:delete","name":null,"desc":null,"url":"/api/userrole/delete","menuName":"删除"}],"selected":true},{"menuId":"0-1-1","url":"/system/user","menuName":"用户管理","icon":"smile","permission":[{"id":"0110","mid":17,"code":"user_info:list","name":null,"desc":null,"url":"/api/userinfo/list","menuName":"查询"},{"id":"0111","mid":17,"code":"user_info:edit","name":null,"desc":null,"url":"/api/userinfo/edit","menuName":"编辑"},{"id":"0112","mid":17,"code":"user_info:delete","name":null,"desc":null,"url":"/api/userinfo/delete","menuName":"删除"}],"selected":true},{"menuId":"0-1-2","url":"/system/operateLog","menuName":"操作日志","icon":"smile","permission":[{"id":"0120","mid":19,"code":"log_info:list","name":null,"desc":null,"url":"/api/registerlist/list","menuName":"查询"}],"selected":true},{"menuId":"0-1-3","url":"/system/noticeMng","menuName":"公告管理","icon":"smile","permission":[{"id":"0130","mid":20,"code":"notice_info:list","name":null,"desc":null,"url":"/api/registerlist/list","menuName":"查询"}],"selected":true}],"selected":true},{"menuId":"0-2","url":"/storeMng","menuName":"门店管理","icon":"storeMng","children":[{"menuId":"0-2-0","url":"/storeMng/associate","menuName":"关联人管理","icon":"smile","permission":[{"id":"0201","mid":2,"code":"related_person:list","name":null,"desc":null,"url":"/api/dataInput/list","menuName":"查询"},{"id":"0202","mid":2,"code":"related_person:add","name":null,"desc":null,"url":"/api/dataInput/add","menuName":"新增"},{"id":"0203","mid":2,"code":"related_person:edit","name":null,"desc":null,"url":"/api/dataInput/edit","menuName":"编辑"},{"id":"0204","mid":2,"code":"related_person:delete","name":null,"desc":null,"url":"/api/dataInput/delete","menuName":"删除"}],"selected":true},{"menuId":"0-2-1","url":"/storeMng/shopList","menuName":"门店管理","icon":"smile","permission":[{"id":"0210","mid":3,"code":"store_manage:list","name":null,"desc":null,"url":"/api/dataInput/list","menuName":"查询"},{"id":"0211","mid":3,"code":"store_manage:add","name":null,"desc":null,"url":"/api/dataInput/add","menuName":"新增"},{"id":"0212","mid":3,"code":"store_manage:edit","name":null,"desc":null,"url":"/api/dataInput/edit","menuName":"编辑"},{"id":"0213","mid":3,"code":"store_manage:delete","name":null,"desc":null,"url":"/api/dataInput/delete","menuName":"删除"}],"selected":true}]},{"menuId":"0-3","url":"/businessMng","menuName":"经营管理","icon":"businessMng","children":[{"menuId":"0-3-0","url":"/businessMng/reportList","menuName":"经营报表","icon":"smile","permission":[{"id":"0301","mid":6,"code":"business_report:list","name":null,"desc":null,"url":"/api/dataTag/list","menuName":"查询"}],"selected":true},{"menuId":"0-3-1","url":"/businessMng/rankList","menuName":"排行榜","icon":"smile","permission":[{"id":"0310","mid":7,"code":"ranking_list:list","name":null,"desc":null,"url":"/api/dataTag/list","menuName":"查询"}],"selected":true}],"selected":true}]',
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

const roleListAll = {
  "status": 200,
  "msg": "角色信息查询成功",
  "total": 0,
  "pages": 0,
  "success": true,
  "data": [
    {
      "id": 25,
      "name": "普通角色",
      "code": "0",
      "comment": "普通角色",
      "deleted": 0,
      "powerSelected": "[{\"menuId\":\"0-1\",\"url\":\"/system\",\"menuName\":\"系统管理\",\"icon\":\"system\",\"children\":[{\"menuId\":\"0-1-0\",\"url\":\"/system/role\",\"menuName\":\"角色管理\",\"icon\":\"smile\",\"permission\":[{\"id\":\"0100\",\"mid\":18,\"code\":\"role_info:list\",\"name\":null,\"desc\":null,\"url\":\"/api/userrole/list\",\"menuName\":\"查询\"},{\"id\":\"0101\",\"mid\":18,\"code\":\"role_info:edit\",\"name\":null,\"desc\":null,\"url\":\"/api/userrole/edit\",\"menuName\":\"编辑\"},{\"id\":\"0102\",\"mid\":18,\"code\":\"role_info:delete\",\"name\":null,\"desc\":null,\"url\":\"/api/userrole/delete\",\"menuName\":\"删除\"}]},{\"menuId\":\"0-1-1\",\"url\":\"/system/user\",\"menuName\":\"用户管理\",\"icon\":\"smile\",\"permission\":[{\"id\":\"0110\",\"mid\":17,\"code\":\"user_info:list\",\"name\":null,\"desc\":null,\"url\":\"/api/userinfo/list\",\"menuName\":\"查询\"},{\"id\":\"0111\",\"mid\":17,\"code\":\"user_info:edit\",\"name\":null,\"desc\":null,\"url\":\"/api/userinfo/edit\",\"menuName\":\"编辑\"},{\"id\":\"0112\",\"mid\":17,\"code\":\"user_info:delete\",\"name\":null,\"desc\":null,\"url\":\"/api/userinfo/delete\",\"menuName\":\"删除\"}]},{\"menuId\":\"0-1-2\",\"url\":\"/system/operateLog\",\"menuName\":\"操作日志\",\"icon\":\"smile\",\"permission\":[{\"id\":\"0120\",\"mid\":19,\"code\":\"log_info:list\",\"name\":null,\"desc\":null,\"url\":\"/api/registerlist/list\",\"menuName\":\"查询\"}]},{\"menuId\":\"0-1-3\",\"url\":\"/system/noticeMng\",\"menuName\":\"公告管理\",\"icon\":\"smile\",\"permission\":[{\"id\":\"0130\",\"mid\":20,\"code\":\"notice_info:list\",\"name\":null,\"desc\":null,\"url\":\"/api/registerlist/list\",\"menuName\":\"查询\"}]}],\"selected\":true},{\"menuId\":\"0-2\",\"url\":\"/storeMng\",\"menuName\":\"门店管理\",\"icon\":\"storeMng\",\"children\":[{\"menuId\":\"0-2-0\",\"url\":\"/storeMng/associate\",\"menuName\":\"关联人管理\",\"icon\":\"smile\",\"permission\":[{\"id\":\"0201\",\"mid\":2,\"code\":\"related_person:list\",\"name\":null,\"desc\":null,\"url\":\"/api/dataInput/list\",\"menuName\":\"查询\"},{\"id\":\"0202\",\"mid\":2,\"code\":\"related_person:add\",\"name\":null,\"desc\":null,\"url\":\"/api/dataInput/add\",\"menuName\":\"新增\"},{\"id\":\"0203\",\"mid\":2,\"code\":\"related_person:edit\",\"name\":null,\"desc\":null,\"url\":\"/api/dataInput/edit\",\"menuName\":\"编辑\"},{\"id\":\"0204\",\"mid\":2,\"code\":\"related_person:delete\",\"name\":null,\"desc\":null,\"url\":\"/api/dataInput/delete\",\"menuName\":\"删除\"}]},{\"menuId\":\"0-2-1\",\"url\":\"/storeMng/shopList\",\"menuName\":\"门店管理\",\"icon\":\"smile\",\"permission\":[{\"id\":\"0210\",\"mid\":3,\"code\":\"store_manage:list\",\"name\":null,\"desc\":null,\"url\":\"/api/dataInput/list\",\"menuName\":\"查询\"},{\"id\":\"0211\",\"mid\":3,\"code\":\"store_manage:add\",\"name\":null,\"desc\":null,\"url\":\"/api/dataInput/add\",\"menuName\":\"新增\"},{\"id\":\"0212\",\"mid\":3,\"code\":\"store_manage:edit\",\"name\":null,\"desc\":null,\"url\":\"/api/dataInput/edit\",\"menuName\":\"编辑\"},{\"id\":\"0213\",\"mid\":3,\"code\":\"store_manage:delete\",\"name\":null,\"desc\":null,\"url\":\"/api/dataInput/delete\",\"menuName\":\"删除\"}]},{\"menuId\":\"0-2-2\",\"url\":\"/storeMng/shopDetail\",\"menuName\":\"门店信息\",\"icon\":\"smile\",\"permission\":[{\"id\":\"0220\",\"mid\":4,\"code\":\"store_info:list\",\"name\":null,\"desc\":null,\"url\":\"/api/dataInput/list\",\"menuName\":\"查询\"},{\"id\":\"0221\",\"mid\":4,\"code\":\"store_info:add\",\"name\":null,\"desc\":null,\"url\":\"/api/dataInput/add\",\"menuName\":\"新增\"},{\"id\":\"0222\",\"mid\":4,\"code\":\"store_info:edit\",\"name\":null,\"desc\":null,\"url\":\"/api/dataInput/edit\",\"menuName\":\"编辑\"},{\"id\":\"0223\",\"mid\":4,\"code\":\"store_info:delete\",\"name\":null,\"desc\":null,\"url\":\"/api/dataInput/delete\",\"menuName\":\"删除\"}]}],\"selected\":true}]",
      "menus": null
    },
    {
      "id": 26,
      "name": "一级管理员",
      "code": "first_level_admin",
      "comment": "一级管理员",
      "deleted": 0,
      "powerSelected": "",
      "menus": null
    },
    {
      "id": 27,
      "name": "二级管理员",
      "code": "SECOND_ADMIN",
      "comment": "测试一下",
      "deleted": 0,
      "powerSelected": "",
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
      url: '/mock/manage/role/query',
      method: 'GET',
      response: ({ body }) => {
        return roleListPage;
      },
  },
  {
    url: '/mock/manage/role/list',
    method: 'GET',
    response: ({ body }) => {
      return roleListAll;
    },
  },
  {
      url: '/mock/manage/role/edit',
      method: 'POST',
      response: ({ body }) => {
        return editResp;
      },
  },
  {
      url: '/mock/manage/role/create',
      method: 'POST',
      response: ({ body }) => {
        return editResp;
      },
  },
  {
      url: '/mock/manage/role/delete',
      method: 'POST',
      response: ({ body, query }) => {
        return delResp;
      },
  }
] as MockMethod[];

