import React, { FC, useEffect, useRef, useState } from "react";
import { findDOMNode } from "react-dom";
import { useRecoilValue } from "recoil";
import { Form, Button, message, Modal, PaginationProps, Space, Input } from "antd";
import ProForm, { QueryFilter, LightFilter, ProFormDatePicker, ProFormText } from '@ant-design/pro-form';
import ProTable, {TableDropdown} from "@ant-design/pro-table";
import { FooterToolbar } from "@ant-design/pro-layout";
import type { ProColumns, ActionType } from "@ant-design/pro-table";
import type { ProFormInstance } from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card';
import { LocaleFormatter, useLocale } from "@/locales";
import { permissionListState } from "@/stores/recoilState";
import {PageFuncEnum, SexEnum} from '@/models/common';
import {ShopStoreStatusMap, ShopStoreStatusOptions, PageFuncMap} from '@/enums/common';
import {
  useAddShopStore,
  useBatchDeleteShopStore,
  useUpdateShopStore,
  useGetShopStoreListWithPage,
  useGetStoreImportTplLink,
  useExportStoreList
} from "@/api";
import WrapAuth from '@/components/wrap-auth/index';
import { IShopStore, ShopStoreStatusEnum } from "@/models/shop-store";
import ProvinceCityArea from '@/components/province-city-area';
import FormItem from "@/components/form-item";
import AutoUploadFile from "./modules/auto-upload-file";
import ShopFormDrawer from "./modules/shop-form";

interface IShopListProps {
  showOperate?: boolean;
}
const ShopTableList: FC<IShopListProps> = (props = {showOperate: false}) => {
  const {showOperate} = props;
  const permissionList = useRecoilValue(permissionListState);
  const { formatMessage } = useLocale();
  const formRef = useRef<ProFormInstance<IShopStore>>();
  const actionRef = useRef<ActionType>();
  const pcdRef = useRef<React.Component>(null);
  const [visible, setVisible] = useState<boolean>(false);
  const [shopStoreList, setShopStoreList] = useState<IShopStore[]>();
  const [filters, setFilters] = useState<IShopStore[]>({});
  const [current, setCurrent] = useState<Partial<IShopStore> | undefined>(
    undefined
  );
  const [pagination, setPagination] = useState<Partial<PaginationProps>>({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [selectedRowsState, setSelectedRows] = useState<IShopStore[]>([]);
  const [keyword, setKeyword] = useState<string>('');

  const { data: shopStorePageResp, error, isLoading, refetch } = useGetShopStoreListWithPage(pagination, filters);

  const { mutateAsync: addMutate } = useAddShopStore();
  const { mutateAsync: updateMutate } = useUpdateShopStore();
  const { mutateAsync: batchDeleteMutate } = useBatchDeleteShopStore();
  const getImpLinkPromise = useGetStoreImportTplLink();
  const exportStorePromise = useExportStoreList();
  useEffect(() => {
    setShopStoreList(shopStorePageResp?.data);
    setPagination({
      ...pagination,
      total: shopStorePageResp?.total,
      showQuickJumper: true,
    });
  }, [shopStorePageResp]);

  useEffect(() => {
    refetch();
  }, [pagination.current, pagination.pageSize, filters]);

  const showAddModal = () => {
    setVisible(true);
    setCurrent(undefined);
  };

  const showEditModal = (item: IShopStore) => {
    setVisible(true);
    setCurrent(item);
  };

  const handleCancel = () => {
    setVisible(false);
  };
  const handleSearch = () => {
    const payload = pcdRef?.current?.getValue();
    setFilters({keyword, ...payload});
    // refetch();
  };
  const handleReset = () => {
    setFilters({province: '', city: '', district: '', keyword: ''});
    // refetch();
  };
  const handleKeywordChange = (event) => {
    // console.log('handleKeywordChange:', value);
    // refetch();
    setKeyword(event.target.value);
  };
  const addShopStore = async (data: IShopStore) => {
    await addMutate(data);
  };
  const updateShopStore = async (data: IShopStore) => {
    await updateMutate(data);
  };
  const handleSubmit = async (row: IShopStore) => {
    row.id = current && current.id ? current.id : 0;
    const {province, city, district} = row.provinceCityDistrict;
    row.province = province;
    row.city = city;
    row.district = district;
    setVisible(false);

    const hide = message.loading("正在添加/更新");
    try {
      if (row.id === 0) {
        await addShopStore(row);
      }
      else {
        await updateShopStore(row);
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

  const handleRemove = async (selectedRows: IShopStore[]) => {
    const hide = message.loading("正在删除");
    if (!selectedRows) return true;
    try {
      const ids = selectedRows.map((row) => row.appId) ?? [];
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
  const handleGetDownloadTemplate = async () => {
    const importLink = await getImpLinkPromise({});
    window.open(importLink, '_blank');
  };
  const handleImportTemplate = () => {
  };
  const handleExportTemplate = async () => {
     await exportStorePromise({keyword: ''});
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
  const AuthAutoUploadFileButton = WrapAuth(AutoUploadFile, permissionList);
  const columns: ProColumns<IShopStore>[] = [
    {
      key: 'appId',
      title: '门店编号',
      dataIndex: 'appId',
      valueType: 'text',
      width: 120,
    },
    {
      key: 'nm',
      title: '门店名称',
      dataIndex: "nm",
      valueType: "text",
      ellipsis: true,
      width: 150,
    },
    {
      key: 'code',
      title: '门店编码',
      dataIndex: 'code',
      valueType: 'text',
      width: 140,
    },
    {
      key: 'province',
      title: '省',
      dataIndex: "province",
      valueType: "text",
      width: 100,
    },
    {
      key: 'city',
      title: '市',
      dataIndex: "city",
      valueType: "text",
      width: 100,
    },
    {
      key: 'district',
      title: '区',
      dataIndex: "district",
      valueType: "text",
      width: 100,
    },
    {
      key: 'address',
      title: '详细地址',
      dataIndex: "address",
      valueType: "textarea",
      width: 100,
    },
    {
      key: 'franchisee',
      title: '加盟商',
      dataIndex: "franchisee",
      valueType: "text",
      width: 100,
    },
    {
      key: 'manager',
      title: '店长',
      dataIndex: "manager",
      valueType: "text",
      width: 100,
    },
    {
      title: '状态',
      width: 80,
      dataIndex: "status",
      valueEnum: {
        [ShopStoreStatusEnum.NORMAL]: { text: ShopStoreStatusMap.get(ShopStoreStatusEnum.NORMAL)},
        [ShopStoreStatusEnum.DISABLED]: { text: ShopStoreStatusMap.get(ShopStoreStatusEnum.DISABLED)},
      },
    },
    {
      title: '门店评级',
      dataIndex: "grade",
      valueType: "rate",
      width: 150,
      // copyable: true,
    },
    {
      title: '合伙人',
      dataIndex: 'partner',
      valueType: 'text',
      width: 120,
    },
    {
      title: '签约时间',
      dataIndex: 'tm',
      valueType: 'dateTime',
      width: 120,
    },
    showOperate ?
    {
      title: formatMessage({ id: "gloabal.tips.operation" }),
      dataIndex: "option",
      key: 'option',
      valueType: "option",
      fixed: 'right',
      width: 140,
      render: (_, record) => {
        const opMenuList = [];
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
            key={PageFuncEnum.DELETE}
            operCode={PageFuncEnum.DELETE}
            onClick={(e) => {
              e.preventDefault();
              Modal.confirm({
                title: "删除门店",
                content: "确定删除该门店吗？",
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
          // <TableDropdown
          //   key="actionGroup"
          //   onSelect={(key) => {
          //     if (key === PageFuncEnum.DELETE) {
          //       Modal.confirm({
          //         title: "删除门店",
          //         content: "确定删除该门店吗？",
          //         okText: "确认",
          //         cancelText: "取消",
          //         onOk: async () => {
          //           await handleRemove([{ ...record }]);
          //           setSelectedRows([]);
          //           refetch();
          //         },
          //       });
          //     }
          //   }}
          //   menus={opMenuList}
          // />,
        ];
        return btnList;
      },
    } : {},
  ];
  return (
    <>
      <ProCard style={{marginBottom: 20}}>
      {/* <ProForm<IShopStore> formRef={formRef} onFinish={handleFilterChange}> */}
        <div className="store-list-search">
          <FormItem label="关键词">
            <Input placeholder="关键词" style={{ width: 160 }} onChange={handleKeywordChange} />
          </FormItem>
          {/* <ProFormText name="keyword" label="关键词" /> */}
          <ProvinceCityArea cdRef={pcdRef} />
          <Button type="primary" onClick={handleSearch}>查询</Button>
          <Button onClick={handleReset}>重置</Button>
        </div>
      {/* </ProForm> */}
      </ProCard>
      <ProTable<IShopStore>
        rowKey="appId"
        headerTitle="门店管理"
        defaultSize="small"
        actionRef={actionRef}
        scroll={{ x: 1000 }}
        bordered={false}
        options={{reload: false}}
        toolBarRender={() => {
          const toolBtns = showOperate ? [
            <AuthLink
              key={PageFuncEnum.IMPORT}
              operCode={PageFuncEnum.EDIT}
              onClick={handleGetDownloadTemplate}
            >
              下载导入模版
            </AuthLink>,
            <AuthAutoUploadFileButton
              key={PageFuncEnum.IMPORT}
              operCode={PageFuncEnum.EDIT}
              btnText="导入"
              apiUrl="http://1.13.20.201:9000/app/store/import"
              maxCount={1}
            />,
            <AuthButton
              key={PageFuncEnum.IMPORT}
              operCode={PageFuncEnum.EDIT}
              onClick={handleExportTemplate}
            >
              导出
            </AuthButton>,
            <AuthButton type="primary" onClick={showAddModal} operCode={PageFuncEnum.ADD}>
              {PageFuncMap.get(PageFuncEnum.ADD)}
            </AuthButton>,
          ] : [];
          return toolBtns;
        }}
        request={undefined}
        dataSource={shopStoreList}
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
        search={false}
        footer={false}
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
          {
            showOperate ? 
              <AuthButton
                type="primary"
                onClick={async () => {
                  await handleRemove(selectedRowsState);
                  setSelectedRows([]);
                  refetch();
                }}
                operCode={PageFuncEnum.DELETE}
              >
                {PageFuncMap.get(PageFuncEnum.DELETE)}
              </AuthButton>
              : null
          }
        </FooterToolbar>
      )}
      <ShopFormDrawer
        current={current}
        visible={visible}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default ShopTableList;