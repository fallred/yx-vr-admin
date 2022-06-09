import { MockMethod } from 'vite-plugin-mock';

const mockQueryStoreResp = {
  "status": 200,
  "msg": "门店查询成功！",
  "total": 2,
  "pages": 1,
  "success": true,
  "data": [
    {
      "appId": "vr2037_00000",
      "nm": "xxxx店1",
      "province": 130000,
      "city": 170,
      "district": 1693,
      "address": '湖北省武汉市天祥尚府',
      "franchisee": '高途',
      "manager": '江汉路店长',
      "status": 1,
      "grade": 1,
      "partner": '合作伙伴',
      "tm": "2022-04-12 10:46:59",
      "code": "vr_0000",
      // "manager": "https://gh-fe.oss-cn-beijing.aliyuncs.com/static/image/cms/banner-category.png"
      "managerImage": "https://gtbg-materialcenter-dev.oss-cn-beijing.aliyuncs.com/bf6577cf-fcf6-48f4-b2b0-6ad61a33ba0c.jpg"
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
};

const mockQueryStoreListAllResp = {
  "status": 200,
  "msg": "门店查询成功！",
  "total": 0,
  "pages": 0,
  "success": true,
  "data": [
    {
      "appId": "vr2037_00000",
      "nm": "xxxx店1",
      "province": 1,
      "city": 10,
      "district": 101,
      "address": '湖北省武汉市天祥尚府',
      "franchisee": '高途',
      "manager": '江汉路店长',
      "status": 1,
      "grade": 1,
      "partner": '合作伙伴',
      "tm": "2022-04-12 10:46:59",
      "code": "vr_0000",
      // "manager": "https://gh-fe.oss-cn-beijing.aliyuncs.com/static/image/cms/banner-category.png"
      "managerImage": "https://gtbg-materialcenter-dev.oss-cn-beijing.aliyuncs.com/bf6577cf-fcf6-48f4-b2b0-6ad61a33ba0c.jpg"
    },
    {
      "appId": "vr2037_00001",
      "nm": "xxxx店2",
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
};

const mockQueryStoreInfo = {
  "appId": "vr2037_00000",
  "nm": "xxxx店",
  "province": '湖北省',
  "city": '武汉市',
  "district": '东湖高新区',
  "address": '天祥尚府',
  "franchisee": null,
  "manager": null,
  "status": null,
  "grade": null,
  "partner": null,
  "tm": "2022-04-12 10:46:59",
  "code": "vr_0000"
};
const mockSubmitStoreResp = {
    "data": {},
    "msg": "",
    "status":200,
    "success": true,
};

const mockImportTplLink = {
  "status": 200,
  "msg": "查询成功",
  "total": 0,
  "pages": 0,
  "success": true,
  "data": "http://1.13.20.201:9000/template/门店信息模板.xlsx"
};

const mockImportStoreResp = {
  "data": {},
  "msg": "",
  "status":200,
  "success": true,
};

const mockExportStoreResp = {
  "data": {},
  "msg": "",
  "status":200,
  "success": true,
};

export default [
  {
    url: '/api/v1/app/store/query',
    method: 'GET',
    response: ({ body }) => {
      return mockQueryStoreResp;
    },
  },
  {
    url: '/api/v1/app/store/list',
    method: 'GET',
    response: ({ body }) => {
      return mockQueryStoreListAllResp;
    },
  },
  {
    url: '/api/v1/app/store/detial',
    method: 'GET',
    response: ({ body }) => {
      return mockQueryStoreInfo;
    },
  },
  {
    url: '/api/v1/manage/store/edit',
    method: 'POST',
    response: ({ body }) => {
      return mockSubmitStoreResp;
    },
  },
  {
    url: '/api/v1/manage/store/create',
    method: 'POST',
    response: ({ body }) => {
      return mockSubmitStoreResp;
    },
  },
  {
    url: '/api/v1/manage/store/delete',
    method: 'POST',
    response: ({ body }) => {
       return mockSubmitStoreResp;
    },
  },
  {
    url: '/api/v1/app/store/template',
    method: 'GET',
    response: ({ body }) => {
       return mockImportTplLink;
    },
  },
  {
    url: '/api/v1/app/store/import',
    method: 'POST',
    response: ({ body }) => {
       return mockImportStoreResp;
    },
  },
  {
    url: '/api/v1/app/store/export',
    method: 'GET',
    response: ({ body }) => {
       return mockExportStoreResp;
    },
  },
] as MockMethod[];

