import React, { FC, useEffect, useRef, useState } from "react";
import type { ReactText } from 'react';
import { findDOMNode } from "react-dom";
import { useRecoilValue } from "recoil";
import { Button, message, Modal, PaginationProps, Tag } from "antd";
import { FooterToolbar, PageContainer } from "@ant-design/pro-layout";
import ProList from '@ant-design/pro-list';
import { EditOutlined, DeleteOutlined, LikeOutlined } from '@ant-design/icons';
import { LocaleFormatter } from "@/locales";
import { permissionListState } from "@/stores/recoilState";
import {PageFuncEnum} from '@/models/common';
import {PageFuncMap} from '@/enums/common';
import {
  useAddNotice,
  useBatchDeleteNotice,
  useUpdateNotice,
  useQueryNoticeList
} from "@/api";
import WrapAuth from '@/components/wrap-auth/index';
import { INotice, INoticeList } from "@/models/notice-mng";
import OperationDrawer from "./modules/notice/OperationDrawer";

const types = ['top', 'inline', 'new'];

const NoticeTableList = () => {
  const permissionList = useRecoilValue(permissionListState);
  const [noticeList, setNoticeList] = useState<INotice[]>([]);
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
  const [selectedRowsState, setSelectedRows] = useState<IUser[]>([]);
  const [expandedRowKeys, setExpandedRowKeys] = useState<readonly ReactText[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<ReactText[]>([]);
  const [dataSource, setDataSource] = useState<any[]>([]);
  const rowSelection = {
    // selectedRowKeys,
    onChange: (keys: ReactText[]) => setSelectedRowKeys(keys),
  };
  const pageConfig = {
    ...pagination,
    onChange: (pagination, filters, sorter) => {
      setPagination(pagination);
    }
  };

  const [visible, setVisible] = useState<boolean>(false);

  const { mutateAsync: addMutate } = useAddNotice();
  const { mutateAsync: updateMutate } = useUpdateNotice();
  const { mutateAsync: batchDeleteMutate } = useBatchDeleteNotice();

  function YgSpan(props1) {
    return (
     <a
      {...props1}
    >
      {props1.children}
    </a>
    );
  }
  const IconText = (props1: { icon: any; text: string }) => (
    <span {...props1}>
      {React.createElement(props1.icon, { style: { marginRight: 8 } })}
      {props1.text}
    </span>
  );
  const AuthIconText = WrapAuth(IconText, permissionList);
  const AuthLink = WrapAuth(YgSpan, permissionList);
  const AuthButton = WrapAuth(Button, permissionList);

  useEffect(() => {
    setNoticeList(noticeListPageResp?.data);
    setPagination({
      ...pagination,
      total: noticeListPageResp?.total,
      showQuickJumper: true,
    });
  }, [noticeListPageResp]);
  useEffect(() => {
      const data = noticeList.map(
        (item, index) => ({
          title: item.title,
          // subTitle: <Tag color="#5BD8A6">语雀专栏</Tag>,
          subTitle: (
            <div className="notice-column">
              <div className="notice-col-author">
              发布人：{item.author}
              </div>
              <div className="notice-col-tm">
              发布时间：{item.tm}
              </div>
            </div>
          ),
          actions: [
            <AuthIconText
              icon={EditOutlined}
              text="编辑"
              key={PageFuncEnum.EDIT}
              operCode={PageFuncEnum.EDIT}
              onClick={(e) => {
                e.preventDefault();
                showEditModal(item);
              }}
            />,
            <AuthIconText
              icon={DeleteOutlined}
              text="删除"
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
                    await handleRemove([item.id]);
                    setSelectedRows([]);
                    refetch();
                  },
                });
              }}
            />
          ],
          // description: (
          //   <div className="notice-content">
          //     {item.content}
          //   </div>
          // ),
          type: types[index],
          avatar: 'https://gw.alipayobjects.com/zos/antfincdn/UCSiy1j6jx/xingzhuang.svg',
          content: (
            <div className="notice-content">
              {item.content}
            </div>
          ),
        }),
      );
      setDataSource(data);
  }, [noticeList]);
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

  const handleCancel = () => {
    setVisible(false);
  };
  const addNotice = async (data: INotice) => {
    await addMutate(data);
  };
  const updateNotice = async (data: INotice) => {
    await updateMutate(data);
  };
  const handleSubmit = async (row: INotice) => {
    row.id = current && current.id ? current.id : void 0;
    setVisible(false);
    const hide = message.loading("正在添加/更新");
    try {
      if (!row.id) {
        await addNotice(row);
      }
      else {
        await updateNotice(row);
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

  const handleRemove = async (selectedRows: number[]) => {
    const hide = message.loading("正在删除");
    if (!selectedRows) return true;
    try {
      // const ids = selectedRows.map((row) => row.id) ?? [];
      const idsStr = selectedRows.join(',');
      await batchDeleteMutate({ids: idsStr});
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

  return (
    <PageContainer className="notice-mng">
        <ProList<INotice>
          toolBarRender={() => {
            return [
              <AuthButton type="primary" key="primary" onClick={showModal} operCode={PageFuncEnum.ADD}>
                {PageFuncMap.get(PageFuncEnum.ADD)}
              </AuthButton>,
            ];
          }}
          itemLayout="vertical"
          rowKey="id"
          headerTitle="公告列表"
          dataSource={dataSource}
          rowSelection={rowSelection}
          expandable={{ expandedRowKeys, onExpandedRowsChange: setExpandedRowKeys }}
          metas={{
            title: {},
            subTitle: {},
            type: {},
            description: {},
            avatar: {},
            content: {},
            actions: {},
          }}
          pagination={pagination}
        />
        {selectedRowKeys?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              <span>已选择</span>
              <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a>
              <span>项</span>
            </div>
          }
        >
          <AuthButton
              type="primary"
              key="primary"
              onClick={async () => {
                await handleRemove(selectedRowKeys);
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
        current={current}
        visible={visible}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
      />
    </PageContainer>
  );
};

export default NoticeTableList;