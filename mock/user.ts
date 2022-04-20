import { MockMethod } from 'vite-plugin-mock';


const mockMenuList = [
  {
    path: '/notification',
    name: '公告',
    locale: 'menu.notification',
    icon: 'notification',
  },
  {
    path: '/system',
    name: '系统管理',
    locale: 'menu.system',
    icon: 'system',
    children: [
      {
        path: '/system/role',
        name: '角色管理',
        locale: 'menu.system.role',
        icon: 'smile',
      },
      {
        path: '/system/user',
        name: '用户管理',
        locale: 'menu.system.user',
        icon: 'smile',
      },
      {
        path: '/system/operateLog',
        name: '操作日志',
        locale: 'menu.system.operateLog',
        icon: 'smile',
      },
      {
        path: '/system/noticeMng',
        name: '公告管理',
        locale: 'menu.system.noticeMng',
        icon: 'smile',
      },
    ],
  },
  {
    path: '/storeMng',
    name: '门店管理',
    locale: 'menu.storeMng',
    icon: 'storeMng',
    children: [
      {
        path: '/storeMng/associate',
        name: '关联人管理',
        locale: 'menu.storeMng.associate',
        icon: 'smile',
      },
      {
        path: '/storeMng/shopList',
        name: '门店管理',
        locale: 'menu.storeMng.shopList',
        icon: 'smile',
      },
      {
        path: '/storeMng/shopDetail',
        name: '门店信息',
        locale: 'menu.storeMng.shopDetail',
        icon: 'smile',
      },
    ],
  },
  {
    path: '/businessMng',
    name: '经营管理',
    locale: 'menu.businessMng',
    icon: 'businessMng',
    children: [
      {
        path: '/businessMng/reportList',
        name: '经营报表',
        locale: 'menu.businessMng.reportList',
        icon: 'smile',
      },
      {
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
    url: '/api/v1/manage/perssion/list',
    method: 'GET',
    response: ({ body }) => {
      return mockPermissionCodeList;
    },
  },

  {
    url: '/api/v1/current/user',
    method: 'get',
    // statusCode: 401,
    response: ({ body }) => {
      return {
        username: 'decker',
        role: 'admin',
      };
    },
  },
  {
    url: '/api/v1/current/menu',
    method: 'get',
    response: ({ body }) => {
      return mockMenuList;
    },
  },
  {
    url: '/api/v1/current/notice',
    method: 'get',
    response: ({ body }) => {
      return mockNoticeList;
    },
  },
] as MockMethod[];

