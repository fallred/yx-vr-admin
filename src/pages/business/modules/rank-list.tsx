import React, { useEffect, useRef, useState } from "react";
import { List, message, Avatar, Skeleton, Divider, Badge } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import type { ProColumns, ActionType } from "@ant-design/pro-table";
import ProTable from '@ant-design/pro-table';
import { IRank, RankTypeEnum } from '@/models/rank';
import { useGetRankList } from "@/api";

interface RankTableListProps {
    type: RankTypeEnum;
}

const RankList: React.FC<RankTableListProps> = props => {
    const { type } = props;
    const [filters, setFilters] = useState<IRank>();
    const [rankList, setRankList] = useState<IRank[]>();
    const [pagination, setPagination] = useState<Partial<PaginationProps>>({
        current: 1,
        pageSize: 10,
        total: 0,
    });
  const { data: rankResp, isLoading, refetch } = useGetRankList(pagination, filters);
  const columns: ProColumns<IRank>[] = [
    {
        title: '排名',
        dataIndex: "rankNum",
    },
    {
        title: '城市',
        dataIndex: "cityName",
        valueType: "text",
    },
    {
        title: '门店',
        dataIndex: "shopName",
        valueType: "text",
    },
    {
        title: '店长',
        dataIndex: "shoperManagerName",
        valueType: "text",
    },
    {
        title: '',
        dataIndex: 'shoperManagerAvatar',
        key: 'shoperManagerAvatar',
        valueType: 'avatar',
        width: 150,
        render: (dom) => (
          <Space>
            <span>{dom}</span>
            <a href="https://github.com/chenshuai2144" target="_blank" rel="noopener noreferrer">
              chenshuai2144
            </a>
          </Space>
        ),
    },
];
  useEffect(() => {
    setRankList(rankResp?.data);
    setPagination({
      ...pagination,
      total: rankResp?.total,
      showQuickJumper: true,
    });
  }, [rankResp]);

  useEffect(() => {
    refetch();
  }, [pagination.current, pagination.pageSize, filters]);
  function handleNext() {
    // setPagination({
    //   ...pagination,
    //   current: 1,
    //   showQuickJumper: true,
    // });
  }
  return (
    <div className="rank-list" id="scrollableDiv">
        {/* <ProTable<IRank>
          headerTitle="排行榜"
          rowKey="id"
          request={null}
          dataSource={rankList}
          columns={columns}
          pagination={pagination}
          onChange={(pagination, filters, sorter) => {
            setPagination(pagination);
          }}
        /> */}
        <InfiniteScroll
            dataLength={rankList?.length ?? 0}
            next={handleNext}
            hasMore={rankList?.length < 10}
            loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
            endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
            scrollableTarget="scrollableDiv"
          >
            <List
              dataSource={rankList}
              renderItem={item => (
                // <Badge.Ribbon text={`排名：${item.rankNum}`} color="red">
                    <List.Item key={item.id}>
                        <List.Item.Meta
                            title={<span>店名：{item.shopName}</span>}
                            description={`城市名：${item.cityName}`}
                        />
                        <List.Item.Meta
                            avatar={<Avatar src={item.shoperManagerAvatar} />}
                            title={<span>店长：{item.shoperManagerName}</span>}
                            description={`排名：${item.rankNum}`}
                        />
                    </List.Item>
                // </Badge.Ribbon>
              )}
            />
        </InfiniteScroll>
    </div>
  );
};

export default RankList;
