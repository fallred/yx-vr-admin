import { MockMethod } from 'vite-plugin-mock';

const mockQueryUserResp = {
    "status": 200,
    "msg": null,
    "total": 4,
    "pages": 1,
    "success": true,
    "data": [
      {
        "id": 1,
        "username": "admin56789",
        "realName": "admin",
        "password": "a2b0f4bc3a602e85acac0d3c9ce89480",
        "mobile": null,
        "email": null,
        "companyName": null,
        "attention": null,
        "identityType": 0,
        "remark": null,
        "status": 0,
        "createDate": "2020-04-17 14:07:09",
        "loginDate": "2022-04-24 21:03:29",
        "imageUrl": null,
        "loginIp": "171.113.232.71",
        "roleId": 1,
        "roleNm": "超级管理员",
        "appId": null,
        "apps": null
      },
      {
        "id": 63,
        "username": "18627107089",
        "realName": "shuwei",
        "password": "a2b0f4bc3a602e85acac0d3c9ce89480",
        "mobile": "",
        "email": "",
        "companyName": "",
        "attention": "",
        "identityType": 0,
        "remark": "",
        "status": 0,
        "createDate": "2021-07-27 09:04:04",
        "loginDate": "2022-04-24 22:22:29",
        "imageUrl": "",
        "loginIp": "183.95.50.208",
        "roleId": 25,
        "roleNm": "普通角色",
        "appId": null,
        "apps": null
      },
      {
        "id": 65,
        "username": "18062970176",
        "realName": "quanli",
        "password": "33eec87341accdb6ce4b8aff12e7e488",
        "mobile": "",
        "email": "",
        "companyName": "",
        "attention": "",
        "identityType": 0,
        "remark": "",
        "status": 0,
        "createDate": "2022-04-21 10:34:42",
        "loginDate": null,
        "imageUrl": "",
        "loginIp": "220.181.41.2",
        "roleId": 25,
        "roleNm": "普通角色",
        "appId": null,
        "apps": null
      },
      {
        "id": 64,
        "username": "18062979506",
        "realName": "zhangqiuhong",
        "password": "33eec87341accdb6ce4b8aff12e7e488",
        "mobile": "",
        "email": "fallred@sina2.com",
        "companyName": "",
        "attention": "",
        "identityType": 0,
        "remark": "",
        "status": 0,
        "createDate": "2022-04-21 10:19:29",
        "loginDate": null,
        "imageUrl": "",
        "loginIp": "220.181.41.2",
        "roleId": null,
        "roleNm": null,
        "appId": null,
        "apps": null
      }
    ]
};

const mockQueryUserInfo = {
    "status": 200,
    "msg": "查询成功",
    "total": 0,
    "pages": 0,
    "success": true,
    "data": {
        "id": 1,
        "username": "admin56789",
        "realName": "admin",
        "password": "a2b0f4bc3a602e85acac0d3c9ce89480",
        "mobile": null,
        "email": null,
        "companyName": null,
        "attention": null,
        "identityType": 0,
        "remark": null,
        "status": 0,
        "createDate": "2020-04-17 14:07:09",
        "loginDate": "2022-04-24 21:03:29",
        "imageUrl": null,
        "loginIp": "171.113.232.71",
        "roleId": 1,
        "roleNm": "超级管理员",
        "appId": "vr2037_00000,vr2037_00001",
        "apps": [
        {
            "appId": "vr2037_00000",
            "nm": "xxxx店",
            "province": null,
            "city": null,
            "district": null,
            "address": null,
            "franchisee": null,
            "manager": null,
            "status": null,
            "grade": null,
            "partner": null,
            "tm": "2022-04-12 10:46:59",
            "code": "vr_0000"
        },
        {
            "appId": "vr2037_00001",
            "nm": "xxxx店",
            "province": null,
            "city": null,
            "district": null,
            "address": null,
            "franchisee": null,
            "manager": null,
            "status": null,
            "grade": null,
            "partner": null,
            "tm": "2022-04-12 10:46:59",
            "code": "vr_0001"
        }
        ]
    }
};
const mockUpdateUserResp = {
    "data": {},
    "msg": "",
    "status":200,
    "success": true,
};
const mockCreateUserResp = {
    "data": {},
    "msg": "",
    "status":200,
    "success": true,
};

export default [
  {
    url: '/manage/user/query',
    method: 'GET',
    response: ({ body }) => {
      return mockQueryUserResp;
    },
  },
  {
    url: '/manage/user/query/one',
    method: 'GET',
    response: ({ body }) => {
      return mockQueryUserInfo;
    },
  },
  {
    url: '/manage/user/edit',
    method: 'POST',
    response: ({ body }) => {
      return mockUpdateUserResp;
    },
  },
  {
    url: '/manage/user/create',
    method: 'POST',
    response: ({ body }) => {
      return mockCreateUserResp;
    },
  },
  {
    url: '/manage/user/delete',
    method: 'POST',
    response: ({ body }) => {
       return {
            "data": {},
            "msg": "",
            "status": 200,
            "success": true,
        };
    },
  },
  {
    url: '/manage/user/app',
    method: 'POST',
    response: ({ body }) => {
        return {
            "data": {},
            "msg": "",
            "status": 200,
            "success": true,
        };
    },
  },
] as MockMethod[];
