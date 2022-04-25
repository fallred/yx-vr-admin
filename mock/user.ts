import { MockMethod } from 'vite-plugin-mock';


const mockUserMenuTree = [
  {
    menuId: '0-0',
    url: '/notification',
    menuName: '公告',
    icon: 'notification',
    "permission": [
      {
        "id": 1,
        "mid": 2,
        "code": "related_person:list",
        "name": null,
        "desc": null,
        "url": "/api/dataInput/list",
        "menuName": "查询"
      },
      {
        "id": 2,
        "mid": 2,
        "code": "related_person:add",
        "name": null,
        "desc": null,
        "url": "/api/dataInput/add",
        "menuName": "新增"
      },
      {
        "id": 3,
        "mid": 2,
        "code": "related_person:edit",
        "name": null,
        "desc": null,
        "url": "/api/dataInput/edit",
        "menuName": "编辑"
      },
      {
        "id": 4,
        "mid": 2,
        "code": "related_person:delete",
        "name": null,
        "desc": null,
        "url": "/api/dataInput/delete",
        "menuName": "删除"
      }
    ]
  },
  {
    menuId: '0-1',
    url: '/system',
    menuName: '系统管理',
    icon: 'system',
    children: [
      {
        menuId: '0-1-0',
        url: '/system/role',
        menuName: '角色管理',
        icon: 'smile',
        "permission": [
          {
            "id": 5,
            "mid": 2,
            "code": "related_person:list",
            "name": null,
            "desc": null,
            "url": "/api/dataInput/list",
            "menuName": "查询"
          },
          {
            "id": 6,
            "mid": 2,
            "code": "related_person:add",
            "name": null,
            "desc": null,
            "url": "/api/dataInput/add",
            "menuName": "新增"
          },
          {
            "id": 7,
            "mid": 2,
            "code": "related_person:edit",
            "name": null,
            "desc": null,
            "url": "/api/dataInput/edit",
            "menuName": "编辑"
          },
          {
            "id": 8,
            "mid": 2,
            "code": "related_person:delete",
            "name": null,
            "desc": null,
            "url": "/api/dataInput/delete",
            "menuName": "删除"
          }
        ]
      },
      {
        menuId: '0-1-1',
        url: '/system/user',
        menuName: '用户管理',
        icon: 'smile',
        "permission": [
          {
            "id": 9,
            "mid": 2,
            "code": "related_person:list",
            "name": null,
            "desc": null,
            "url": "/api/dataInput/list",
            "menuName": "查询"
          },
          {
            "id": 10,
            "mid": 2,
            "code": "related_person:add",
            "name": null,
            "desc": null,
            "url": "/api/dataInput/add",
            "menuName": "新增"
          },
        ]
      },
      {
        menuId: '0-1-2',
        url: '/system/operateLog',
        menuName: '操作日志',
        icon: 'smile',
      },
      {
        menuId: '0-1-3',
        url: '/system/noticeMng',
        menuName: '公告管理',
        icon: 'smile',
      },
    ],
  },
  {
    menuId: '0-2',
    url: '/storeMng',
    menuName: '门店管理',
    icon: 'storeMng',
    children: [
      {
        menuId: '0-2-0',
        url: '/storeMng/associate',
        menuName: '关联人管理',
        icon: 'smile',
      },
      {
        menuId: '0-2-1',
        url: '/storeMng/shopList',
        menuName: '门店管理',
        icon: 'smile',
      },
      {
        menuId: '0-2-2',
        url: '/storeMng/shopDetail',
        menuName: '门店信息',
        icon: 'smile',
      },
    ],
  },
  {
    menuId: '0-3',
    url: '/businessMng',
    menuName: '经营管理',
    icon: 'businessMng',
    children: [
      {
        menuId: '0-3-0',
        url: '/businessMng/reportList',
        menuName: '经营报表',
        icon: 'smile',
      },
      {
        menuId: '0-3-1',
        url: '/businessMng/rankList',
        menuName: '排行榜',
        icon: 'smile',
      },
    ],
  },
]
const mockSystemMenuTree = [
  {
    menuId: '0-0',
    url: '/notification',
    menuName: '公告',
    icon: 'notification',
  },
  {
    menuId: '0-1',
    url: '/system',
    menuName: '系统管理',
    icon: 'system',
    children: [
      {
        menuId: '0-1-0',
        url: '/system/role',
        menuName: '角色管理',
        icon: 'smile',
        "permission": [
          {
            "id": 30,
            "mid": 18,
            "code": "role_info:list",
            "name": null,
            "desc": null,
            "url": "/api/userrole/list",
            "menuName": "查询"
          },
          {
            "id": 31,
            "mid": 18,
            "code": "role_info:edit",
            "name": null,
            "desc": null,
            "url": "/api/userrole/edit",
            "menuName": "编辑"
          },
          {
            "id": 32,
            "mid": 18,
            "code": "role_info:delete",
            "name": null,
            "desc": null,
            "url": "/api/userrole/delete",
            "menuName": "删除"
          }
        ],
      },
      {
        menuId: '0-1-1',
        url: '/system/user',
        menuName: '用户管理',
        icon: 'smile',
        "permission": [
          {
            "id": 27,
            "mid": 17,
            "code": "user_info:list",
            "name": null,
            "desc": null,
            "url": "/api/userinfo/list",
            "menuName": "查询"
          },
          {
            "id": 28,
            "mid": 17,
            "code": "user_info:edit",
            "name": null,
            "desc": null,
            "url": "/api/userinfo/edit",
            "menuName": "编辑"
          },
          {
            "id": 29,
            "mid": 17,
            "code": "user_info:delete",
            "name": null,
            "desc": null,
            "url": "/api/userinfo/delete",
            "menuName": "删除"
          }
        ]
      },
      {
        menuId: '0-1-2',
        url: '/system/operateLog',
        menuName: '操作日志',
        icon: 'smile',
        "permission": [
          {
            "id": 33,
            "mid": 19,
            "code": "log_info:list",
            "name": null,
            "desc": null,
            "url": "/api/registerlist/list",
            "menuName": "查询"
          }
        ]
      },
      {
        menuId: '0-1-3',
        url: '/system/noticeMng',
        menuName: '公告管理',
        icon: 'smile',
        "permission": [
          {
            "id": 34,
            "mid": 20,
            "code": "notice_info:list",
            "name": null,
            "desc": null,
            "url": "/api/registerlist/list",
            "menuName": "查询"
          }
        ]
      },
    ],
  },
  {
    menuId: '0-2',
    url: '/storeMng',
    menuName: '门店管理',
    icon: 'storeMng',
    children: [
      {
        menuId: '0-2-0',
        url: '/storeMng/associate',
        menuName: '关联人管理',
        icon: 'smile',
        "permission": [
          {
            "id": 1,
            "mid": 2,
            "code": "related_person:list",
            "name": null,
            "desc": null,
            "url": "/api/dataInput/list",
            "menuName": "查询"
          },
          {
            "id": 2,
            "mid": 2,
            "code": "related_person:add",
            "name": null,
            "desc": null,
            "url": "/api/dataInput/add",
            "menuName": "新增"
          },
          {
            "id": 3,
            "mid": 2,
            "code": "related_person:edit",
            "name": null,
            "desc": null,
            "url": "/api/dataInput/edit",
            "menuName": "编辑"
          },
          {
            "id": 4,
            "mid": 2,
            "code": "related_person:delete",
            "name": null,
            "desc": null,
            "url": "/api/dataInput/delete",
            "menuName": "删除"
          }
        ]
      },
      {
        menuId: '0-2-1',
        url: '/storeMng/shopList',
        menuName: '门店管理',
        icon: 'smile',
        "permission": [
          {
            "id": 35,
            "mid": 3,
            "code": "store_manage:list",
            "name": null,
            "desc": null,
            "url": "/api/dataInput/list",
            "menuName": "查询"
          },
          {
            "id": 36,
            "mid": 3,
            "code": "store_manage:add",
            "name": null,
            "desc": null,
            "url": "/api/dataInput/add",
            "menuName": "新增"
          },
          {
            "id": 37,
            "mid": 3,
            "code": "store_manage:edit",
            "name": null,
            "desc": null,
            "url": "/api/dataInput/edit",
            "menuName": "编辑"
          },
          {
            "id": 38,
            "mid": 3,
            "code": "store_manage:delete",
            "name": null,
            "desc": null,
            "url": "/api/dataInput/delete",
            "menuName": "删除"
          }
        ]
      },
      {
        menuId: '0-2-2',
        url: '/storeMng/shopDetail',
        menuName: '门店信息',
        icon: 'smile',
        "permission": [
          {
            "id": 39,
            "mid": 4,
            "code": "store_info:list",
            "name": null,
            "desc": null,
            "url": "/api/dataInput/list",
            "menuName": "查询"
          },
          {
            "id": 40,
            "mid": 4,
            "code": "store_info:add",
            "name": null,
            "desc": null,
            "url": "/api/dataInput/add",
            "menuName": "新增"
          },
          {
            "id": 41,
            "mid": 4,
            "code": "store_info:edit",
            "name": null,
            "desc": null,
            "url": "/api/dataInput/edit",
            "menuName": "编辑"
          },
          {
            "id": 42,
            "mid": 4,
            "code": "store_info:delete",
            "name": null,
            "desc": null,
            "url": "/api/dataInput/delete",
            "menuName": "删除"
          }
        ],
      }
    ]
  },
  {
    menuId: '0-3',
    url: '/businessMng',
    menuName: '经营管理',
    icon: 'businessMng',
    children: [
      {
        menuId: '0-3-0',
        url: '/businessMng/reportList',
        menuName: '经营报表',
        icon: 'smile',
        "permission": [
          {
            "id": 10,
            "mid": 6,
            "code": "business_report:list",
            "name": null,
            "desc": null,
            "url": "/api/dataTag/list",
            "menuName": "查询"
          }
        ]
      },
      {
        menuId: '0-3-1',
        url: '/businessMng/rankList',
        menuName: '排行榜',
        icon: 'smile',
        "permission": [
          {
            "id": 11,
            "mid": 7,
            "code": "ranking_list:list",
            "name": null,
            "desc": null,
            "url": "/api/dataTag/list",
            "menuName": "查询"
          }
        ]
      },
    ],
  },
  // {
  //   url: '/404',
  //   menuName: '404',
  //   icon: 'frown',
  // }
];
const mockNoticeList = [
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
];

const mockPermissionCodeList = [
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
];

export default [
  {
    url: '/api/v1/login',
    method: 'POST',
    response: ({ body }) => {
      return {
        "userAccount": "18627107089",
        "appId": "vr2037_00001",
        "identity_type": 0,
        "userName": "shuwei",
        "token": {
            "accessToken": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxODYyNzEwNzA4OSIsImV4cCI6MTY1MDk4MTczNCwiaWF0IjoxNjUwMzc2OTM0LCJqdGkiOiJhYzZlZTY4Ny04ZDY4LTQ5ODEtODYwNi05NjhjYjAwODZmYWUiLCJ1c2VybmFtZSI6IjE4NjI3MTA3MDg5In0.M-4LwfCuzWZp_pCV7PdExaP1jWqAmY-5J46VM7gOTP4"
        }
      };
    },
  },
  {
    url: '/api/v1/auth/upatepwd',
    method: 'POST',
    response: ({ body }) => {
      return {
       
      };
    },
  },
  {
    url: '/api/v1/manage/menu/list',
    method: 'get',
    response: ({ body }) => {
      return mockSystemMenuTree;
    },
  },
  {
    url: '/api/v1/manage/user/menu',
    method: 'get',
    response: ({ body }) => {
      return mockUserMenuTree;
    },
  },
  // {
  //   url: '/api/v1/current/user',
  //   method: 'get',
  //   response: ({ body }) => {
  //     return {
  //       username: 'decker',
  //       role: 'admin',
  //     };
  //   },
  // },
  {
    url: '/api/v1/current/notice',
    method: 'get',
    response: ({ body }) => {
      return mockNoticeList;
    },
  },
] as MockMethod[];

