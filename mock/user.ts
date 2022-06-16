import { MockMethod } from 'vite-plugin-mock';

const mockUserLoigin = {
  "status": 200,
  "msg": null,
  "total": 0,
  "pages": 0,
  "success": true,
  "data": {
    "userAccount": "admin56789",
    "appId": [
      {
        "appId": "vr2037_00002",
        "nm": "东莞 : VR 2037虚拟现实·私密空间(汇一城店)",
        "province": null,
        "city": null,
        "district": null,
        "address": null,
        "franchisee": null,
        "manager": null,
        "status": "1",
        "grade": null,
        "partner": null,
        "tm": "2022-05-01 23:00:01",
        "code": "vr2037_00002",
        "provinceName": null,
        "cityName": null,
        "districtName": null,
        "managerImage": null
      },
      {
        "appId": "vr2037_00001",
        "nm": "常州 : VR 2037虚拟现实·私密空间(新北万达店)",
        "province": "320000",
        "city": "320400",
        "district": "320411",
        "address": "测试地址",
        "franchisee": "测试加盟商",
        "manager": "测试店长",
        "status": "1",
        "grade": "测站评级",
        "partner": "测试合伙人",
        "tm": "2022-04-30 12:22:34",
        "code": "vr2037_00001",
        "provinceName": null,
        "cityName": null,
        "districtName": null,
        "managerImage": null
      }
    ],
    "identity_type": 1,
    "userName": "admin",
    "token": {
      "accessToken": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbjU2Nzg5IiwiZXhwIjoxNjU1Mjk0Nzk2LCJpYXQiOjE2NTQ2ODk5OTYsImp0aSI6ImYxNmZiOGU1LTllZGEtNGUxOC05YWQxLTFlYzY1YWU5MTNjNSIsInVzZXJuYW1lIjoiYWRtaW41Njc4OSJ9.ojnaUVzUKlFdcYLxHEGwjdKLVn6DjcxtpTKNBbIOdVA"
    }
  }
};
const mockUserMenuTree = {
  "status": 200,
  "msg": "菜单树查询成功",
  "total": 0,
  "pages": 0,
  "success": true,
  "data": [
    {
      menuId: 1,
      url: '/home',
      menuName: '首页',
      icon: 'home',
    },
    {
      menuId: 2,
      url: '/system',
      menuName: '系统管理',
      icon: 'system',
      children: [
        {
          menuId: 20,
          url: '/system/role',
          menuName: '角色管理',
          icon: 'aimout',
          "permission": [
            {
              "id": 201,
              "code": "role:list",
              "menuName": '查询',
            },
            {
              "id": 202,
              "code": "role:add",
              "menuName": '新增',
            },
            {
              "id": 203,
              "code": "role:edit",
              "menuName": '编辑',
            },
            {
              "id": 204,
              "code": "role:delete",
              "menuName": '删除',
            }
          ]
        },
        {
          menuId: 21,
          url: '/system/user',
          menuName: '用户管理',
          icon: 'user',
          "permission": [
            {
              "id": 211,
              "code": "user:list",
              "menuName": '查询',
            },
            {
              "id": 212,
              "code": "user:add",
              "menuName": '新增',
            },
            {
              "id": 213,
              "code": "user:edit",
              "menuName": '编辑',
            },
            {
              "id": 214,
              "code": "user:delete",
              "menuName": '删除',
            }
          ]
        },
        {
          menuId: 22,
          url: '/system/operateLog',
          menuName: '操作日志',
          icon: 'log',
        },
        {
          menuId: 23,
          url: '/system/noticeMng',
          menuName: '公告管理',
          icon: 'notification',
          "permission": [
            {
              "id": 231,
              "code": "notice:list",
              "menuName": '查询',
            },
            {
              "id": 232,
              "code": "notice:add",
              "menuName": '新增',
            },
            {
              "id": 233,
              "code": "notice:edit",
              "menuName": '编辑',
            },
            {
              "id": 234,
              "code": "notice:delete",
              "menuName": '删除',
            }
          ]
        },
      ],
    },
    {
      menuId: 3,
      url: '/storeMng',
      menuName: '门店管理',
      icon: 'storeMng',
      children: [
        {
          menuId: 30,
          url: '/storeMng/associate',
          menuName: '关联人管理',
          icon: 'userGroup',
          "permission": [
            {
              "id": 301,
              "code": "associate:list",
              "menuName": '查询',
            },
            {
              "id": 302,
              "code": "associate:add",
              "menuName": '新增',
            },
            {
              "id": 303,
              "code": "associate:edit",
              "menuName": '编辑',
            },
            {
              "id": 304,
              "code": "associate:delete",
              "menuName": '删除',
            }
          ]
        },
        {
          menuId: 31,
          url: '/storeMng/shopList',
          menuName: '门店管理',
          icon: 'shopList',
          "permission": [
            {
              "id": 311,
              "code": "shopList:list",
              "menuName": '查询',
            },
            {
              "id": 312,
              "code": "shopList:add",
              "menuName": '新增',
            },
            {
              "id": 313,
              "code": "shopList:edit",
              "menuName": '编辑',
            },
            {
              "id": 314,
              "code": "shopList:delete",
              "menuName": '删除',
            }
          ]
        },
        {
          menuId: 32,
          url: '/storeMng/shopDetail',
          menuName: '门店信息',
          icon: 'shopDetail',
          "permission": [
            {
              "id": 321,
              "code": "shopDetail:list",
              "menuName": '查询',
            },
            {
              "id": 322,
              "code": "shopDetail:add",
              "menuName": '新增',
            },
            {
              "id": 323,
              "code": "shopDetail:edit",
              "menuName": '编辑',
            },
            {
              "id": 324,
              "code": "shopDetail:delete",
              "menuName": '删除',
            }
          ]
        },
      ],
    },
    {
      menuId: 4,
      url: '/businessMng',
      menuName: '经营管理',
      icon: 'businessMng',
      children: [
        {
          menuId: 40,
          url: '/businessMng/reportList',
          menuName: '经营报表',
          icon: 'table',
          "permission": [
            {
              "id": 401,
              "code": "reportList:list",
              "menuName": '查询',
            },
            {
              "id": 402,
              "code": "reportList:add",
              "menuName": '新增',
            },
            {
              "id": 403,
              "code": "reportList:edit",
              "menuName": '编辑',
            },
            {
              "id": 404,
              "code": "reportList:delete",
              "menuName": '删除',
            }
          ]
        },
        {
          menuId: 41,
          url: '/businessMng/rankList',
          menuName: '排行榜',
          icon: 'rank',
          "permission": [
            {
              "id": 411,
              "code": "rankList:list",
              "menuName": '查询',
            },
            {
              "id": 412,
              "code": "rankList:add",
              "menuName": '新增',
            },
            {
              "id": 413,
              "code": "rankList:edit",
              "menuName": '编辑',
            },
            {
              "id": 414,
              "code": "rankList:delete",
              "menuName": '删除',
            }
          ]
        },
      ],
    },
  ]
};
const mockSystemMenuTree = {
  "status": 200,
  "msg": "菜单树查询成功",
  "total": 0,
  "pages": 0,
  "success": true,
  "data": [
    {
      menuId: 1,
      url: '/home',
      menuName: '首页',
      icon: 'home',
    },
    {
      menuId: 2,
      url: '/system',
      menuName: '系统管理',
      icon: 'system',
      children: [
        {
          menuId: 20,
          url: '/system/role',
          menuName: '角色管理',
          icon: 'aimout',
          "permission": [
            {
              "id": 201,
              "code": "role:list",
              "menuName": '查询',
            },
            {
              "id": 202,
              "code": "role:add",
              "menuName": '新增',
            },
            {
              "id": 203,
              "code": "role:edit",
              "menuName": '编辑',
            },
            {
              "id": 204,
              "code": "role:delete",
              "menuName": '删除',
            }
          ]
        },
        {
          menuId: 21,
          url: '/system/user',
          menuName: '用户管理',
          icon: 'user',
          "permission": [
            {
              "id": 211,
              "code": "user:list",
              "menuName": '查询',
            },
            {
              "id": 212,
              "code": "user:add",
              "menuName": '新增',
            },
            {
              "id": 213,
              "code": "user:edit",
              "menuName": '编辑',
            },
            {
              "id": 214,
              "code": "user:delete",
              "menuName": '删除',
            }
          ]
        },
        {
          menuId: 22,
          url: '/system/operateLog',
          menuName: '操作日志',
          icon: 'log',
        },
        {
          menuId: 23,
          url: '/system/noticeMng',
          menuName: '公告管理',
          icon: 'notification',
          "permission": [
            {
              "id": 231,
              "code": "notice:list",
              "menuName": '查询',
            },
            {
              "id": 232,
              "code": "notice:add",
              "menuName": '新增',
            },
            {
              "id": 233,
              "code": "notice:edit",
              "menuName": '编辑',
            },
            {
              "id": 234,
              "code": "notice:delete",
              "menuName": '删除',
            }
          ]
        },
      ],
    },
    {
      menuId: 3,
      url: '/storeMng',
      menuName: '门店管理',
      icon: 'storeMng',
      children: [
        {
          menuId: 30,
          url: '/storeMng/associate',
          menuName: '关联人管理',
          icon: 'userGroup',
          "permission": [
            {
              "id": 301,
              "code": "associate:list",
              "menuName": '查询',
            },
            {
              "id": 302,
              "code": "associate:add",
              "menuName": '新增',
            },
            {
              "id": 303,
              "code": "associate:edit",
              "menuName": '编辑',
            },
            {
              "id": 304,
              "code": "associate:delete",
              "menuName": '删除',
            }
          ]
        },
        {
          menuId: 31,
          url: '/storeMng/shopList',
          menuName: '门店管理',
          icon: 'shopList',
          "permission": [
            {
              "id": 311,
              "code": "shopList:list",
              "menuName": '查询',
            },
            {
              "id": 312,
              "code": "shopList:add",
              "menuName": '新增',
            },
            {
              "id": 313,
              "code": "shopList:edit",
              "menuName": '编辑',
            },
            {
              "id": 314,
              "code": "shopList:delete",
              "menuName": '删除',
            }
          ]
        },
        {
          menuId: 32,
          url: '/storeMng/shopDetail',
          menuName: '门店信息',
          icon: 'shopDetail',
          "permission": [
            {
              "id": 321,
              "code": "shopDetail:list",
              "menuName": '查询',
            },
            {
              "id": 322,
              "code": "shopDetail:add",
              "menuName": '新增',
            },
            {
              "id": 323,
              "code": "shopDetail:edit",
              "menuName": '编辑',
            },
            {
              "id": 324,
              "code": "shopDetail:delete",
              "menuName": '删除',
            }
          ]
        },
      ],
    },
    {
      menuId: 4,
      url: '/businessMng',
      menuName: '经营管理',
      icon: 'businessMng',
      children: [
        {
          menuId: 40,
          url: '/businessMng/reportList',
          menuName: '经营报表',
          icon: 'table',
          "permission": [
            {
              "id": 401,
              "code": "reportList:list",
              "menuName": '查询',
            },
            {
              "id": 402,
              "code": "reportList:add",
              "menuName": '新增',
            },
            {
              "id": 403,
              "code": "reportList:edit",
              "menuName": '编辑',
            },
            {
              "id": 404,
              "code": "reportList:delete",
              "menuName": '删除',
            }
          ]
        },
        {
          menuId: 41,
          url: '/businessMng/rankList',
          menuName: '排行榜',
          icon: 'rank',
          "permission": [
            {
              "id": 411,
              "code": "rankList:list",
              "menuName": '查询',
            },
            {
              "id": 412,
              "code": "rankList:add",
              "menuName": '新增',
            },
            {
              "id": 413,
              "code": "rankList:edit",
              "menuName": '编辑',
            },
            {
              "id": 414,
              "code": "rankList:delete",
              "menuName": '删除',
            }
          ]
        },
      ],
    },
  ]
};

const mockNoticeList = {
  status: 200,
  data: [
    {
      id: '000000001',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
      title: '你收到了 14 份新周报',
      datetime: '2017-08-09',
      type: 'notification'
    },
    {
      id: '000000002',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png',
      title: '你推荐的 曲妮妮 已通过第三轮面试',
      datetime: '2017-08-08',
      type: 'notification'
    },
    {
      id: '000000003',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png',
      title: '这种模板可以区分多种通知类型',
      datetime: '2017-08-07',
      read: true,
      type: 'notification'
    },
    {
      id: '000000004',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
      title: '左侧图标用于区分不同的类型',
      datetime: '2017-08-07',
      type: 'notification'
    },
    {
      id: '000000005',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
      title: '内容不要超过两行字，超出时自动截断',
      datetime: '2017-08-07',
      type: 'notification'
    },
    {
      id: '000000006',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
      title: '曲丽丽 评论了你',
      description: '描述信息描述信息描述信息',
      datetime: '2017-08-07',
      type: 'message',
      clickClose: true
    },
    {
      id: '000000007',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
      title: '朱偏右 回复了你',
      description: '这种模板用于提醒谁与你发生了互动，左侧放『谁』的头像',
      datetime: '2017-08-07',
      type: 'message',
      clickClose: true
    },
    {
      id: '000000008',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
      title: '标题',
      description: '这种模板用于提醒谁与你发生了互动，左侧放『谁』的头像',
      datetime: '2017-08-07',
      type: 'message',
      clickClose: true
    },
    {
      id: '000000009',
      title: '任务名称',
      description: '任务需要在 2017-01-12 20:00 前启动',
      extra: '未开始',
      status: 'todo',
      type: 'event'
    },
    {
      id: '000000010',
      title: '第三方紧急代码变更',
      description: '冠霖提交于 2017-01-06，需在 2017-01-07 前完成代码变更任务',
      extra: '马上到期',
      status: 'urgent',
      type: 'event'
    },
    {
      id: '000000011',
      title: '信息安全考试',
      description: '指派竹尔于 2017-01-09 前完成更新并发布',
      extra: '已耗时 8 天',
      status: 'doing',
      type: 'event'
    },
    {
      id: '000000012',
      title: 'ABCD 版本发布',
      description: '冠霖提交于 2017-01-06，需在 2017-01-07 前完成代码变更任务',
      extra: '进行中',
      status: 'processing',
      type: 'event'
    }
  ]
};

const mockPermissionCodeList = {
  "status": 200,
  "data": [
    'notification',
    'systemMng',
    'roleMng',
    'userMng',
    'operateLog',
    'noticeMng',
    'storeMng',
    'associate',
    'shopList',
    'shopDetail',
    'businessMng',
    'reportList',
    'rankList'
  ]
};

export default [
  {
    url: '/mock/auth/loginWithAccount',
    method: 'POST',
    response: ({ body }) => {
      return mockUserLoigin;
    },
  },
  {
    url: '/mock/auth/upatepwd',
    method: 'POST',
    response: ({ body }) => {
      return {
        status: 200,
        data: {}
      };
    },
  },
  {
    url: '/mock/manage/menu/list',
    method: 'get',
    response: ({ body }) => {
      return mockSystemMenuTree;
    },
  },
  {
    url: '/mock/manage/user/menu',
    method: 'get',
    response: ({ body }) => {
      return mockUserMenuTree;
    },
  },
  {
    url: '/mock/current/notice',
    method: 'get',
    response: ({ body }) => {
      return mockNoticeList;
    },
  },
] as MockMethod[];

