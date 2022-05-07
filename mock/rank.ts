import { MockMethod } from 'vite-plugin-mock';
const rankList = [];
for (let i = 0; i < 8; i++) {
  rankList.push({
    "id": i,
    "rankNum": i,
    "cityName": `武汉${i}`,
    "shopName": `江汉路店${i}`,
    "shoperManagerName": `张秋红${i}`,
    "shoperManagerAvatar": "http://gh-fe.gsxcdn.com/static/image/book-video/wenzhang.png",
  });
}
const mockQueryRankResp = {
    "status": 200,
    "msg": null,
    "total": 1000,
    "pages": 1,
    "success": true,
    // data: rankList,
    "data|9-10": [
      {
        "id": "@id",
        "rankNum|+1": 1,
        "cityName": "@city",
        "shopName": "@region",
        "shoperManagerName": "@cname",
        "shoperManagerAvatar": "@image",
      },
      // {
      //   "id": 2,
      //   "rankNum": 3,
      //   "cityName": "无锡",
      //   "shopName": "中心城店",
      //   "shoperManagerName": "全力",
      //   "shoperManagerAvatar": "http://gh-fe.gsxcdn.com/static/image/book-video/wenzhang.png",
      // }
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