import React, { FC, useEffect, useRef, useState } from "react";
import { findDOMNode } from "react-dom";
import { useRecoilValue } from "recoil";
import { Button, message, PaginationProps, Space } from "antd";
import { PageContainer } from "@ant-design/pro-layout";
import { QueryFilter, LightFilter, ProFormDatePicker, ProFormText } from '@ant-design/pro-form';
import ProTable, {TableDropdown} from "@ant-design/pro-table";
import type { ProColumns } from "@ant-design/pro-table";
import ProCard from '@ant-design/pro-card';
import { permissionListState } from "@/stores/recoilState";
import {PageFuncEnum} from '@/models/common';
import {useGetLogList} from "@/api";
import {ILogList, ILog} from "@/models/log.interface";
import FormItem from "@/components/form-item";


const OperateLogList = () => {
  const permissionList = useRecoilValue(permissionListState);
  const [logList, setLogList] = useState<ILogList>();
  const [filters, setFilters] = useState<ILog>();
  const [pagination, setPagination] = useState<Partial<PaginationProps>>({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const { data: logListResp, error, isLoading, refetch } = useGetLogList(pagination, filters);
  const columns: ProColumns<ILog>[] = [
    {
      key: 'username',
      title: '用户名',
      dataIndex: "username",
      valueType: "text",
      ellipsis: true,
      width: 150,
    },
    {
      key: 'operation',
      title: '操作日志',
      dataIndex: "operation",
      valueType: "text",
      ellipsis: true,
      width: 300,
    },
    // {
    //   key: 'method',
    //   title: '方法名',
    //   dataIndex: "method",
    //   valueType: "text",
    //   ellipsis: true,
    //   width: 180,
    // },
    // {
    //   key: 'params',
    //   title: '参数',
    //   dataIndex: "params",
    //   valueType: "text",
    //   ellipsis: true,
    //   width: 180,
    // },
    {
      key: 'ip',
      title: 'ip地址',
      dataIndex: "ip",
      valueType: "text",
      width: 150,
    },
    {
      key: 'createDate',
      title: '操作时间',
      dataIndex: 'createDate',
      valueType: 'dateTime',
      width: 150,
    },
  ];
  useEffect(() => {
    setLogList(logListResp?.data);
    setPagination({
      ...pagination,
      total: logListResp?.total,
      showQuickJumper: true,
    });
  }, [logListResp]);

  useEffect(() => {
    refetch();
}, [pagination.current, pagination.pageSize, filters]);
  return (
    <PageContainer>
      <ProTable<ILog>
        headerTitle="操作日志"
        rowKey="id"
        options={{reload: false}}
        request={undefined}
        dataSource={logList}
        columns={columns}
        pagination={pagination}
        onChange={(pagination, filters, sorter) => {
          setPagination(pagination);
        }}
        search={{
          defaultCollapsed: false,
          optionRender: ({ searchText, resetText }, { form }) => [
            <Button
              key="search"
              type="primary"
              onClick={() => {
                setFilters(form?.getFieldsValue());
              }}
            >
              {searchText}
            </Button>,
            <Button
              key="reset"
              onClick={() => {
                form?.resetFields();
              }}
            >
              {resetText}
            </Button>,
          ],
        }}
      />
  </PageContainer>
  );
};

export default OperateLogList;
