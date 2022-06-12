import React, { useEffect, useRef, useState } from "react";
import { findDOMNode } from "react-dom";
import { useRecoilValue } from "recoil";
import { Button, message, Modal, PaginationProps, Space } from "antd";
import ProTable, { TableDropdown } from "@ant-design/pro-table";
import { PlusOutlined } from "@ant-design/icons";
import { FooterToolbar } from "@ant-design/pro-layout";
import type { ProColumns, ActionType } from "@ant-design/pro-table";
import { LocaleFormatter, useLocale } from "@/locales";
import { permissionListState } from "@/stores/recoilState";
import { SexEnum, PageFuncEnum } from '@/models/common';
import { IUser } from "@/models/user";
import { PageFuncMap, UserStatusMap, SexMap } from '@/enums/common';
import {
    useAddUser,
    useBatchDeleteUser,
    useUpdateUser,
    useGetUserList,
    useGetRoleListAll,
    useSetUserApps
} from "@/api";
import WrapAuth from '@/components/wrap-auth/index';
import { IUser, UserStatusEnum, IdentifyTypeEnum } from "@/models/user-mng";
import { IShopStore } from "@/models/shop-store";
import OperationDrawer from "./OperationDrawer";
import ShopListDrawer from "./storeListDrawer";
import ShopSetDrawer from "./shop-set-form";

interface UserTableListProps {
    identityType: IdentifyTypeEnum;
}
const UserTableList: FC<OperationDrawerProps> = props => {
    const { identityType = IdentifyTypeEnum.PLATFORM } = props;
    const permissionList = useRecoilValue(permissionListState);
    const actionRef = useRef<ActionType>();
    const { formatMessage } = useLocale();
    const { data: roleListAll } = useGetRoleListAll();
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
    const { data, error, isLoading, refetch } = useGetUserList(pagination, {...filters, identityType});
    const [selectedRowKeys, setSelectedRows] = useState<IUser[]>([]);
    const [done, setDone] = useState<boolean>(false);
    const [visible, setVisible] = useState<boolean>(false);
    const [shopViewVisible, setShopViewVisible] = useState<boolean>(false);
    const [shopSetVisible, setShopSetVisible] = useState<boolean>(false);
    const [roleOptions, setRoleOptions] = useState<IUser[]>();
    const [roleMap, setroleMap] = useState<object>();
    

    const { mutateAsync: addMutate } = useAddUser();
    const { mutateAsync: updateMutate } = useUpdateUser();
    const { mutateAsync: batchDeleteMutate } = useBatchDeleteUser();
    const { mutateAsync: setUserAppsMutate } = useSetUserApps();

    useEffect(() => {
        // const options = roleListAll?.map(item => ({value: item?.id, label: item?.name}));
        // setRoleOptions(options);
        const map = {};
        roleListAll?.forEach(item => {
            const {id, name} = item;
            map[id] = {id, text: name};
        });
        setroleMap(map);
    }, [roleListAll]);
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

    const showAddModal = () => {
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
    const handleCancel = () => {
        setVisible(false);
    };
    const handleSubmit = async (row: IUser) => {
        row.id = current && current.id ? current.id : void 0;
        row.identityType = identityType;
        setVisible(false);
        const hide = message.loading("正在添加/更新");
        try {
            if(!row.id) {
                await addUser(row);
            }
            else {
                await updateUser(row);
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
    const addUser = async (data: IUser) => {
        await addMutate({...data, identityType});
    };
    const updateUser = async (data: IUser) => {
        await updateMutate({...data, identityType});
    };
    const handleRemove = async (selectedRows: IUser[]) => {
        const hide = message.loading("正在删除");
        if (!selectedRows) return true;
        try {
            const ids = selectedRows.map((row) => row.id) ?? [];
            const idsStr = ids.join(',');
            await batchDeleteMutate({ ids: idsStr, identityType });
            setPagination({ ...pagination, current: 1 });
            hide();
            message.success("删除成功，即将刷新");
            return true;
        } catch (error) {
            hide();
            message.error("删除失败，请重试");
            return false;
        }
    };
    const showShopSetDrawer = () => {
        setShopSetVisible(true);
    };
    const handleShopSetCancel = () => {
        setShopSetVisible(false);
    };
    const handleSopSetSubmit = async (info: {appIds: string[], userId: string}) => {
        const {appIds, userId} = info;
        const appIdStr = appIds.join(',');
        const hide = message.loading("正在设置");
        try {
            await setUserAppsMutate({userId, appIds: appIdStr, identityType});
            setShopSetVisible(false);
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
    let columns: ProColumns<IUser>[] = [
        {
            title: '用户昵称',
            dataIndex: 'imageUrl',
            key: 'imageUrl',
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
            title: '用户姓名',
            dataIndex: "realName",
            ellipsis: true,
            width: 120,
        },
        {
            title: '性别',
            width: 80,
            dataIndex: "sex",
            valueEnum: {
                [SexEnum.MALE]: { text: SexMap.get(SexEnum.MALE) },
                [SexEnum.FEMALE]: { text: SexMap.get(SexEnum.FEMALE) },
            },
        },
        {
            title: '手机号',
            dataIndex: 'mobile',
            // copyable: true,
        },
        {
            title: identityType === IdentifyTypeEnum.RELATION ? '关联人角色' : '角色',
            dataIndex: 'roleId',
            valueType: 'select',
            with: 100,
            valueEnum: roleMap
            // sorter: true,
            // hideInSearch: true,
        },
        {
            title: '状态',
            width: 120,
            dataIndex: 'status',
            initialValue: `${UserStatusEnum.NORMAL}`,
            valueEnum: {
                [UserStatusEnum.NORMAL]: { text: UserStatusMap.get(UserStatusEnum.NORMAL), status: 'Success' },
                [UserStatusEnum.FREEZE]: { text: UserStatusMap.get(UserStatusEnum.FREEZE), status: 'Error' },
                [UserStatusEnum.DISABLED]: { text: UserStatusMap.get(UserStatusEnum.NORMAL), status: 'Default' },
            },
        },
    ];
    if (identityType) {
        columns = columns.concat([
            {
                title: '门店ID',
                dataIndex: 'appId',
                valueType: 'text',
            },
            {
                title: '门店数量',
                dataIndex: 'appNums',
                valueType: 'text',
                render: (_, row) => <span className="appNums">{row?.apps?.length}</span>,
            },
            {
                title: '初次签约时间',
                width: 180,
                dataIndex: 'tm',
                valueType: 'dateTime',
            }
        ]);
    }
    else {
        columns = columns.concat([
            {
                title: '上次登陆IP',
                width: 140,
                dataIndex: 'loginIp',
                valueType: 'text',
                hideInSearch: true,
            },
            {
                title: '上次登陆时间',
                width: 180,
                key: 'showTime',
                dataIndex: 'loginDate',
                valueType: 'dateTime',
                ellipsis: true,
                hideInSearch: true,
            },
        ]);
    }
    columns.push({
        title: formatMessage({ id: "gloabal.tips.operation" }),
        dataIndex: "option",
        key: 'option',
        valueType: "option",
        fixed: 'right',
        width: 150,
        render: (_, record) => {
            const opMenuList = [];
            if (PageFuncEnum.EDIT) {
                opMenuList.push({ key: 'viewShop', name: '查看数据权限' });
                opMenuList.push({ key: 'setShop', name: '设置数据权限' });
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
                // <AuthLink
                //     key={PageFuncEnum.LIST}
                //     operCode={PageFuncEnum.LIST}
                //     onClick={(e) => {
                //         e.preventDefault();
                //         showViewDrawer(record);
                //     }}
                // >
                //     查看数据权限
                // </AuthLink>,
                // <AuthLink
                //     key="shopSet"
                //     operCode={PageFuncEnum.EDIT}
                //     onClick={(e) => {
                //         e.preventDefault();
                //         showShopSetDrawer();
                //     }}
                // >
                //     设置数据权限
                // </AuthLink>,
                <AuthLink
                  key={PageFuncEnum.DELETE}
                  operCode={PageFuncEnum.DELETE}
                  onClick={(e) => {
                    e.preventDefault();
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
                  }}
                >
                  删除
                </AuthLink>,
                <TableDropdown
                  key="actionGroup"
                  onSelect={(key) => {
                    if (key === 'viewShop') {
                        showViewDrawer(record);
                    }
                    if (key === 'setShop') {
                        showShopSetDrawer();
                    }
                  }}
                  menus={opMenuList}
                />,
            ];
            return btnList;
        },
    });
    return (
        <>
            <ProTable<IUser>
                rowKey="id"
                headerTitle="用户管理"
                actionRef={actionRef}
                scroll={{ x: 1300 }}
                options={{ reload: false }}
                toolBarRender={() => [
                    <AuthButton type="primary" key="primary" onClick={showAddModal} operCode={PageFuncEnum.ADD}>
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
                    </AuthButton>,
                </FooterToolbar>
            )}
            <OperationDrawer
                current={current}
                visible={visible}
                onCancel={handleCancel}
                onSubmit={handleSubmit}
            />
            <ShopListDrawer
                key="shopListDrawer"
                current={current}
                visible={shopViewVisible}
                onClose={hideViewDrawer}
            />
            <ShopSetDrawer
                key="shopSetDrawer"
                visible={shopSetVisible}
                onCancel={handleShopSetCancel}
                onSubmit={handleSopSetSubmit}
            />
        </>
    );
};

export default UserTableList;
