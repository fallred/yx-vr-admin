export const systemMenuList = [
    {
       code: 'notification',
       name: '公告',
       path: '/notification',
       locale: 'menu.notification',
       icon: 'notification',
    },
    {
      code: 'systemMng',
      name: '系统管理',
      path: '/system',
      locale: 'menu.system',
      icon: 'system',
      children: [
        {
          code: 'roleMng',
          name: '角色管理',
          path: '/system/role',
          locale: 'menu.system.role',
          icon: 'smile',
        },
        {
          code: 'userMng',
          path: '/system/user',
          name: '用户管理',
          locale: 'menu.system.user',
          icon: 'smile',
        },
        {
            code: 'operateLog',
            path: '/system/operateLog',
            name: '操作日志',
            locale: 'menu.system.operateLog',
            icon: 'smile',
        },
        {
            code: 'noticeMng',
            path: '/system/noticeMng',
            name: '公告管理',
            locale: 'menu.system.noticeMng',
            icon: 'smile',
        },
      ],
    },
    {
      code: 'storeMng',
      path: '/storeMng',
      name: '门店管理',
      locale: 'menu.storeMng',
      icon: 'storeMng',
      children: [
        {
            code: 'associate',
            path: '/storeMng/associate',
            name: '关联人管理',
            locale: 'menu.storeMng.associate',
            icon: 'smile',
        },
        {
            code: 'shopList',
            path: '/storeMng/shopList',
            name: '门店管理',
            locale: 'menu.storeMng.shopList',
            icon: 'smile',
        },
        {
            code: 'shopDetail',
            path: '/storeMng/shopDetail',
            name: '门店信息',
            locale: 'menu.storeMng.shopDetail',
            icon: 'smile',
        },
      ],
    },
    {
        code: 'businessMng',
        path: '/businessMng',
        name: '经营管理',
        locale: 'menu.businessMng',
        icon: 'businessMng',
        children: [
            {
                code: 'reportList',
                path: '/businessMng/reportList',
                name: '经营报表',
                locale: 'menu.businessMng.reportList',
                icon: 'smile',
            },
            {
                code: 'rankList',
                path: '/businessMng/rankList',
                name: '排行榜',
                locale: 'menu.businessMng.rankList',
                icon: 'smile',
            },
        ],
    },
  
    // {
    //   path: '/dashboard',
    //   name: '面板',
    //   locale: 'menu.dashboard',
    //   icon: 'heart',
    // },
    // {
    //   path: '/project',
    //   name: 'Project',
    //   icon: 'smile',
    //   locale: 'menu.project',
    //   children: [
    //     {
    //       path: '/project/list',
    //       name: 'Project List',
    //       locale: 'menu.project.list',
    //       icon: 'smile',
    //     },
    //   ],
    // },
    // {
    //   path: '/permission',
    //   name: 'permission',
    //   locale: 'menu.permission',
    //   icon: 'smile',
    //   children: [
    //     {
    //       path: '/permission/list',
    //       name: 'permission list',
    //       locale: 'menu.permission.list',
    //       icon: 'smile',
    //     },
    //   ],
    // },
    {
      path: '/404',
      name: '404',
      locale: 'menu.notfound',
      icon: 'frown',
    }
  
  ]
  