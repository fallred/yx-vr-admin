import React, { useState, useEffect, useRef } from 'react';
import RcResizeObserver from 'rc-resize-observer';
import { DatePicker, Space, Form } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { PageContainer } from "@ant-design/pro-layout";
import ProCard, { StatisticCard } from '@ant-design/pro-card';
import ProForm, { QueryFilter, ProFormSelect, ProFormDateRangePicker } from '@ant-design/pro-form';
import { useRecoilValue } from "recoil";
import {IPerformance, IMember, IEvaluate, IConvert} from '@/models/report-list';
import {useGetShopStoreList} from "@/api";
import {TimeRangeEnum} from '@/models/common';
import {timeRange} from '@/lib/time-range';
import { userState } from "@/stores/recoilState";
import useReportList from './use-hooks/useReportList';

moment.locale("zh-cn");

const { Statistic } = StatisticCard;
const { RangePicker } = DatePicker;

const LASTWEEK_RANGE = timeRange.getRange(TimeRangeEnum.LAST1MONTH);
const reportListPage: React.FC<{}> = () => {
  const userInfo = useRecoilValue(userState);
  const {data: shopStoreList} = useGetShopStoreList();
  const {
    convertList,
    evaluateList,
    memberList,
    performanceList,
    fetchData
  } = useReportList();
  const [searchForm] = Form.useForm();
  const searchFormRef = useRef(null);
  const searchFormLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
  };
  const [dates, setDates] = useState([]);
  const [hackValue, setHackValue] = useState();
  const [dateRangeValue, setDateRangeValue] = useState();
  const ranges = {
    [timeRange.getText(TimeRangeEnum.YESTERDAY)]: timeRange.getRange(TimeRangeEnum.YESTERDAY),
    [timeRange.getText(TimeRangeEnum.LAST1MONTH)]: LASTWEEK_RANGE,
  };
  function handleAppIdChange(value) {
  }
  function handleDateRangeChange(dates, dateStrings) {
    console.log('From: ', dates[0], ', to: ', dates[1]);
    console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
    // setDateRangeValue(dates);
    // searchForm.setFieldsValue({
    //   dateRange: dates
    // });
  }
  const disabledDate = current => {
    if (!dates || dates.length === 0) {
      return false;
    }
    const startDate =  dates[0] && current.diff(dates[0], 'days');
    const endDate = dates[1] && dates[1].diff(current, 'days');

    // const tooEarly7 = startDate < 7;
    // const tooLate7 = endDate < 7;

    const tooLate30 = startDate > 30;
    const tooEarly30 = endDate > 30;
    // if (tooLate7) {
    //   return true;
    // }
    if (tooEarly30 || tooLate30) {
      return true;
    }
    return false;
  };
  const onOpenChange = open => {
    if (open) {
      setHackValue([]);
      setDates([]);
    } else {
      setHackValue(undefined);
    }
  };
  const handleSearch = searchData => {
    const {appId, dateRange} = searchData;
    fetchData({
      appIdArr: [appId],
      dateRange
    });
  };
  useEffect(() => {
    const selectedAppId = shopStoreList?.[0]?.appId;
    // setDateRangeValue(LASTWEEK_RANGE);
    console.log('LASTWEEK_RANGE:', LASTWEEK_RANGE);
    searchForm.setFieldsValue({
      appId: selectedAppId,
      dateRange: LASTWEEK_RANGE,
    });
    fetchData({
      appIdArr: [selectedAppId],
      dateRange: LASTWEEK_RANGE
    });
  }, [shopStoreList]);
  const renderConvertTpl = () => {
    const convertListTpl = convertList.map(cardItem => (
      <StatisticCard
        key={cardItem.key}
        className="card-item"
        statistic={{
          title: cardItem.name,
          value: cardItem.value,
          description: <Statistic title="环比" value={cardItem.rate} trend={cardItem.rate > 0 ? 'up' : 'down'} />,
        }}
      />
    ));
    return (
      <ProCard
          key="1"
          title="转化数据"
          extra=""
          split="vertical"
          headerBordered
          bordered
          className="card-list"
      >
        {convertListTpl}
      </ProCard>
    );
  };
  const renderEvaluateTpl = () => {
    const evaluateListTpl = evaluateList.map((cardItem, index) => (
      <StatisticCard
        key={cardItem.key}
        className="card-item"
        statistic={{
          title: cardItem.name,
          value: cardItem.value,
          description: <Statistic title="环比" value={cardItem.rate} trend={cardItem.rate > 0 ? 'up' : 'down'} />,
        }}
      />
    ));
    return (
      <ProCard
          key="2"
          title="评价数据"
          extra=""
          split="vertical"
          className="card-list"
          headerBordered
          bordered
      >
        {evaluateListTpl}
      </ProCard>
    );
  };
  const renderMemberTpl = () => {
    const memberListTpl = memberList.map(cardItem => (
      <StatisticCard
        key={cardItem.key}
        className="card-item"
        statistic={{
          title: cardItem.name,
          value: cardItem.value,
          description: <Statistic title="环比" value={cardItem.rate} trend={cardItem.rate > 0 ? 'up' : 'down'} />,
        }}
      />
    ));
    return (
      <ProCard
          key="3"
          title="会员数据"
          extra=""
          split="vertical"
          className="card-list"
          headerBordered
          bordered
      >
        {memberListTpl}
      </ProCard>
    );
  };
  const renderPerformanceTpl = () => {
    const performanceListTpl = performanceList.map(cardItem => (
      <StatisticCard
        key={cardItem.key}
        className="card-item"
        statistic={{
          title: cardItem.name,
          value: cardItem.value,
          description: <Statistic title="环比" value={cardItem.rate} trend={cardItem.rate > 0 ? 'up' : 'down'} />,
        }}
      />
    ));
    return (
      <ProCard
          key="4"
          title="业绩数据"
          extra=""
          split="vertical"
          className="card-list"
          headerBordered
          bordered
      >
        {performanceListTpl}
      </ProCard>
    );
  };
  return (
    <PageContainer className="report-list">
      <ProCard key="card1" style={{marginBottom: 20}}>
        <QueryFilter
          {...searchFormLayout}
          form={searchForm}
          submitter={true}
          split
          onFinish={handleSearch}
        >
          <ProFormSelect
            name="appId"
            label="门店"
            options={shopStoreList}
            onChange={handleAppIdChange}
            fieldProps={{
              fieldNames: {
                label: 'nm',
                value: 'appId'
              },
            }}
          />
          <ProForm.Item
              name="dateRange"
              width="md"
              label="日期"
              placeholder="请选择日期"
          >
              <RangePicker
                  ranges={ranges}
                  disabledDate={disabledDate}
                  onCalendarChange={val => setDates(val)}
                  onOpenChange={onOpenChange}
                  onChange={handleDateRangeChange}
                  format="YYYY-MM-DD"
                  showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
              />
              {/* <ProFormDateRangePicker
                name="dateRange"
                label="日期范围:"
                ranges={ranges}
                format="YYYY/MM/DD"
                onCalendarChange={val => setDates(val)}
                onChange={val => setDateRangeValue(val)}
                onOpenChange={onOpenChange}
              /> */}
          </ProForm.Item>
        </QueryFilter>
      </ProCard>
      {renderConvertTpl()}
      {renderEvaluateTpl()}
      {renderMemberTpl()}
      {renderPerformanceTpl()}
    </PageContainer>
  );
};

export default reportListPage;
