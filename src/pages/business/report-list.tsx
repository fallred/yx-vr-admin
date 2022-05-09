import React, { useState, useEffect } from 'react';
import RcResizeObserver from 'rc-resize-observer';
import { PageContainer } from "@ant-design/pro-layout";
import ProCard, { StatisticCard } from '@ant-design/pro-card';
import { QueryFilter, ProFormSelect, ProFormDateRangePicker } from '@ant-design/pro-form';
import {IReportList} from '@/models/report-list';
import {useGetShopStoreList, useGetReportList} from "@/api";

const { Statistic } = StatisticCard;

const reportListPage: React.FC<{}> = () => {
  const {data: shopStoreList} = useGetShopStoreList();
  const getReportListPromise = useGetReportList();
  const [responsive, setResponsive] = useState(false);
  const [appId, setAppId] = useState<string>('');
  const [reportList, setReportList] = useState<IReportList>([]);
  function handleAppIdChange(value) {
  }
  useEffect(() => {
    const selectedAppId = shopStoreList?.[0]?.appId;
    setAppId(selectedAppId);
    // handleAppIdChange(selectedAppId);
  }, [shopStoreList]);
  useEffect(async () => {
    const repList = await getReportListPromise({appId});
    setReportList(repList);
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
            <ProFormDateRangePicker name="dateRange" label="日期范围:" />
          </QueryFilter>
        </ProCard>
      {cardListTpl}
    </PageContainer>
  );
};

export default reportListPage;
