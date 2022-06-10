import { MockMethod } from 'vite-plugin-mock';
// const rankList = [];
// for (let i = 0; i < 8; i++) {
//   rankList.push({
//     "id": i,
//     "rank": i,
//     "city": `武汉${i}`,
//     "store": `江汉路店${i}`,
//     "manager": `张秋红${i}`,
//     "imageUrl": "http://gh-fe.gsxcdn.com/static/image/book-video/wenzhang.png",
//   });
// }
const mockQueryRankResp = {
    "status": 200,
    "msg": null,
    "total": 1000,
    "pages": 1,
    "success": true,
    "data|9-10": [
      {
        "id": "@id",
        "rank|+1": 1,
        "city": "@city",
        "store": "@region",
        "manager": "@cname",
        "imageUrl": "@image",
      },
      // {
      //   "id": 2,
      //   "rank": 3,
      //   "city": "无锡",
      //   "store": "中心城店",
      //   "manager": "全力",
      //   "imageUrl": "http://gh-fe.gsxcdn.com/static/image/book-video/wenzhang.png",
      // }
    ]
};
export default [
    {
      url: '/mock/app/leaderboard/turnover/list',
      method: 'GET',
      response: ({ body }) => {
        return mockQueryRankResp;
      },
    },
    {
      url: '/mock/app/leaderboard/praise/list',
      method: 'GET',
      response: ({ body }) => {
        return mockQueryRankResp;
      },
    },
    {
      url: '/mock/app/leaderboard/memberconversion/list',
      method: 'GET',
      response: ({ body }) => {
        return mockQueryRankResp;
      },
    },
] as MockMethod[];