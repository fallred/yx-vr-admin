import React, {useState, useEffect} from 'react';
import moment from 'moment';
import {Rate} from 'antd';
import { PageContainer } from "@ant-design/pro-layout";
import { QueryFilter, ProFormSelect, ProFormDatePicker } from '@ant-design/pro-form';
import ProDescriptions from '@ant-design/pro-descriptions';
import ProCard from '@ant-design/pro-card';
import {useGetShopStoreList, useQueryShopStoreDetail} from "@/api";
import {ShopStoreStatusMap} from '@/enums/common';

const ShopDetailPage: React.FC<{}> = () => {
  const {
    data: shopStoreList,
    error: optionsError,
    isLoading: optionsLoading
  } = useGetShopStoreList();
  const fetchStoreDetail = useQueryShopStoreDetail();
  const [appId, setAppId] = useState<string>('');
  const [shopStoreDetail, setShopStoreDetail] = useState({});
  async function handleAppIdChange(value) {
    const storeDetail = await fetchStoreDetail({id: value});
    setShopStoreDetail(storeDetail);
  }
  const addressFormat = () => {
    const addrInfo = [
        shopStoreDetail.province ?? '--',
        shopStoreDetail.city ?? '--',
        shopStoreDetail.district ?? '',
        shopStoreDetail.address ?? ''
    ];
    return addrInfo.join('-');
  };
  useEffect(() => {
    const selectedAppId = shopStoreList?.[0]?.appId;
    setAppId(selectedAppId);
    handleAppIdChange(selectedAppId);
  }, [shopStoreList]);

  return (
    <PageContainer>
        <ProCard key="card1" style={{marginBottom: 20}}>
          <QueryFilter
            submitter={false}
            split
          >
            <ProFormSelect
              label="门店"
              value={appId}
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
        <ProCard key="card2">
          <ProDescriptions column={2} title="门店详情" tooltip="门店详细信息">
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
              label="地址"
              valueType="text"
            >
              {addressFormat()}
            </ProDescriptions.Item>
            <ProDescriptions.Item
              label="所在市"
              valueType="text"
            >
              {shopStoreDetail.province}
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
              <Rate allowHalf disabled defaultValue={shopStoreDetail.grade} />
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
    </PageContainer>
  );
};

export default ShopDetailPage;
