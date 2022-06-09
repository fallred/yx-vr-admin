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
            "powerSelected": '[{"menuId":1,"url":"/home","menuName":"首页","icon":"home","selected":true},{"menuId":2,"url":"/system","menuName":"系统管理","icon":"system","children":[{"menuId":20,"url":"/system/role","menuName":"角色管理","icon":"smile","permission":[{"id":201,"code":"role:list","menuName":"查询"},{"id":202,"code":"role:add","menuName":"新增"},{"id":203,"code":"role:edit","menuName":"编辑"},{"id":204,"code":"role:delete","menuName":"删除"}],"selected":true},{"menuId":21,"url":"/system/user","menuName":"用户管理","icon":"smile","permission":[{"id":211,"code":"user:list","menuName":"查询"},{"id":212,"code":"user:add","menuName":"新增"},{"id":213,"code":"user:edit","menuName":"编辑"},{"id":214,"code":"user:delete","menuName":"删除"}],"selected":true},{"menuId":23,"url":"/system/noticeMng","menuName":"公告管理","icon":"smile","permission":[{"id":231,"code":"notice:list","menuName":"查询"},{"id":232,"code":"notice:add","menuName":"新增"},{"id":233,"code":"notice:edit","menuName":"编辑"},{"id":234,"code":"notice:delete","menuName":"删除"}],"selected":true}]},{"menuId":3,"url":"/storeMng","menuName":"门店管理","icon":"storeMng","children":[{"menuId":30,"url":"/storeMng/associate","menuName":"关联人管理","icon":"smile","permission":[{"id":301,"code":"associate:list","menuName":"查询"},{"id":302,"code":"associate:add","menuName":"新增"},{"id":303,"code":"associate:edit","menuName":"编辑"},{"id":304,"code":"associate:delete","menuName":"删除"}],"selected":true},{"menuId":32,"url":"/storeMng/shopDetail","menuName":"门店信息","icon":"smile","permission":[{"id":321,"code":"shopDetail:list","menuName":"查询"},{"id":322,"code":"shopDetail:add","menuName":"新增"},{"id":323,"code":"shopDetail:edit","menuName":"编辑"},{"id":324,"code":"shopDetail:delete","menuName":"删除"}],"selected":true}]},{"menuId":4,"url":"/businessMng","menuName":"经营管理","icon":"businessMng","children":[{"menuId":40,"url":"/businessMng/reportList","menuName":"经营报表","icon":"smile","permission":[{"id":401,"code":"reportList:list","menuName":"查询"},{"id":402,"code":"reportList:add","menuName":"新增"},{"id":403,"code":"reportList:edit","menuName":"编辑"},{"id":404,"code":"reportList:delete","menuName":"删除"}],"selected":true},{"menuId":41,"url":"/businessMng/rankList","menuName":"排行榜","icon":"smile","permission":[{"id":411,"code":"rankList:list","menuName":"查询"},{"id":412,"code":"rankList:add","menuName":"新增"},{"id":413,"code":"rankList:edit","menuName":"编辑"},{"id":414,"code":"rankList:delete","menuName":"删除"}],"selected":true}],"selected":true}]',
            "menus": null
        },
        {
            "id": 25,
            "name": "普通角色",
            "code": "0",
            "comment": "对外用户注册使用",
            "deleted": 0,
            "powerSelected": '[{"menuId":2,"url":"/system","menuName":"系统管理","icon":"system","children":[{"menuId":20,"url":"/system/role","menuName":"角色管理","icon":"smile","permission":[{"id":201,"code":"role:list","menuName":"查询"},{"id":202,"code":"role:add","menuName":"新增"},{"id":203,"code":"role:edit","menuName":"编辑"},{"id":204,"code":"role:delete","menuName":"删除"}]},{"menuId":21,"url":"/system/user","menuName":"用户管理","icon":"smile","permission":[{"id":211,"code":"user:list","menuName":"查询"},{"id":212,"code":"user:add","menuName":"新增"},{"id":213,"code":"user:edit","menuName":"编辑"},{"id":214,"code":"user:delete","menuName":"删除"}],"selected":true},{"menuId":23,"url":"/system/noticeMng","menuName":"公告管理","icon":"smile","permission":[{"id":231,"code":"notice:list","menuName":"查询"},{"id":232,"code":"notice:add","menuName":"新增"},{"id":233,"code":"notice:edit","menuName":"编辑"},{"id":234,"code":"notice:delete","menuName":"删除"}],"selected":true}]},{"menuId":3,"url":"/storeMng","menuName":"门店管理","icon":"storeMng","children":[{"menuId":30,"url":"/storeMng/associate","menuName":"关联人管理","icon":"smile","permission":[{"id":301,"code":"associate:list","menuName":"查询"},{"id":302,"code":"associate:add","menuName":"新增"},{"id":303,"code":"associate:edit","menuName":"编辑"},{"id":304,"code":"associate:delete","menuName":"删除"}],"selected":true},{"menuId":32,"url":"/storeMng/shopDetail","menuName":"门店信息","icon":"smile","permission":[{"id":321,"code":"shopDetail:list","menuName":"查询"},{"id":322,"code":"shopDetail:add","menuName":"新增"},{"id":323,"code":"shopDetail:edit","menuName":"编辑"},{"id":324,"code":"shopDetail:delete","menuName":"删除"}],"selected":true}]},{"menuId":4,"url":"/businessMng","menuName":"经营管理","icon":"businessMng","children":[{"menuId":40,"url":"/businessMng/reportList","menuName":"经营报表","icon":"smile","permission":[{"id":401,"code":"reportList:list","menuName":"查询"},{"id":402,"code":"reportList:add","menuName":"新增"},{"id":403,"code":"reportList:edit","menuName":"编辑"},{"id":404,"code":"reportList:delete","menuName":"删除"}],"selected":true},{"menuId":41,"url":"/businessMng/rankList","menuName":"排行榜","icon":"smile","permission":[{"id":411,"code":"rankList:list","menuName":"查询"},{"id":412,"code":"rankList:add","menuName":"新增"},{"id":413,"code":"rankList:edit","menuName":"编辑"},{"id":414,"code":"rankList:delete","menuName":"删除"}],"selected":true}],"selected":true}]',
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

