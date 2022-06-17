import React, { FC, useEffect, useRef, useState, useImperativeHandle } from 'react';
import { findDOMNode } from 'react-dom';
import { useRecoilValue } from 'recoil';
import { Form, Button, message, Modal, PaginationProps, Space, Input } from 'antd';
import { FooterToolbar } from '@ant-design/pro-layout';
import {
  ProCard, ProForm,
  QueryFilter, LightFilter,
  ProFormDatePicker, ProFormText,
  ProTable, TableDropdown,
} from '@ant-design/pro-components';
import type { ProFormInstance, ProColumns, ActionType } from '@ant-design/pro-components';
import cloneDeep from 'lodash/cloneDeep';
import { LocaleFormatter, useLocale } from '@/locales';
import { permissionListState } from '@/stores/recoilState';
import {PageFuncEnum, SexEnum} from '@/models/common';
import {ShopStoreStatusMap, ShopStoreStatusOptions, PageFuncMap} from '@/enums/common';
import {
  useAddShopStore,
  useBatchDeleteShopStore,
  useUpdateShopStore,
  useGetShopStoreListWithPage,
  useGetStoreImportTplLink,
  useExportStoreList
} from '@/api';
import WrapAuth from '@/components/wrap-auth/index';
import { IShopStore, ShopStoreStatusEnum } from '@/models/shop-store';
import ProvinceCityArea from '@/components/province-city-area';
import FormItem from '@/components/form-item';
import AutoUploadFile from './modules/auto-upload-file';
import ShopForm from './modules/shop-form';
import { dateTimeFormat } from '@/lib/common';

interface IShopListProps {
  showOperate?: boolean;
  showSearch?: boolean;
  showTableTitle?: boolean;
  shopTableRef: any;
  selectedApps: string[];
}
const searchFormLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};
const BASE_URL = import.meta.env.VITE_BASE_URL;
const ShopTableList: FC<IShopListProps> = (props = {showOperate: false, showTableTitle: true}) => {
  const {showOperate, showSearch, shopTableRef, showTableTitle, selectedApps = []} = props;
  const permissionList = useRecoilValue(permissionListState);
  const { formatMessage } = useLocale();
  const formRef = useRef<ProFormInstance<IShopStore>>();
  const actionRef = useRef<ActionType>();
  const pcdRef = useRef<React.Component>(null);
  const [form] = Form.useForm();
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
  // 选中的项目
  const [mySelectedRowKeys, handleMySelectedRowKeys] = useState([...selectedApps]);
	// 由于cancleRowKeys不影响dom，所以不使用useState定义
  // 取消选择的项目
	let cancleRowKeys = [];
	const onSelect = (record, selected) => {
		if (!selected) {
			cancleRowKeys = [record.appId];
		}
	}
	const onMulSelect = (selected, selectedRows, changeRows) => {
		if (!selected) {
			cancleRowKeys = changeRows.map((item) => item.appId);
		}
	}
	const onChange = (selectedRowKeys, selectedRows) => {
    console.log('selectedRowKeys:', selectedRowKeys);
    console.log('selectedRows:', selectedRows);
		if (cancleRowKeys.length) {
			const keys = mySelectedRowKeys.filter((item) => !cancleRowKeys.includes(item));
			handleMySelectedRowKeys(cloneDeep(keys));
			cancleRowKeys = [];
		} else {
			handleMySelectedRowKeys([...new Set(mySelectedRowKeys.concat(selectedRowKeys))]);
		}
  }

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

  useEffect(() => {
    if (selectedApps.length > 0) {
      handleMySelectedRowKeys(cloneDeep(selectedApps));
    }
  }, [selectedApps]);

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
    const formData = form.getFieldsValue();
    const pcdData = pcdRef?.current?.getValue();
    setFilters({
        ...formData,
        ...pcdData,
    });
    // refetch();
  };
  const handleReset = () => {
    form.resetFields();
    setFilters({province: '', city: '', district: '', keyword: ''});
    // refetch();
  };
  const handleKeywordChange = (event) => {
    setFilters({province: '', city: '', district: '', keyword: event.target.value});
  };
  const addShopStore = async (data: IShopStore) => {
    // await addMutate({appInfo: data});
    await addMutate(data);
  };
  const updateShopStore = async (data: IShopStore) => {
    // await updateMutate({appInfo: data});
    await updateMutate(data);
  };
  const handleSubmit = async (row: IShopStore) => {
    const {id, tm, provinceCityDistrict, ...rest} = row;
    const {province, city, district} = provinceCityDistrict;
    const rowTemp = {
      ...rest,
      id: current && current.id ? current.id : void 0,
      tm: dateTimeFormat(tm),
      province,
      city,
      district,
    };
    setVisible(false);

    const hide = message.loading("正在添加/更新");
    try {
      if (!rowTemp.id) {
        await addShopStore(rowTemp);
      }
      else {
        await updateShopStore(rowTemp);
      }

      hide();
      // handleMySelectedRowKeys([]);
      message.success("操作成功");
      refetch();

      return true;
    } catch (error) {
      hide();
      message.error("操作失败请重试！");
      return false;
    }
  };

  const handleRemove = async (selectedRowIds: string[]) => {
    const hide = message.loading("正在删除");
    if (!selectedRowIds) return true;
    try {
      const idsStr = selectedRowIds.join(',');
      await batchDeleteMutate({appIds: idsStr});
      setPagination({...pagination, current: 1});
      // handleMySelectedRowKeys([]);
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
      await exportStorePromise({keyword: filters.keyword});
      // window.location.href = `http://1.13.20.201:9090${BASE_URL}/app/store/export?keyword=${keyword}`;
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
      width: 250,
    },
    // {
    //   key: 'code',
    //   title: '门店编码',
    //   dataIndex: 'code',
    //   valueType: 'text',
    //   width: 140,
    // },
    {
      key: 'provinceName',
      title: '省',
      dataIndex: "provinceName",
      valueType: "text",
      width: 80,
    },
    {
      key: 'cityName',
      title: '市',
      dataIndex: "cityName",
      valueType: "text",
      width: 80,
    },
    {
      key: 'districtName',
      title: '区',
      dataIndex: "districtName",
      valueType: "text",
      width: 80,
    },
    {
      key: 'address',
      title: '详细地址',
      dataIndex: "address",
      valueType: "textarea",
      width: 120,
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
      width: 100,
      fieldProps: {
        allowHalf: true,
      },
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
                  await handleRemove([record.appId]);
                  // handleMySelectedRowKeys([]);
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
          //           await handleRemove([record.appId]);
          //           handleMySelectedRowKeys([]);
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
  const getValue = () => {
      return mySelectedRowKeys;
  };
  useImperativeHandle(shopTableRef, () => ({
      // changeVal 就是暴露给父组件的方法
      getValue,
  }));
  return (
    <>
      {showSearch ? (<ProCard style={{marginBottom: 20}}>
        <ProForm<IShopStore>
            {...searchFormLayout}
            form={form}
            formRef={formRef}
            submitter={{
              // 配置按钮文本
              // searchConfig: {
              //   resetText: '重置',
              //   submitText: '搜索',
              // },
              // 配置按钮的属性
              resetButtonProps: {
                style: {
                  // 隐藏重置按钮
                  // display: 'none',
                },
              },
              submitButtonProps: {},
          
              // 完全自定义整个区域
              render: (props, doms) => {
                console.log(props);
                return [
                  <Button key="rest" onClick={handleReset}>
                    重置
                  </Button>,
                  <Button key="submit" type="primary" onClick={handleSearch}>
                    搜索
                  </Button>,
                ];
              },
            }}
        >
            <ProFormText width="md" name="keyword" label="关键词" />
            <ProForm.Item
                name="pcdData"
                width="md"
                label="地址"
                placeholder="请选择地址"
            >
              <ProvinceCityArea hasFormItemWrap={false} cdRef={pcdRef} />
            </ProForm.Item>
        </ProForm>
      </ProCard>) : null}
      <ProTable<IShopStore>
        rowKey="appId"
        headerTitle={showTableTitle ? '门店管理' : ''}
        actionRef={actionRef}
        scroll={{ x: 1300 }}
        bordered={false}
        // options={{reload: true}}
        // request={(params, sorter, filter) => {
        //   // 表单搜索项会从 params 传入，传递给后端接口。
        //   console.log(params, sorter, filter);
        //   setFilters(params);
        //   refetch();
        // }}
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
              apiUrl={`${BASE_URL}/app/store/import`}
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
          selectedRowKeys: mySelectedRowKeys,
          onSelect,
          onSelectMultiple: onMulSelect,
          onSelectAll: onMulSelect,
          onChange,
        }}
        search={false}
        // search={transform = (value: any) => {
        //   return dateTimeFormat(value.tm)
        // }}
        footer={false}
      />
      {mySelectedRowKeys?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              <span>已选择</span>
              <a style={{ fontWeight: 600 }}>{mySelectedRowKeys.length}</a>
              <span>项</span>
            </div>
          }
        >
          {
            showOperate ? 
              <AuthButton
                type="primary"
                onClick={async () => {
                  await handleRemove(mySelectedRowKeys);
                  // handleMySelectedRowKeys([]);
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
      <ShopForm
        current={current}
        visible={visible}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default ShopTableList;