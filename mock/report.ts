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

const convertListResp = {
    "status": 200,
    "msg": "查询成功！",
    "total": 0,
    "pages": 0,
    "success": true,
    "data": {
      "exposureNum": 0,
      "exposureNumRate": 0,
      "visitorNum": 0,
      "visitorNumRate": 0,
      "visitorConv": 0,
      "visitorConvRate": 0,
      "orderNum": 0,
      "orderNumRate": 0,
      "orderNumConv": 0,
      "orderNumConvRate": 0,
      "storeNum": 0,
      "storeNumRate": 0
    }
};

const evaluateListResp = {
    "status": 200,
    "msg": "查询成功！",
    "total": 0,
    "pages": 0,
    "success": true,
    "data": {
      "weekEvalNum": null,
      "evalTotal": 0,
      "evalTotalRate": 0,
      "popleNum": 0,
      "popleNumRate": 0,
      "goodTotal": 0,
      "goodNumRate": 0,
      "badTotal": 0,
      "badNumRate": 0,
      "goodProp": 0,
      "goodPropRate": 0,
      "featureNum": 0,
      "featureRate": 0
    }
};


const memberListResp = {
    "status": 200,
    "msg": "查询成功！",
    "total": 0,
    "pages": 0,
    "success": true,
    "data": {
      "memberNum": 0,
      "memberNumRate": 0,
      "memberConv": 0,
      "memberConvRate": 0,
      "consumeNum": 0,
      "consumeNumRate": 0,
      "consumeAmount": 0,
      "consumeAmountRate": 0,
      "rechargeAmount": 0,
      "rechargeAmountRate": 0,
      "rechargeAmountProp": 0,
      "rechargeAmountPropRate": 0
    }
};

const performanceListResp = {
    "status": 200,
    "msg": "查询成功！",
    "total": 0,
    "pages": 0,
    "success": true,
    "data": {
      "mtConsumeAmount": 0,
      "mtConsumeAmountRate": 0,
      "mtTradeAmount": 0,
      "mtTradeAmountRate": 0,
      "tkConsumeAmount": 0,
      "tkConsumeAmountRate": 0,
      "kbConsumeAmount": 0,
      "kbConsumeAmountRate": 0,
      "total": 0,
      "totalRate": 0,
      "holiday": 0,
      "holidayProp": 0,
      "taskAmount": 0,
      "taskAmountProp": 0
    }
};
export default [
    {
      url: '/mock/manage/report/query',
      method: 'GET',
      response: ({ body }) => {
        return mockQueryReportListResp;
      },
    },

    {
        url: '/mock/app/business/convert/list',
        method: 'GET',
        response: ({ body }) => {
          return convertListResp;
        },
    },
    {
        url: '/mock/app/business/evaluate/list',
        method: 'GET',
        response: ({ body }) => {
          return evaluateListResp;
        },
    },
    {
        url: '/mock/app/business/member/list',
        method: 'GET',
        response: ({ body }) => {
          return memberListResp;
        },
    },
    {
        url: '/mock/app/business/performance/list',
        method: 'GET',
        response: ({ body }) => {
          return performanceListResp;
        },
    },

] as MockMethod[];
