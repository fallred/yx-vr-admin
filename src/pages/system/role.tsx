import React, { useEffect, useRef, useState } from 'react';
import { findDOMNode } from 'react-dom';
import { useRecoilValue } from 'recoil';
import { Button, message, Modal, PaginationProps, Space } from 'antd';
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout';
import { PlusOutlined } from '@ant-design/icons';
import type { ProColumns, ActionType } from '@ant-design/pro-components';
import {ProTable} from '@ant-design/pro-components';
import { LocaleFormatter, useLocale } from '@/locales';
import { permissionListState } from '@/stores/recoilState';
import { IRole, IRoleList, IRolePaginationResp } from '@/models/role';
import {PageFuncEnum} from '@/models/common';
import {PageFuncMap} from '@/enums/common';
import { useAddRole, useBatchDeleteRole, useGetRoleList, useUpdateRole } from '@/api';
import WrapAuth from '@/components/wrap-auth/index';
import RoleForm from './modules/role/role-form';

const RoleTableList= () => {
  const permissionList = useRecoilValue(permissionListState);
  const { formatMessage } = useLocale();
  const [roleList, setRoleList] = useState<IRole[]>();
  const [filters, setFilters] = useState<IRole>();
  const [current, setCurrent] = useState<Partial<IRole> | undefined>(
    undefined
  );
  const [pagination, setPagination] = useState<Partial<PaginationProps>>({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [selectedRowsState, setSelectedRows] = useState<IRole[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const { data: rolePageResp, error, isLoading, refetch } = useGetRoleList(pagination, filters);
  const { mutateAsync: addMutate } = useAddRole();
  const { mutateAsync: updateMutate } = useUpdateRole();
  const { mutateAsync: batchDeleteMutate } = useBatchDeleteRole();

  useEffect(() => {
    setRoleList(rolePageResp?.data);
    setPagination({
      ...pagination,
      total: rolePageResp?.total,
      showQuickJumper: true,
    });
  }, [rolePageResp]);

  useEffect(() => {
    refetch();
}, [pagination.current, pagination.pageSize, filters]);

  const showAddModal = () => {
    setVisible(true);
    setCurrent(undefined);
  };

  const showEditModal = (item: IRole) => {
    setVisible(true);
    item.selectedMenuTree = JSON.parse(item.powerSelected);
    // item.selectedMenuCodeList = transToSelectedIds(item.selectedMenuTree);
    // const selectedTree = transToSelectedTree(menuTree, selectedMenuCodeList)
    setCurrent(item);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const addRole = async (data: IRole) => {
    await addMutate(data);
  };
  const updateRole = async (data: IRole) => {
    await updateMutate(data);
  };
  const handleSubmit = async (row: IRole) => {
    row.id = current && current.id ? current.id : void 0;
    setVisible(false);
    const hide = message.loading("正在添加/更新");
    try {
      if (!row.id) {
        await addRole(row);
      }
      else {
        await updateRole(row);
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
  const handleRemove = async (selectedRows: IRole[]) => {
    const hide = message.loading("正在删除");
    if (!selectedRows) return true;
    try {
      const ids = selectedRows.map((row) => row.id) ?? [];
      const idsStr = ids.join(',');
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
  const columns: ProColumns<IRole>[] = [
    {
      title: '角色名',
      dataIndex: "name",
      // tip: "请输入角色名",
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

  return (
    <PageContainer>
      <ProTable<IRole>
        headerTitle="角色管理"
        actionRef={actionRef}
        rowKey="id"
        options={{reload: false}}
        toolBarRender={() => [
          <AuthButton type="primary" key="primary" onClick={showAddModal} operCode={PageFuncEnum.ADD}>
            {PageFuncMap.get(PageFuncEnum.ADD)}
          </AuthButton>,
        ]}
        request={undefined}
        dataSource={roleList}
        columns={columns}
        pagination={pagination}
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
        ? <RoleForm
          current={current}
          visible={visible}
          onCancel={handleCancel}
          onSubmit={handleSubmit}
        />
        : null
      }
    </PageContainer>
  );
};

export default RoleTableList;
