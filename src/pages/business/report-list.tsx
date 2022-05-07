import React, { useState, useEffect } from 'react';
import { PageContainer } from "@ant-design/pro-layout";
import ProCard, { StatisticCard } from '@ant-design/pro-card';
import { QueryFilter, ProFormSelect, ProFormDatePicker } from '@ant-design/pro-form';
import RcResizeObserver from 'rc-resize-observer';
import {useGetShopStoreList} from "@/api";

const { Statistic } = StatisticCard;

const reportListPage: React.FC<{}> = () => {
  const {data: shopStoreList} = useGetShopStoreList();
  const [responsive, setResponsive] = useState(false);
  const [appId, setAppId] = useState<string>('');
  function handleAppIdChange(value) {
  }
  useEffect(() => {
    const selectedAppId = shopStoreList?.[0]?.appId;
    setAppId(selectedAppId);
    // handleAppIdChange(selectedAppId);
  }, [shopStoreList]);
  return (
    <PageContainer className="report-list">
      {/* <RcResizeObserver
        key="resize-observer"
        onResize={(offset) => {
          setResponsive(offset.width < 1000);
        }}
      > */}
        <ProCard  key="card1" style={{marginBottom: 20}}>
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
          </QueryFilter>
        </ProCard>
        <ProCard
          key="card2"
          title="业绩数据"
          extra="2019年9月28日"
          split="horizontal"
          headerBordered
          bordered
        >
            <ProCard split="vertical">
              <StatisticCard
                statistic={{
                  title: '昨日全部流量',
                  value: 234,
                  description: <Statistic title="较本月平均流量" value="8.04%" trend="down" />,
                }}
              />
              <StatisticCard
                statistic={{
                  title: '本月累计流量',
                  value: 234,
                  description: <Statistic title="月同比" value="8.04%" trend="up" />,
                }}
              />
            </ProCard>
            <ProCard split="vertical">
              <StatisticCard
                statistic={{
                  title: '运行中实验',
                  value: '12/56',
                  suffix: '个',
                }}
              />
              <StatisticCard
                statistic={{
                  title: '历史实验总数',
                  value: '134',
                  suffix: '个',
                }}
              />
            </ProCard>
        </ProCard>

        <ProCard
          title="会员数据"
          extra="2019年9月28日"
          split="horizontal"
          headerBordered
          bordered
        >
            <ProCard split="vertical">
              <StatisticCard
                statistic={{
                  title: '昨日全部流量',
                  value: 234,
                  description: <Statistic title="较本月平均流量" value="8.04%" trend="down" />,
                }}
              />
              <StatisticCard
                statistic={{
                  title: '本月累计流量',
                  value: 234,
                  description: <Statistic title="月同比" value="8.04%" trend="up" />,
                }}
              />
            </ProCard>
            <ProCard split="vertical">
              <StatisticCard
                statistic={{
                  title: '运行中实验',
                  value: '12/56',
                  suffix: '个',
                }}
              />
              <StatisticCard
                statistic={{
                  title: '历史实验总数',
                  value: '134',
                  suffix: '个',
                }}
              />
            </ProCard>
        </ProCard>
        
        <ProCard
          title="评价数据"
          extra="2019年9月28日"
          split="horizontal"
          headerBordered
          bordered
        >
            <ProCard split="vertical">
              <StatisticCard
                statistic={{
                  title: '昨日全部流量',
                  value: 234,
                  description: <Statistic title="较本月平均流量" value="8.04%" trend="down" />,
                }}
              />
              <StatisticCard
                statistic={{
                  title: '本月累计流量',
                  value: 234,
                  description: <Statistic title="月同比" value="8.04%" trend="up" />,
                }}
              />
            </ProCard>
            <ProCard split="vertical">
              <StatisticCard
                statistic={{
                  title: '运行中实验',
                  value: '12/56',
                  suffix: '个',
                }}
              />
              <StatisticCard
                statistic={{
                  title: '历史实验总数',
                  value: '134',
                  suffix: '个',
                }}
              />
            </ProCard>
        </ProCard>

        <ProCard
          title="转化数据"
          extra="2019年9月28日"
          split="horizontal"
          headerBordered
          bordered
        >
            <ProCard split="vertical">
              <StatisticCard
                statistic={{
                  title: '昨日全部流量',
                  value: 234,
                  description: <Statistic title="较本月平均流量" value="8.04%" trend="down" />,
                }}
              />
              <StatisticCard
                statistic={{
                  title: '本月累计流量',
                  value: 234,
                  description: <Statistic title="月同比" value="8.04%" trend="up" />,
                }}
              />
            </ProCard>
            <ProCard split="vertical">
              <StatisticCard
                statistic={{
                  title: '运行中实验',
                  value: '12/56',
                  suffix: '个',
                }}
              />
              <StatisticCard
                statistic={{
                  title: '历史实验总数',
                  value: '134',
                  suffix: '个',
                }}
              />
            </ProCard>
        </ProCard>
      {/* </RcResizeObserver> */}
    </PageContainer>
  );
};

export default reportListPage;
