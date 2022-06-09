import { MockMethod } from 'vite-plugin-mock';

const mockQueryProvinceList = [
    {
      "id": 1,
      "code": "110000",
      "name": "北京市"
    },
    {
      "id": 2,
      "code": "120000",
      "name": "天津市"
    },
    {
      "id": 3,
      "code": "130000",
      "name": "河北省"
    },
    {
      "id": 4,
      "code": "140000",
      "name": "山西省"
    },
    {
      "id": 5,
      "code": "150000",
      "name": "内蒙古"
    },
    {
      "id": 6,
      "code": "210000",
      "name": "辽宁省"
    },
    {
      "id": 7,
      "code": "220000",
      "name": "吉林省"
    },
    {
      "id": 8,
      "code": "230000",
      "name": "黑龙江"
    },
    {
      "id": 9,
      "code": "310000",
      "name": "上海市"
    },
    {
      "id": 10,
      "code": "320000",
      "name": "江苏省"
    },
    {
      "id": 11,
      "code": "330000",
      "name": "浙江省"
    },
    {
      "id": 12,
      "code": "340000",
      "name": "安徽省"
    },
    {
      "id": 13,
      "code": "350000",
      "name": "福建省"
    },
    {
      "id": 14,
      "code": "360000",
      "name": "江西省"
    },
    {
      "id": 15,
      "code": "370000",
      "name": "山东省"
    },
    {
      "id": 16,
      "code": "410000",
      "name": "河南省"
    },
    {
      "id": 17,
      "code": "420000",
      "name": "湖北省"
    },
    {
      "id": 18,
      "code": "430000",
      "name": "湖南省"
    },
    {
      "id": 19,
      "code": "440000",
      "name": "广东省"
    },
    {
      "id": 20,
      "code": "450000",
      "name": "广  西"
    },
    {
      "id": 21,
      "code": "460000",
      "name": "海南省"
    },
    {
      "id": 22,
      "code": "500000",
      "name": "重庆市"
    },
    {
      "id": 23,
      "code": "510000",
      "name": "四川省"
    },
    {
      "id": 24,
      "code": "520000",
      "name": "贵州省"
    },
    {
      "id": 25,
      "code": "530000",
      "name": "云南省"
    },
    {
      "id": 26,
      "code": "540000",
      "name": "西  藏"
    },
    {
      "id": 27,
      "code": "610000",
      "name": "陕西省"
    },
    {
      "id": 28,
      "code": "620000",
      "name": "甘肃省"
    },
    {
      "id": 29,
      "code": "630000",
      "name": "青海省"
    },
    {
      "id": 30,
      "code": "640000",
      "name": "宁  夏"
    },
    {
      "id": 31,
      "code": "650000",
      "name": "新  疆"
    },
    {
      "id": 32,
      "code": "710000",
      "name": "台湾省"
    },
    {
      "id": 33,
      "code": "810000",
      "name": "香  港"
    },
    {
      "id": 34,
      "code": "820000",
      "name": "澳  门"
    }
];

const mockQueryCityList = [
    {
      "id": 169,
      "code": "420100",
      "name": "武汉市",
      "provincecode": "420000"
    },
    {
      "id": 170,
      "code": "420200",
      "name": "黄石市",
      "provincecode": "420000"
    },
    {
      "id": 171,
      "code": "420300",
      "name": "十堰市",
      "provincecode": "420000"
    },
    {
      "id": 172,
      "code": "420500",
      "name": "宜昌市",
      "provincecode": "420000"
    },
    {
      "id": 173,
      "code": "420600",
      "name": "襄樊市",
      "provincecode": "420000"
    },
    {
      "id": 174,
      "code": "420700",
      "name": "鄂州市",
      "provincecode": "420000"
    },
    {
      "id": 175,
      "code": "420800",
      "name": "荆门市",
      "provincecode": "420000"
    },
    {
      "id": 176,
      "code": "420900",
      "name": "孝感市",
      "provincecode": "420000"
    },
    {
      "id": 177,
      "code": "421000",
      "name": "荆州市",
      "provincecode": "420000"
    },
    {
      "id": 178,
      "code": "421100",
      "name": "黄冈市",
      "provincecode": "420000"
    },
    {
      "id": 179,
      "code": "421200",
      "name": "咸宁市",
      "provincecode": "420000"
    },
    {
      "id": 180,
      "code": "421300",
      "name": "随州市",
      "provincecode": "420000"
    },
    {
      "id": 181,
      "code": "422800",
      "name": "恩施土家族苗族自治州",
      "provincecode": "420000"
    },
    {
      "id": 182,
      "code": "429000",
      "name": "省直辖行政单位",
      "provincecode": "420000"
    }
];

const mockQueryAreaList = [
    {
      "id": 1682,
      "code": "420102",
      "name": "江岸区",
      "citycode": "420100"
    },
    {
      "id": 1683,
      "code": "420103",
      "name": "江汉区",
      "citycode": "420100"
    },
    {
      "id": 1684,
      "code": "420104",
      "name": "乔口区",
      "citycode": "420100"
    },
    {
      "id": 1685,
      "code": "420105",
      "name": "汉阳区",
      "citycode": "420100"
    },
    {
      "id": 1686,
      "code": "420106",
      "name": "武昌区",
      "citycode": "420100"
    },
    {
      "id": 1687,
      "code": "420107",
      "name": "青山区",
      "citycode": "420100"
    },
    {
      "id": 1688,
      "code": "420111",
      "name": "洪山区",
      "citycode": "420100"
    },
    {
      "id": 1689,
      "code": "420112",
      "name": "东西湖区",
      "citycode": "420100"
    },
    {
      "id": 1690,
      "code": "420113",
      "name": "汉南区",
      "citycode": "420100"
    },
    {
      "id": 1691,
      "code": "420114",
      "name": "蔡甸区",
      "citycode": "420100"
    },
    {
      "id": 1692,
      "code": "420115",
      "name": "江夏区",
      "citycode": "420100"
    },
    {
      "id": 1693,
      "code": "420116",
      "name": "黄陂区",
      "citycode": "420100"
    },
    {
      "id": 1694,
      "code": "420117",
      "name": "新洲区",
      "citycode": "420100"
    }
];

const mockUploadResp = {
	"data": {},
	"msg": "",
	"pages": 0,
	"status": 0,
	"success": false,
	"total": 0
};
export default [
    {
        url: '/mock/app/area/province',
        method: 'GET',
        response: ({ body }) => {
            return mockQueryProvinceList;
        },
    },
    {
        url: '/mock/app/area/city',
        method: 'GET',
        response: ({ body }) => {
            return mockQueryCityList;
        },
    },
    {
        url: '/mock/app/area/area',
        method: 'GET',
        response: ({ body }) => {
        return mockQueryAreaList;
        },
    },
    {
      url: '/mock/app/file/upload',
      method: 'POST',
      response: ({ body }) => {
        return mockUploadResp;
      },
  },
] as MockMethod[];

