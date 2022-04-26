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
};

const mockQueryStoreInfo = {
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
};
const mockSubmitStoreResp = {
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
] as MockMethod[];

