import { MockMethod } from 'vite-plugin-mock';

const mockQueryNoticeResp = {
    "status": 200,
    "msg": "公告查询成功！",
    "total": 100,
    "pages": 1,
    "success": true,
    "data|9-10": [
      {
        "id": "@id",
        "title": "@ctitle",
        "content": "@ctitle",
        "tm": "2022-04-25 21:55:55",
        "author": "admin567891"
      },
    ]
};

const mockQueryNoticeInfo = {
    "id": 1,
    "title": "想和你做朋友",
    "content": "测试一下1",
    "tm": "2022-04-25 21:55:55",
    "author": "admin56789"
};
const mockSubmitResp = {
    "data": {},
    "msg": "",
    "status":200,
    "success": true,
};


export default [
    {
      url: '/api/v1/app/notice/query',
      method: 'GET',
      response: ({ body }) => {
        return mockQueryNoticeResp;
      },
    },
    {
      url: '/api/v1/app/notice/detial',
      method: 'GET',
      response: ({ body }) => {
        return mockQueryNoticeInfo;
      },
    },
    {
      url: '/api/v1/app/notice/edit',
      method: 'POST',
      response: ({ body }) => {
        return mockSubmitResp;
      },
    },
    {
      url: '/api/v1/app/notice/create',
      method: 'POST',
      response: ({ body }) => {
        return mockSubmitResp;
      },
    },
    {
      url: '/api/v1/app/notice/delete',
      method: 'POST',
      response: ({ body }) => {
         return mockSubmitResp;
      },
    },
  ] as MockMethod[];
  
  