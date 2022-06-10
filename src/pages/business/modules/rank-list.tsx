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
    const [filters, setFilters] = useState<IRank>({});
    const [rankList, setRankList] = useState<IRank[]>([]);
    const [pagination, setPagination] = useState<Partial<PaginationProps>>({
        current: 1,
        pageSize: 10,
        total: 0,
    });
    const getRankListPromise = useGetRankList(type,  {completeRes: true});
    
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
    const fetchRank = async (page: number, isReset: boolean) => {
      const rankResp = await getRankListPromise({
        page,
        rows: pagination.pageSize,
        ...filters,
      });
      let rList = [];
      if (isReset) {
        rList = rankResp?.data;
      }
      else {
        rList = rankList?.concat(rankResp?.data);
      }
      rList.sort((a, b) => {
        if (a.rankNum < b.rankNum) {
          return -1;
        } else if (a.rankNum == b.rankNum) {
          return 0;
        } else {
          return 1;
        }
      });
      setRankList(rList);
      setPagination({
        ...pagination,
        total: rankResp?.total,
        current: page,
        showQuickJumper: true,
      });
    };
    useEffect(() => {
      fetchRank(1, true);
    }, [type]);

    function handleNext() {
      fetchRank(pagination.current + 1, false);
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
            hasMore={true}
            loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
            endMessage={<Divider plain>没有更多 🤐</Divider>}
            scrollableTarget="scrollableDiv"
          >
            <List
              dataSource={rankList}
              renderItem={item => {
                const listItemTpl = (
                  <List.Item key={item.id}>
                      <List.Item.Meta
                          avatar={<Avatar size={48} src={item.shoperManagerAvatar} />}
                          title={<div className="rank-item-title"><span className="shopName">店名:{item.shopName}</span><span className="shoperManagerName">店长:{item.shoperManagerName}</span></div>}
                          description={<div className="rank-item-desp"><span className="cityName">城市名:{item.cityName}</span><span className="rankName">排名:{item.rankNum}</span></div>}
                      />
                  </List.Item>
                );
                let tpl = listItemTpl;
                if(item.rankNum <=3) {
                  tpl = (
                    <Badge.Ribbon text={`排名：${item.rankNum}`} color="red" placement="start">
                      {listItemTpl}
                    </Badge.Ribbon>
                  );
                }
                return tpl;
              }}
            />
        </InfiniteScroll>
    </div>
  );
};

export default RankList;
