import React, { useEffect, useRef, useState } from "react";
import { PageContainer } from "@ant-design/pro-layout";
import type { ProColumns, ActionType } from "@ant-design/pro-table";
import ProTable from '@ant-design/pro-table';
import {IRank} from '@/models/rank';
import { useGetRankList } from "@/api";

const RankListPage: React.FC<{}> = () => {
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
      title: '角色名',
      dataIndex: "name",
      tip: "请输入角色名",
    },
    {
      title: '角色描述',
      dataIndex: "comment",
      valueType: "textarea",
    },
    {
      title: formatMessage({ id: "gloabal.tips.operation" }),
      dataIndex: "option",
      valueType: "option",
      render: (_, record) => {
        const btnList = [
          <AuthLink
            key={PageFuncEnum.EDIT}
            operCode={PageFuncEnum.EDIT}
            onClick={(e) => {
              e.preventDefault();
              showEditModal(record);
            }}
          >
            编辑
          </AuthLink>,
          <AuthLink
            key={PageFuncEnum.DELETE}
            operCode={PageFuncEnum.DELETE}
            onClick={(e) => {
              e.preventDefault();
              Modal.confirm({
                title: "删除角色",
                content: "确定删除该角色吗？",
                okText: "确认",
                cancelText: "取消",
                onOk: async () => {
                  await handleRemove([{ ...record }]);
                  setSelectedRows([]);
                  refetch();
                },
              });
            }}
          >
            删除
          </AuthLink>,
        ];
        return btnList;
      },
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
    <PageContainer className="rank-list">
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
    </PageContainer>
  );
};

export default RankListPage;
