import React, { useEffect, useRef, useState } from "react";
import type { ProColumns, ActionType } from "@ant-design/pro-table";
import ProTable from '@ant-design/pro-table';
import { IRank, RankTypeEnum } from '@/models/rank';
import { useGetRankList } from "@/api";

interface RankTableListProps {
    type: RankTypeEnum;
}

const RankTableList: React.FC<RankTableListProps> = props => {
    const { type } = props;
    const [filters, setFilters] = useState<IRank>();
    const [rankList, setRankList] = useState<IRank[]>();
    const [pagination, setPagination] = useState<Partial<PaginationProps>>({
        current: 1,
        pageSize: 10,
        total: 0,
    });
    const { data: rankResp, refetch } = useGetRankList(pagination, filters);
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
    return (
        <ProTable<IRank>
            headerTitle="排行榜"
            rowKey="id"
            // request={() => {
            //   return Promise.resolve({
            //     total: 200,
            //     data: tableListDataSource,
            //     success: true,
            //   });
            // }}
            request={null}
            dataSource={rankList}
            columns={columns}
            pagination={pagination}
            onChange={(pagination, filters, sorter) => {
                setPagination(pagination);
            }}
        />
    );
};

export default RankTableList;
