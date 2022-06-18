import React, { useEffect, useRef, useState } from "react";
import { List, message, Avatar, Skeleton, Divider, Badge } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import type { ProColumns, ActionType } from '@ant-design/pro-components';
import {ProTable} from '@ant-design/pro-components';
import { IRank, RankTypeEnum } from '@/models/rank';
import { useGetRankList } from "@/api";

interface RankTableListProps {
    type: RankTypeEnum;
}

const RankList: React.FC<RankTableListProps> = props => {
    const { type } = props;
    const [filters, setFilters] = useState<IRank>({});
    const [rankList, setRankList] = useState<IRank[]>([]);
    const [localPageNo, setLocalPageNo] = useState<number>(1);
    const [maxPage, setMaxPage] = useState<number>(9999);
    const [pagination, setPagination] = useState<Partial<PaginationProps>>({
      current: 1,
      pageSize: 10,
      total: 0,
    });
    const getRankListPromise = useGetRankList(type,  {completeRes: true});
    
    const columns: ProColumns<IRank>[] = [
      {
          title: '排名',
          dataIndex: "rank",
      },
      {
          title: '城市',
          dataIndex: "city",
          valueType: "text",
      },
      {
          title: '门店',
          dataIndex: "store",
          valueType: "text",
      },
      {
          title: '店长',
          dataIndex: "manager",
          valueType: "text",
      },
      {
          title: '',
          dataIndex: 'city',
          key: 'city',
          valueType: 'avatar',
          width: 150,
          render: (dom) => (
            <Space>
              <span>{dom}</span>
              <a href="" target="_blank" rel="noopener noreferrer">
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
        if (a.rank < b.rank) {
          return -1;
        } else if (a.rank == b.rank) {
          return 0;
        } else {
          return 1;
        }
      });
      setRankList(rList);
      const maxP =  Math.ceil(rankResp?.total / pagination.pageSize);
      setMaxPage(maxP);
      setPagination({
        ...pagination,
        total: rankResp?.total,
        current: page,
        showQuickJumper: true,
      });
    };
    function handleNext() {
      const newPage = pagination.current + 1;
      fetchRank(newPage, false);
      setLocalPageNo(newPage);
    }
    useEffect(() => {
      fetchRank(1, true);
      setLocalPageNo(1);
      setPagination({...pagination, current: 1});
    }, [type]);

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
              hasMore={maxPage > 1 && localPageNo < maxPage}
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
                            avatar={<Avatar size={48} src={item.city} />}
                            title={
                              <div className="rank-item-title">
                                <span className="store">店名:{item.store}</span>
                                <span className="manager">店长:{item.manager || '--'}</span>
                              </div>
                            }
                            description={<div className="rank-item-desp"><span className="city">城市名:{item.city || '--'}</span><span className="rankName">排名:{item.rank}</span></div>}
                        />
                    </List.Item>
                  );
                  let tpl = listItemTpl;
                  if(item.rank <=3) {
                    tpl = (
                      <Badge.Ribbon text={`排名：${item.rank}`} color="red" placement="start">
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
