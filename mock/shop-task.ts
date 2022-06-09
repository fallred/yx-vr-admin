import { MockMethod } from 'vite-plugin-mock';

const mockQueryShopTaskListPageResp = {
  "status": 200,
  "msg": "门店查询成功！",
  "total": 30,
  "pages": 1,
  "success": true,
  "data": [
    {
        "id": 1,
        "appId": "vr2037_00000",
        "taskAmount": 10,
        "tm": "2022-04-12 10:46:59",
    },
    {
        "id": 2,
        "appId": "vr3047_00000",
        "taskAmount": 30,
        "tm": "2022-04-15 10:46:59",
    }
  ]
};
const mockSubmitShopTaskResp = {
    "data": {},
    "msg": "",
    "status":200,
    "success": true,
};

export default [
  {
    url: '/mock/app/store/task/list',
    method: 'GET',
    response: ({ body }) => {
      return mockQueryShopTaskListPageResp;
    },
  },
  {
    url: '/mock/app/store/task/edit',
    method: 'POST',
    response: ({ body }) => {
      return mockSubmitShopTaskResp;
    },
  },
  {
    url: '/mock/app/store/task/create',
    method: 'POST',
    response: ({ body }) => {
      return mockSubmitShopTaskResp;
    },
  },
] as MockMethod[];

