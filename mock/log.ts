import { MockMethod } from 'vite-plugin-mock';

const mockQueryLogResp = {
    "status": 200,
    "msg": "日志查询成功！",
    "total": 167,
    "pages": 1,
    "success": true,
    "data": [
      {
        "id": 1,
        "username": "",
        "operation": "用户登录",
        "method": "com.project.business.controller.auth.AuthController.loginWithAccount",
        "params": "  request: org.apache.shiro.web.servlet.ShiroHttpServletRequest@33642005  accountAuthModel: AccountAuthModel(username=admin56789, password=111111, verifycode=null)",
        "ip": "192.168.37.53",
        "createDate": "2022-04-15 15:55:26"
      },
      {
        "id": 2,
        "username": "admin56789",
        "operation": "查询用户详情信息",
        "method": "com.project.business.controller.manage.SysUserController.details",
        "params": "  str: {\"username\":\"admin56789\",\"password\":\"111111\",\"id\":1}",
        "ip": "192.168.37.53",
        "createDate": "2022-04-15 16:30:38"
      },
      {
        "id": 3,
        "username": "admin56789",
        "operation": "查询用户详情信息",
        "method": "com.project.business.controller.manage.SysUserController.details",
        "params": "  str: {\"username\":\"admin56789\",\"password\":\"111111\",\"id\":1}",
        "ip": "192.168.37.53",
        "createDate": "2022-04-15 16:55:49"
      },
      {
        "id": 4,
        "username": "",
        "operation": "用户登录",
        "method": "com.project.business.controller.auth.AuthController.loginWithAccount",
        "params": "  request: org.apache.shiro.web.servlet.ShiroHttpServletRequest@37926804  accountAuthModel: AccountAuthModel(username=18627107089, password=111111, verifycode=null)",
        "ip": "192.168.37.53",
        "createDate": "2022-04-15 16:59:35"
      },
      {
        "id": 5,
        "username": "",
        "operation": "用户登录",
        "method": "com.project.business.controller.auth.AuthController.loginWithAccount",
        "params": "  request: org.apache.shiro.web.servlet.ShiroHttpServletRequest@2c3e003d  accountAuthModel: AccountAuthModel(username=18627107089, password=111111, verifycode=null)",
        "ip": "192.168.37.53",
        "createDate": "2022-04-15 18:35:41"
      },
      {
        "id": 6,
        "username": "18627107089",
        "operation": "查询用户详情信息",
        "method": "com.project.business.controller.manage.SysUserController.details",
        "params": "  str: {\"id\":63}",
        "ip": "192.168.37.53",
        "createDate": "2022-04-15 18:37:17"
      },
      {
        "id": 7,
        "username": "",
        "operation": "用户登录",
        "method": "com.project.business.controller.auth.AuthController.loginWithAccount",
        "params": "  request: org.apache.shiro.web.servlet.ShiroHttpServletRequest@3e6baa82  accountAuthModel: AccountAuthModel(username=111111, password=18627107089, verifycode=)",
        "ip": "0:0:0:0:0:0:0:1",
        "createDate": "2022-04-16 10:31:36"
      },
      {
        "id": 8,
        "username": "",
        "operation": "用户登录",
        "method": "com.project.business.controller.auth.AuthController.loginWithAccount",
        "params": "  request: org.apache.shiro.web.servlet.ShiroHttpServletRequest@13c3b075  accountAuthModel: AccountAuthModel(username=1111111, password=admin56789, verifycode=)",
        "ip": "0:0:0:0:0:0:0:1",
        "createDate": "2022-04-16 10:31:55"
      },
      {
        "id": 9,
        "username": "",
        "operation": "用户登录",
        "method": "com.project.business.controller.auth.AuthController.loginWithAccount",
        "params": "  request: org.apache.shiro.web.servlet.ShiroHttpServletRequest@35fdc3b2  accountAuthModel: AccountAuthModel(username=18627107089, password=111111, verifycode=)",
        "ip": "0:0:0:0:0:0:0:1",
        "createDate": "2022-04-16 10:32:28"
      },
      {
        "id": 10,
        "username": "",
        "operation": "用户登录",
        "method": "com.project.business.controller.auth.AuthController.loginWithAccount",
        "params": "  request: org.apache.shiro.web.servlet.ShiroHttpServletRequest@52810ae5  accountAuthModel: AccountAuthModel(username=18627107089, password=111111, verifycode=)",
        "ip": "0:0:0:0:0:0:0:1",
        "createDate": "2022-04-16 15:44:42"
      }
    ]
};

const mockQueryLogInfo = {
    "id": 1,
    "username": "",
    "operation": "用户登录",
    "method": "com.project.business.controller.auth.AuthController.loginWithAccount",
    "params": "  request: org.apache.shiro.web.servlet.ShiroHttpServletRequest@33642005  accountAuthModel: AccountAuthModel(username=admin56789, password=111111, verifycode=null)",
    "ip": "192.168.37.53",
    "createDate": "2022-04-15 15:55:26"
};

export default [
  {
    url: '/app/log/query',
    method: 'GET',
    response: ({ body }) => {
      return mockQueryLogResp;
    },
  },
  {
    url: '/app/log/detial',
    method: 'GET',
    response: ({ body }) => {
      return mockQueryLogInfo;
    },
  },
] as MockMethod[];

