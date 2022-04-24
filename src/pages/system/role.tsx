import React, { useEffect, useRef, useState } from "react";
import { findDOMNode } from "react-dom";
import ProTable from "@ant-design/pro-table";
import { Button, message, Modal, PaginationProps, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { FooterToolbar, PageContainer } from "@ant-design/pro-layout";
import type { ProColumns, ActionType } from "@ant-design/pro-table";
import { LocaleFormatter, useLocale } from "@/locales";
import { useAddRole, useBatchDeleteRole, useGetRoleList, useUpdateRole } from "@/api";
import OperationDrawer from "./modules/role/OperationDrawer";

const TableList= () => {
  const { formatMessage } = useLocale();

  const addBtn = useRef(null);

  const [done, setDone] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [roles, setRole] = useState<API.IRole[]>();
  const [filters, setFilters] = useState<API.IRole[]>();
  const [current, setCurrent] = useState<Partial<API.IRole> | undefined>(
    undefined
  );

  const [showDetail, setShowDetail] = useState<boolean>(false);

  const [pagination, setPagination] = useState<Partial<PaginationProps>>({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const actionRef = useRef<ActionType>();
  const [selectedRowsState, setSelectedRows] = useState<API.IRole[]>([]);

  const { data, error, isLoading, refetch } = useGetRoleList(pagination, filters);

  const { mutateAsync } = useAddRole();
  const { mutateAsync: update } = useUpdateRole();
  const { mutateAsync: batchDelete } = useBatchDeleteRole();

  useEffect(() => {
    setRole(data?.data);
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

  const showEditModal = (item: API.IRole) => {
    setVisible(true);
    item.selectedMenuTree = JSON.parse(item.powerSelected);
    // item.selectedMenuCodeList = transToSelectedIds(item.selectedMenuTree);
    // const selectedTree = transToSelectedTree(menuTree, selectedMenuCodeList)
    setCurrent(item);
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

  const addProject = async (data: API.IRole) => {
    await mutateAsync(data);
  };
  const updateProject = async (data: API.IRole) => {
    await update(data);
  };
  const handleSubmit = async (values: API.IRole) => {
    values.id = current && current.id ? current.id : 0;

    setAddBtnblur();
    setVisible(false);

    const hide = message.loading("正在添加/更新");
    try {
      if (values.id === 0) {
        await addProject(values);
      }
      else {
        await updateProject(values);
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
   *
   * @param selectedRows
   */
  const handleRemove = async (selectedRows: API.IRole[]) => {
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

  const columns: ProColumns<API.IRole>[] = [
    {
      title: '角色名',
      dataIndex: "name",
      tip: "请输入角色名",
      // sorter: true,
      // render: (dom, entity) => {
      //   return (
      //     <a
      //       onClick={() => {
      //         setCurrent(entity);
      //         setShowDetail(true);
      //       }}
      //     >
      //       {dom}
      //     </a>
      //   );
      // },
    },
    {
      title: '角色描述',
      dataIndex: "comment",
      valueType: "textarea",
      // sorter: true,
    },
    {
      title: formatMessage({ id: "gloabal.tips.operation" }),
      dataIndex: "option",
      valueType: "option",
      render: (_, record) => [
        <a
          key="edit"
          onClick={(e) => {
            e.preventDefault();
            showEditModal(record);
          }}
        >
          编辑
        </a>,
        <a
          key="delete"
          onClick={(e) => {
            e.preventDefault();
            Modal.confirm({
              title: "删除項目",
              content: "确定删除该項目吗？",
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
        </a>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.IRole>
        headerTitle="角色管理"
        actionRef={actionRef}
        rowKey="id"
        options={{reload: false}}
        toolBarRender={() => [
          <Button type="primary" key="primary" onClick={showModal}>
            新增
          </Button>,
        ]}
        // tableAlertRender={({ selectedRowKeys, selectedRows, onCleanSelected }) => (
        //   <Space size={24}>
        //     <span>
        //       已选 {selectedRowKeys.length} 项
        //       <a style={{ marginLeft: 8 }} onClick={onCleanSelected}>
        //         取消选择
        //       </a>
        //     </span>
        //   </Space>
        // )}
        // tableAlertOptionRender={() => {
        //   return (
        //     <Space size={16}>
        //       <a onClick={async () => {
        //         await handleRemove(selectedRowsState);
        //         setSelectedRows([]);
        //         refetch();

        //       }}>批量删除</a>
        //     </Space>
        //   );
        // }}
        request={undefined}
        dataSource={roles}
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
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
                  refetch();

            }}
          >
            删除
          </Button>
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

export default TableList;
