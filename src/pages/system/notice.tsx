import React, { FC, useEffect, useRef, useState } from "react";
import { findDOMNode } from "react-dom";
import { useRecoilValue } from "recoil";
import { Form, Button, message, Modal, PaginationProps } from "antd";
import type { ProColumns, ActionType } from "@ant-design/pro-table";
import type { ProFormInstance } from '@ant-design/pro-form';
import { FooterToolbar, PageContainer } from "@ant-design/pro-layout";
import { QueryFilter, LightFilter, ProFormDatePicker, ProFormText } from '@ant-design/pro-form';
import ProTable, {TableDropdown} from "@ant-design/pro-table";
import ProCard from '@ant-design/pro-card';
import { LocaleFormatter, useLocale } from "@/locales";
import { permissionListState } from "@/stores/recoilState";
import {PageFuncEnum} from '@/models/common';
import {ShopStoreStatusMap, ShopStoreStatusOptions, PageFuncMap} from '@/enums/common';
import {
  useAddNotice,
  useBatchDeleteNotice,
  useUpdateNotice,
  useQueryNoticeList
} from "@/api";
import WrapAuth from '@/components/wrap-auth/index';
import { INotice, INoticeList } from "@/models/notice-mng";
import OperationDrawer from "./modules/notice/OperationDrawer";

const NoticeTableList = () => {
  const permissionList = useRecoilValue(permissionListState);
 
  const { formatMessage } = useLocale();
  const [noticeList, setNoticeList] = useState<INotice[]>();
  const [filters, setFilters] = useState<INotice>({});
  const [current, setCurrent] = useState<Partial<INotice> | undefined>(
    undefined
  );
  const [pagination, setPagination] = useState<Partial<PaginationProps>>({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const { data: noticeListPageResp, error, isLoading, refetch } = useQueryNoticeList(pagination, filters);
  const [selectedRowsState, setSelectedRows] = useState<INotice[]>([]);

  const [done, setDone] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const addBtn = useRef(null);

  const { mutateAsync } = useAddNotice();
  const { mutateAsync: update } = useUpdateNotice();
  const { mutateAsync: batchDelete } = useBatchDeleteNotice();

  useEffect(() => {
    setNoticeList(noticeListPageResp?.data);
    setPagination({
      ...pagination,
      total: noticeListPageResp?.total,
      showQuickJumper: true,
    });
  }, [noticeListPageResp]);

  useEffect(() => {
    refetch();
  }, [pagination.current, pagination.pageSize, filters]);

  const showModal = () => {
    setVisible(true);
    setCurrent(undefined);
  };

  const showEditModal = (item: INotice) => {
    setVisible(true);
    setCurrent(item);
  };

  const setAddBtnblur = () => {
    if (addBtn.current) {
      const addBtnDom = findDOMNode(addBtn.current) as HTMLButtonElement;
      setTimeout(() => addBtnDom.blur(), 0);
    }
  };

  const handleDone = () => {
    setAddBtnblur();
    setVisible(false);
  };

  const handleCancel = () => {
    setAddBtnblur();
    setVisible(false);
  };

  const addNotice = async (data: INotice) => {
    await mutateAsync(data);
  };
  const updateNotice = async (data: INotice) => {
    await update(data);
  };
  const handleSubmit = async (values: INotice) => {
    values.id = current && current.id ? current.id : 0;

    setAddBtnblur();
    setVisible(false);

    const hide = message.loading("正在添加/更新");
    try {
      if (values.id === 0) {
        await addNotice(values);
      }
      else {
        await updateNotice(values);
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

  const handleRemove = async (selectedRows: INotice[]) => {
    const hide = message.loading("正在删除");
    if (!selectedRows) return true;
    try {
      const ids = selectedRows.map((row) => row.id) ?? [];
      const idsStr = ids.join(',');
      await batchDelete({ids: idsStr});
      setPagination({...pagination, current: 1});
      hide();
      message.success("删除成功，即将刷新");
      return true;
    } catch (error) {
      hide();
      message.error("删除失败，请重试");
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
  const columns: ProColumns<INotice>[] = [
    {
      key: 'title',
      title: '公告标题',
      dataIndex: 'title',
      valueType: 'text',
      width: 120,
    },
    {
      key: 'content',
      title: '公告内容',
      dataIndex: "content",
      ellipsis: true,
      width: 300,
      hideInSearch: true,
    },
    {
      key: 'author',
      title: '发布人',
      dataIndex: 'author',
      valueType: 'text',
      width: 150,
    },
    {
      title: '发布时间',
      dataIndex: 'tm',
      valueType: 'dateTime',
      width: 120,
    },
    {
      title: formatMessage({ id: "gloabal.tips.operation" }),
      dataIndex: "option",
      key: 'option',
      valueType: "option",
      fixed: 'right',
      width: 100,
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
                title: "删除公告",
                content: "确定删除该公告吗？",
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
  return (
    <PageContainer>
      <ProTable<INotice>
        rowKey="id"
        headerTitle="公告管理"
        defaultSize="small"
        scroll={{ x: 1000 }}
        bordered={false}
        options={{reload: false}}
        toolBarRender={() => {
          const toolBtns = [
            <AuthButton type="primary" key="primary" onClick={showModal} operCode={PageFuncEnum.ADD}>
              {PageFuncMap.get(PageFuncEnum.ADD)}
            </AuthButton>,
          ];
          return toolBtns;
        }}
        request={undefined}
        dataSource={noticeList}
        columns={columns}
        pagination={pagination}
        hideOnSinglePage={true}
        onChange={(pagination, filters, sorter) => {
          setPagination(pagination);
        }}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
        search={{
          defaultCollapsed: false,
          optionRender: ({ searchText, resetText }, { form }) => [
            <Button
              key="search"
              type="primary"
              onClick={() => {
                // form?.submit();
                console.log("search submit");
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
        footer={false}
      />
      
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              <LocaleFormatter id="app.project.chosen" defaultMessage="已选择" />{' '}
              <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a>{' '}
              <LocaleFormatter id="app.project.item" defaultMessage="项" />
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
          </AuthButton>
        </FooterToolbar>
      )}
      <OperationDrawer
        done={done}
        current={current}
        visible={visible}
        onDone={handleDone}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
      />
    </PageContainer>
  );
};

export default NoticeTableList;