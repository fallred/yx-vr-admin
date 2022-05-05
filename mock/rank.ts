import { MockMethod } from 'vite-plugin-mock';
const mockQueryRankResp = {
    "status": 200,
    "msg": null,
    "total": 2,
    "pages": 1,
    "success": true,
    "data": [
      {
        "id": 1,
        "rankNum": 1,
        "cityName": "武汉",
        "shopName": "江汉路店",
        "shoperManagerName": "张秋红",
        "shoperManagerAvatar": "http://gh-fe.gsxcdn.com/static/image/book-video/wenzhang.png",
      },
      {
        "id": 2,
        "rankNum": 3,
        "cityName": "无锡",
        "shopName": "中心城店",
        "shoperManagerName": "全力",
        "shoperManagerAvatar": "http://gh-fe.gsxcdn.com/static/image/book-video/wenzhang.png",
      }
    ]
};
export default [
    {
      url: '/api/v1/manage/rank/query',
      method: 'GET',
      response: ({ body }) => {
        return mockQueryRankResp;
      },
    },
] as MockMethod[];