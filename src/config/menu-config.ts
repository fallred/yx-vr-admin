// 权限菜单数据从接口获得，该配置文件已废弃
export const systemMenuList = [
  {
    code: 'notification',
    name: '公告',
    path: '/notification',
    icon: 'notification',
  },
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
