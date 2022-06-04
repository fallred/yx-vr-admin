import React, { useState, useEffect } from 'react';
import RcResizeObserver from 'rc-resize-observer';
import { DatePicker, Space } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { PageContainer } from "@ant-design/pro-layout";
import ProCard, { StatisticCard } from '@ant-design/pro-card';
import { QueryFilter, ProFormSelect, ProFormDateRangePicker } from '@ant-design/pro-form';
import {IPerformance, IMember, IEvaluate, IConvert} from '@/models/report-list';
import {useGetShopStoreList} from "@/api";
import {TimeRangeEnum} from '@/models/common';
import {timeRange} from '@/lib/time-range';
import useReportList from './use-hooks/useReportList';

moment.locale("zh-cn");

const { Statistic } = StatisticCard;
const { RangePicker } = DatePicker;

const reportListPage: React.FC<{}> = () => {
  const {data: shopStoreList} = useGetShopStoreList();
  const {
    convertList,
    evaluateList,
    memberList,
    performanceList,
    fetchData
  } = useReportList();
  const [responsive, setResponsive] = useState(false);
  const [dates, setDates] = useState([]);
  const [hackValue, setHackValue] = useState();
  const [dateRangeValue, setDateRangeValue] = useState();
  const [appId, setAppId] = useState<string>('');
  const ranges = {
    [timeRange.getText(TimeRangeEnum.YESTERDAY)]: timeRange.getRange(TimeRangeEnum.YESTERDAY),
    [timeRange.getText(TimeRangeEnum.LAST1MONTH)]: timeRange.getRange(TimeRangeEnum.LAST1MONTH),
  };
  function handleAppIdChange(value) {
  }
  function onChange(dates, dateStrings) {
    console.log('From: ', dates[0], ', to: ', dates[1]);
    console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
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
  useEffect(() => {
    const selectedAppId = shopStoreList?.[0]?.appId;
    setAppId(selectedAppId);
    // handleAppIdChange(selectedAppId);
  }, [shopStoreList]);
  useEffect(() => {
    fetchData([appId]);
  }, [appId]);
  const cardListTpl = reportList?.map(item => {
    const catdItemTpl = item?.list?.map(cardItem => (
      <StatisticCard
        key={cardItem.key}
        statistic={{
          title: cardItem.name,
          value: cardItem.value,
          description: <Statistic title="环比" value={item.link_relative_ratio} trend={item.link_relative_ratio > 0 ? 'up' : 'down'} />,
        }}
      />
    ));
    return (
      <ProCard
          key={item.key}
          title={item.name}
          extra="2019年9月28日"
          split="vertical"
          headerBordered
          bordered
      >
        {catdItemTpl}
      </ProCard>
    );
  });
  return (
    <PageContainer className="report-list">
      <ProCard key="card1" style={{marginBottom: 20}}>
          <QueryFilter
            submitter={false}
            split
          >
            <ProFormSelect
              label="门店"
              value={appId}
              options={shopStoreList}
              onChange={handleAppIdChange}
              fieldProps={{
                fieldNames: {
                  label: 'nm',
                  value: 'appId'
                },
              }}
            />
            <RangePicker
              ranges={ranges}
              // disabledDate={disabledDate}
              // onChange={onChange}
              value={hackValue || dateRangeValue}
              disabledDate={disabledDate}
              onCalendarChange={val => setDates(val)}
              onChange={val => setDateRangeValue(val)}
              onOpenChange={onOpenChange}
            />
            {/* <ProFormDateRangePicker
              name="dateRange"
              label="日期范围:"
              ranges={ranges}
              format="YYYY/MM/DD"
              onChange={onChange}
            /> */}
          </QueryFilter>
        </ProCard>
      {cardListTpl}
    </PageContainer>
  );
};

export default reportListPage;
