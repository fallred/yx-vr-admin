import React, {useState, useEffect, useRef} from 'react';
import moment from 'moment';
import {Rate, Form} from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import {ProCard, ProDescriptions, QueryFilter, ProFormSelect, ProFormRate} from '@ant-design/pro-components';
import {useGetShopStoreList, useQueryShopStoreDetail} from '@/api';
import {ShopStoreStatusMap} from '@/enums/common';
import ShopTask from './modules/shop-task/index';

const ShopDetailPage: React.FC<{}> = () => {
  const {
    data: shopStoreList,
    error: optionsError,
    isLoading: optionsLoading
  } = useGetShopStoreList();
  const fetchStoreDetail = useQueryShopStoreDetail();
  const [searchForm] = Form.useForm();
  const searchFormRef = useRef(null);
  const searchFormLayout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 16 },
  };
  const [appId, setAppId] = useState<string>('');
  const [shopStoreDetail, setShopStoreDetail] = useState({});
  const handleSearch = async searchData => {
    const storeDetail = await fetchStoreDetail(searchData);
    setShopStoreDetail(storeDetail);
  };
  function handleAppIdChange(value) {
    setAppId(value);
  }
  const addressFormat = () => {
    const addrInfo = [
        shopStoreDetail.provinceName ?? '--',
        shopStoreDetail.cityName ?? '--',
        shopStoreDetail.districtName ?? '--',
        shopStoreDetail.address ?? ''
    ];
    return addrInfo.join('-');
  };
  useEffect(() => {
    const selectedAppId = shopStoreList?.[0]?.appId;
    setAppId(selectedAppId);
    searchForm.setFieldsValue({
      appId: selectedAppId
    });
    handleSearch({appId: selectedAppId});
  }, [shopStoreList]);

  return (
    <PageContainer>
        <ProCard key="card1" style={{marginBottom: 20}}>
            <QueryFilter
                {...searchFormLayout}
                form={searchForm}
                submitter={true}
                split
                onFinish={handleSearch}
            >
              <ProFormSelect
                key="appId"
                name="appId"
                label="门店"
                options={shopStoreList}
                onChange={handleAppIdChange}
                fieldProps={{
                  fieldNames: {
                    label: 'nm',
                    value: 'appId'
                  },
                }}
              />
            </QueryFilter>
        </ProCard>
        <ProCard key="card2" style={{marginBottom: 20}}>
          <ProDescriptions column={3} title="门店详情" tooltip="门店详细信息">
            <ProDescriptions.Item
              label="门店名称"
              fieldProps={{
                // format: 'YYYY.MM.DD',
              }}
              valueType="text"
            >
              {shopStoreDetail.nm}
            </ProDescriptions.Item>
            <ProDescriptions.Item
              label="门店编码"
              valueType="text"
            >
              {shopStoreDetail.code}
            </ProDescriptions.Item>
            <ProDescriptions.Item
              label="所在省"
              valueType="text"
            >
              {shopStoreDetail.provinceName}
            </ProDescriptions.Item>
            <ProDescriptions.Item
              label="所在市"
              valueType="text"
            >
              {shopStoreDetail.cityName}
            </ProDescriptions.Item>
            <ProDescriptions.Item
              label="所在区"
              valueType="text"
            >
              {shopStoreDetail.districtName}
            </ProDescriptions.Item>
            <ProDescriptions.Item
              label="详细地址"
              valueType="text"
            >
              {shopStoreDetail.address}
            </ProDescriptions.Item>
            <ProDescriptions.Item
              label="加盟商"
              valueType="text"
            >
              {shopStoreDetail.franchisee}
            </ProDescriptions.Item>
            <ProDescriptions.Item
              label="店长"
              valueType="text"
            >
              {shopStoreDetail.manager}
            </ProDescriptions.Item>
            <ProDescriptions.Item
              label="合伙人"
              valueType="text"
            >
              {shopStoreDetail.partner}
            </ProDescriptions.Item>
            <ProDescriptions.Item label="状态">
              {ShopStoreStatusMap.get(shopStoreDetail.status)}
            </ProDescriptions.Item>
            <ProDescriptions.Item label="评级">
              <Rate
                 allowHalf
                 disabled
                 value={shopStoreDetail.grade}
              />
            </ProDescriptions.Item>
            <ProDescriptions.Item
                label="签约时间"
                // fieldProps={{
                //   format: 'YYYY.MM.DD HH:mm:SS',
                // }}
                valueType="dateTime"
            >
                {shopStoreDetail.tm}
            </ProDescriptions.Item>
          </ProDescriptions>
        </ProCard>
        {/* <ProCard key="card3">
        </ProCard> */}
        <ShopTask
          appId={appId}
          filterType='light'
        />
    </PageContainer>
  );
};

export default ShopDetailPage;
