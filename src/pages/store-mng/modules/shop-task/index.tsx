import React, { FC, useEffect, useRef, useState } from "react";
import { findDOMNode } from "react-dom";
import { useRecoilValue } from "recoil";
import {
    Form, Button, message, Modal,
    PaginationProps, Space, Input
} from "antd";
import { FooterToolbar } from "@ant-design/pro-layout";
import type { ProFormInstance, ProColumns, ActionType } from '@ant-design/pro-components';
import {
    ProForm,
    QueryFilter, LightFilter,
    ProFormDatePicker, ProFormText,
    ProTable, TableDropdown
} from '@ant-design/pro-components';
import moment from 'moment';
import { LocaleFormatter, useLocale } from "@/locales";
import { permissionListState } from "@/stores/recoilState";
import {PageFuncEnum, SexEnum} from '@/models/common';
import {PageFuncMap} from '@/enums/common';
import {dateFormat, dateMonthFormat} from '@/lib/common';
import {
    useGetShopTaskList,
    useAddShopTask,
    useUpdateShopTask
} from "@/api";
import WrapAuth from '@/components/wrap-auth/index';
import { IShopTask } from "@/models/shop-task";
import TaskFormDrawer from "./task-form";

interface IShopTaskListProps {
    appId: string;
    filterType: string;
}
const ShopTaskTableList: FC<IShopTaskListProps> = (props = {filterType: 'light'}) => {
  const {filterType, appId} = props;
  const permissionList = useRecoilValue(permissionListState);
  const { formatMessage } = useLocale();
  const formRef = useRef<ProFormInstance<IShopTask>>();
  const actionRef = useRef<ActionType>();
  const pcdRef = useRef<React.Component>(null);
  const [visible, setVisible] = useState<boolean>(false);
  const [shopTaskList, setShopTaskList] = useState<IShopTask[]>();
  const [keyword, setKeyword] = useState<string>('');
  const [selectedRowsState, setSelectedRows] = useState<IShopTask[]>([]);
  const [filters, setFilters] = useState<IShopTask[]>({appId});
  const [current, setCurrent] = useState<Partial<IShopTask> | undefined>(
    undefined
  );
  const [pagination, setPagination] = useState<Partial<PaginationProps>>({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const { data: shopTaskPageResp, error, isLoading, refetch } = useGetShopTaskList(pagination, filters);
  const { mutateAsync: addShopTaskMutate } = useAddShopTask();
  const { mutateAsync: updateShopTaskMutate } = useUpdateShopTask();
  useEffect(() => {
    setShopTaskList(shopTaskPageResp?.data);
    setPagination({
      ...pagination,
      total: shopTaskPageResp?.total,
      showQuickJumper: true,
    });
  }, [shopTaskPageResp]);

  useEffect(() => {
    refetch();
  }, [pagination.current, pagination.pageSize, filters]);

  useEffect(()=> {
    setFilters({appId});
  }, [appId]);
  const showAddModal = () => {
    setVisible(true);
    setCurrent(undefined);
  };
  const showEditModal = (item: IShopTask) => {
    setVisible(true);
    setCurrent(item);
  };
  const handleDrawerCancel = () => {
    setVisible(false);
  };
  const addShopTask = async (data: IShopTask) => {
    await addShopTaskMutate(data);
  };
  const updateShopTask = async (data: IShopTask) => {
    await updateShopTaskMutate(data);
  };
  const handleDrawerFormSubmit = async (row: IShopTask) => {
    const {tm, ...rest} = row;
    const idTemp = current && current.id ? current.id : void 0;
    const tmTemp = tm ? dateFormat(tm) : null;
    const rowTemp = {
      ...rest,
      appId,
      id: idTemp,
      tm: tmTemp,
    };
    setVisible(false);
    const hide = message.loading("正在添加/更新");
    try {
      if (!idTemp) {
        // await addShopTask({taskAmount: [rowTemp]});
        await addShopTask([rowTemp]);
      }
      else {
        await updateShopTask([rowTemp]);
      }
      hide();
      message.success("操作成功");
      refetch();
      return true;
    } catch (error) {
      hide();
      message.error("操作失败请重试！");
      return false;
    }
  };
  function YgSpan(props1) {
    return (
     <a
      {...props1}
    >
      {props1.children}
    </a>
    );
  }
  const AuthLink = WrapAuth(YgSpan, permissionList);
  const AuthButton = WrapAuth(Button, permissionList);
  const columns: ProColumns<IShopTask>[] = [
    // {
    //   title: '门店编号',
    //   dataIndex: "appId",
    //   tip: "请输入门店编号",
    // },
    {
      title: '任务量',
      dataIndex: "taskAmount",
      tip: "请输入任务量",
    //   valueType: "textarea",
    },
    {
        title: '日期',
        width: 180,
        key: 'tm',
        dataIndex: 'tm',
        valueType: 'date',
        ellipsis: true,
        // renderText: text => {
        //   return text;
        // },
        hideInSearch: false,
        render: dateMonthFormat,
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
        ];
        return btnList;
      },
    },
  ];
  return (
    <>
      <ProTable<IShopTask>
        rowKey="id"
        headerTitle="月度任务"
        actionRef={actionRef}
        options={{ reload: true }}
        toolBarRender={() => [
          <AuthButton
            type="primary"
            key="primary"
            onClick={showAddModal}
            operCode={PageFuncEnum.ADD}
        >
            {PageFuncMap.get(PageFuncEnum.ADD)}
          </AuthButton>,
        ]}
        request={(params, sorter, filter) => {
            console.log(params, sorter, filter);
            // setFilters(params);
            refetch();
        }}
        // request={undefined}
        dataSource={shopTaskList}
        columns={columns}
        pagination={pagination}
        // dateFormatter={(value, valueType) => {
        //   console.log('====>', value, valueType);
        //   return dateFormat(value);
        // }}
        onChange={(pagination, filters, sorter) => {
          setPagination(pagination);
        }}
        // rowSelection={{
        //   onChange: (_, selectedRows) => {
        //     setSelectedRows(selectedRows);
        //   },
        // }}
        search={{
          filterType,
          defaultCollapsed: false,
          // optionRender: ({ searchText, resetText }, { form }) => [
          //   <Button
          //     key="search"
          //     type="primary"
          //     onClick={() => {
          //       // form?.submit();
          //       console.log("search submit");
          //       setFilters(form?.getFieldsValue());
          //     }}
          //   >
          //     {searchText}
          //   </Button>,
          //   <Button
          //     key="reset"
          //     onClick={() => {
          //       form?.resetFields();
          //     }}
          //   >
          //     {resetText}
          //   </Button>,
          // ],
        }}
      />
      
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              <span>已选择</span>
              <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a>
              <span>项</span>
            </div>
          }
        >
          <AuthButton
            type="primary"
            key="primary"
            onClick={async () => {
                await handleRemove(selectedRowsState);
                setSelectedRows([]);
                refetch();
            }}
            operCode={PageFuncEnum.DELETE}
          >
            {PageFuncMap.get(PageFuncEnum.DELETE)}
          </AuthButton>,
        </FooterToolbar>
      )}
      {
        visible
        ? <TaskFormDrawer
          current={current}
          visible={visible}
          onCancel={handleDrawerCancel}
          onSubmit={handleDrawerFormSubmit}
        />
        : null
      }
    </>
  );
};

export default ShopTaskTableList;