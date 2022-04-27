import React, { useEffect, useRef, useState } from "react";
import { findDOMNode } from "react-dom";
import { useRecoilValue } from "recoil";
import { Button, message, Modal, PaginationProps, Space } from "antd";
import ProTable, {TableDropdown} from "@ant-design/pro-table";
import { PlusOutlined } from "@ant-design/icons";
import { FooterToolbar, PageContainer } from "@ant-design/pro-layout";
import type { ProColumns, ActionType } from "@ant-design/pro-table";
import { LocaleFormatter, useLocale } from "@/locales";
import { permissionListState } from "@/stores/recoilState";
import {SexEnum} from '@/models/common';
import {PageFuncEnum} from '@/models/common';
import {PageFuncMap, UserStatusMap} from '@/enums/common';
import {
  useAddUser,
  useBatchDeleteUser,
  useUpdateUser,
  useGetUserList
} from "@/api";
import WrapAuth from '@/components/wrap-auth/index';
import { IUser, UserStatusEnum } from "@/models/user.interface";
import { UserStatusMap } from "@/enums/common";
import OperationDrawer from "./modules/user/OperationDrawer";
import ShopListDrawer from "./modules/user/storeListDrawer";

const UserTableList= () => {
  const permissionList = useRecoilValue(permissionListState);
  const { formatMessage } = useLocale();
  const addBtn = useRef(null);
  const [done, setDone] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [shopViewVisible, setShopViewVisible] = useState<boolean>(false);
  const [userList, setUserList] = useState<IUser[]>();
  const [filters, setFilters] = useState<IUser[]>();
  const [current, setCurrent] = useState<Partial<IUser> | undefined>(
    undefined
  );
  const [pagination, setPagination] = useState<Partial<PaginationProps>>({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const actionRef = useRef<ActionType>();
  const [selectedRowsState, setSelectedRows] = useState<IUser[]>([]);

  const { data, error, isLoading, refetch } = useGetUserList(pagination, filters);

  const { mutateAsync } = useAddUser();
  const { mutateAsync: update } = useUpdateUser();
  const { mutateAsync: batchDelete } = useBatchDeleteUser();

  useEffect(() => {
    setUserList(data?.data);
    setPagination({
      ...pagination,
      total: data?.total,
      showQuickJumper: true,
    });
  }, [data]);

  useEffect(() => {
    refetch();
}, [pagination.current, pagination.pageSize, filters]);

  const showModal = () => {
    setVisible(true);
    setCurrent(undefined);
  };

  const showEditModal = (item: IUser) => {
    setVisible(true);
    setCurrent(item);
  };

  const showViewDrawer = (item: IUser) => {
    setShopViewVisible(true);
    setCurrent(item);
  };
  const hideViewDrawer = () => {
    setShopViewVisible(false);
  };

  const setAddBtnblur = () => {
    if (addBtn.current) {
      // eslint-disable-next-line react/no-find-dom-node
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

  const addUser = async (data: IUser) => {
    await mutateAsync(data);
  };
  const updateUser = async (data: IUser) => {
    await update(data);
  };
  const handleSubmit = async (values: IUser) => {
    values.id = current && current.id ? current.id : 0;

    setAddBtnblur();
    setVisible(false);

    const hide = message.loading("正在添加/更新");
    try {
      if (values.id === 0) {
        await addUser(values);
      }
      else {
        await updateUser(values);
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
  /**
   * 删除节点
   * @param selectedRows
   */
  const handleRemove = async (selectedRows: IUser[]) => {
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
  function YgSpan(props) {
    return (
     <a
      {...props}
    >
      {props.children}
    </a>
    );
  }
  const AuthLink = WrapAuth(YgSpan, permissionList);
  const columns: ProColumns<IUser>[] = [
    // {
    //   title: '用户名',
    //   dataIndex: "username",
    // },
    {
      title: '用户',
      dataIndex: 'imageUrl',
      key: 'avatar',
      valueType: 'avatar',
      width: 150,
      render: (dom, row, index, action) => (
        <Space>
          <span>{dom}</span>
          <span>
            {row.username}
          </span>
        </Space>
      ),
    },
    {
      title: '真实名称',
      dataIndex: "realName",
      // valueType: "textarea",
      ellipsis: true,
      width: 120,
    },
    {
      title: '性别',
      width: 80,
      dataIndex: "sex",
      valueEnum: {
        [SexEnum.MALE]: { text: UserStatusMap.get(SexEnum.MALE)},
        [SexEnum.FEMALE]: { text: UserStatusMap.get(SexEnum.FEMALE)},
      },
    },
    {
      title: '手机号',
      dataIndex: 'mobile',
      // copyable: true,
    },
    {
      title: '角色名称',
      dataIndex: 'roleNm',
      valueType: 'text',
      with: 100,
      // sorter: true,
      // hideInSearch: true,
    },
    {
      title: '门店ID',
      dataIndex: 'appId',
      valueType: 'text',
      // sorter: true,
      // hideInSearch: true,
    },
    {
      title: '状态',
      width: 120,
      dataIndex: 'status',
      initialValue: 'all',
      valueEnum: {
        [UserStatusEnum.NORMAL]: { text: UserStatusMap.get(UserStatusEnum.NORMAL), status: 'Success' },
        [UserStatusEnum.FREEZE]: { text: UserStatusMap.get(UserStatusEnum.FREEZE), status: 'Error' },
        [UserStatusEnum.DISABLED]: { text: UserStatusMap.get(UserStatusEnum.NORMAL), status: 'Default' },
      },
    },
    {
      title: '上次登陆时间',
      width: 180,
      key: 'showTime',
      dataIndex: 'loginDate',
      valueType: 'dateTime',
      ellipsis: true,
      hideInSearch: true,
      // sorter: true,
    },
    {
      title: '上次登陆IP',
      width: 140,
      dataIndex: 'loginIp',
      valueType: 'text',
      hideInSearch: true,
      // sorter: true,
    },
    {
      title: formatMessage({ id: "gloabal.tips.operation" }),
      dataIndex: "option",
      key: 'option',
      valueType: "option",
      fixed: 'right',
      width: 200,
      render: (_, record) => {
        const opMenuList = [
          // { key: 'copy', name: '复制' },
        ];
        if (PageFuncEnum.DELETE) {
          opMenuList.push({ key: PageFuncEnum.DELETE, name: '删除' });
        }
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
            key={PageFuncEnum.LIST}
            operCode={PageFuncEnum.LIST}
            onClick={(e) => {
              e.preventDefault();
              showViewDrawer(record);
            }}
          >
            查看数据权限
          </AuthLink>,
          // <AuthLink
          //   key={PageFuncEnum.DELETE}
          //   operCode={PageFuncEnum.DELETE}
          //   onClick={(e) => {
          //     e.preventDefault();
          //     Modal.confirm({
          //       title: "删除用户",
          //       content: "确定删除该用户吗？",
          //       okText: "确认",
          //       cancelText: "取消",
          //       onOk: async () => {
          //         await handleRemove([{ ...record }]);
          //         setSelectedRows([]);
          //         refetch();
          //       },
          //     });
          //   }}
          // >
          //   删除
          // </AuthLink>,
          <TableDropdown
            key="actionGroup"
            onSelect={(key) => {
              if (key === PageFuncEnum.DELETE) {
                Modal.confirm({
                  title: "删除用户",
                  content: "确定删除该用户吗？",
                  okText: "确认",
                  cancelText: "取消",
                  onOk: async () => {
                    await handleRemove([{ ...record }]);
                    setSelectedRows([]);
                    refetch();
                  },
                });
              }
            }}
            menus={opMenuList}
          />,
        ];
        return btnList;
      },
    },
  ];

  const AuthButton = WrapAuth(Button, permissionList);

  return (
    <PageContainer>
      <ProTable<IUser>
        rowKey="id"
        headerTitle="用户管理"
        actionRef={actionRef}
        scroll={{ x: 1300 }}
        options={{reload: false}}
        toolBarRender={() => [
          <AuthButton type="primary" key="primary" onClick={showModal} operCode={PageFuncEnum.ADD}>
            {PageFuncMap.get(PageFuncEnum.ADD)}
          </AuthButton>,
        ]}
        request={undefined}
        dataSource={userList}
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
          </AuthButton>,
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
      <ShopListDrawer
        current={current}
        visible={shopViewVisible}
        onClose={hideViewDrawer}
      />
    </PageContainer>
  );
};

export default UserTableList;
