// 权限菜单数据从接口获得，该配置文件已废弃
export const systemMenuList = [
  // {
  //   code: 'notification',
  //   name: '公告',
  //   path: '/notification',
  //   icon: 'notification',
  // },
  {
    code: 'systemMng',
    name: '系统管理',
    path: '/system',
    icon: 'system',
    children: [
      {
        code: 'roleMng',
        name: '角色管理',
        path: '/system/role',
        icon: 'smile',
      },
      {
        code: 'userMng',
        path: '/system/user',
        name: '用户管理',
        icon: 'smile',
      },
      {
        code: 'operateLog',
        path: '/system/operateLog',
        name: '操作日志',
        icon: 'smile',
      },
      {
        code: 'noticeMng',
        path: '/system/noticeMng',
        name: '公告管理',
        icon: 'smile',
      },
    ],
  },
  {
    code: 'storeMng',
    path: '/storeMng',
    name: '门店管理',
    icon: 'storeMng',
    children: [
      {
        code: 'associate',
        path: '/storeMng/associate',
        name: '关联人管理',
        icon: 'smile',
      },
      {
        code: 'shopList',
        path: '/storeMng/shopList',
        name: '门店管理',
        icon: 'smile',
      },
      {
        code: 'shopDetail',
        path: '/storeMng/shopDetail',
        name: '门店信息',
        icon: 'smile',
      },
    ],
  },
  {
    code: 'businessMng',
    path: '/businessMng',
    name: '经营管理',
    icon: 'businessMng',
    children: [
      {
        code: 'reportList',
        path: '/businessMng/reportList',
        name: '经营报表',
        icon: 'smile',
      },
      {
        code: 'rankList',
        path: '/businessMng/rankList',
        name: '排行榜',
        icon: 'smile',
      },
    ],
  },
  {
    path: '/404',
    name: '404',
    icon: 'frown',
  }
];


export const userMenuTree = [
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
];