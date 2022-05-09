import { MockMethod } from 'vite-plugin-mock';
const mockQueryReportListResp = {
    "status": 200,
    "msg": null,
    "success": true,
    "data": [
        {
           key: '1',
           name: '客流分析',
           list: [
            {
                "key": "1",
                "name": "曝光人数",
                "value": 29000,
                "link_relative_ratio": 5,
              },
              {
                "key": "2",
                "name": "访问人数",
                "value": 2713,
                "link_relative_ratio": -16,
              },
              {
                "key": "3",
                "name": "下单人数",
                "value": 1200,
                "link_relative_ratio": -16,
              },
              {
                "key": "4",
                "name": "到店消费人数",
                "value": 1500,
                "link_relative_ratio": -14,
              },
           ]
        },
        {
            key: '2',
            name: '商品售卖分析',
            list: [
            {
                "key": "21",
                "name": "曝光人数",
                "value": 29000,
                "link_relative_ratio": 5,
            },
            {
                "key": "22",
                "name": "访问人数",
                "value": 2713,
                "link_relative_ratio": -16,
            },
            {
                "key": "23",
                "name": "下单人数",
                "value": 1200,
                "link_relative_ratio": -16,
            },
            {
                "key": "24",
                "name": "到店消费人数",
                "value": 1500,
                "link_relative_ratio": -14,
            },
            ]
        },
        {
            key: '3',
            name: '会员数据',
            list: [
            {
                "key": "1",
                "name": "曝光人数",
                "value": 29000,
                "link_relative_ratio": 5,
            },
            {
                "key": "2",
                "name": "访问人数",
                "value": 2713,
                "link_relative_ratio": -16,
            },
            {
                "key": "3",
                "name": "下单人数",
                "value": 1200,
                "link_relative_ratio": -16,
            },
            {
                "key": "4",
                "name": "到店消费人数",
                "value": 1500,
                "link_relative_ratio": -14,
            },
            ]
        },
        {
            key: '4',
            name: '评价数据',
            list: [
            {
                "key": "1",
                "name": "曝光人数",
                "value": 29000,
                "link_relative_ratio": 5,
            },
            {
                "key": "2",
                "name": "访问人数",
                "value": 2713,
                "link_relative_ratio": -16,
            },
            {
                "key": "3",
                "name": "下单人数",
                "value": 1200,
                "link_relative_ratio": -16,
            },
            {
                "key": "4",
                "name": "到店消费人数",
                "value": 1500,
                "link_relative_ratio": -14,
            },
            ]
        }
    ]
};
export default [
    {
      url: '/api/v1/manage/report/query',
      method: 'GET',
      response: ({ body }) => {
        return mockQueryReportListResp;
      },
    },
] as MockMethod[];
