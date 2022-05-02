import React, {useState} from 'react';
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
    data: shopStoreListResp,
    error: optionsError,
    isLoading: optionsLoading
  } = useGetShopStoreList();
  const [appId, setAppId] = useState(true);
  const [shopStoreDetail, setShopStoreDetail] = useState({});
  function handleAppIdChange(value) {
    setAppId(value);
    const { data: storeDetail } = useQueryShopStoreDetail();
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
  return (
    <PageContainer>
        <ProCard style={{marginBottom: 20}}>
          <QueryFilter  defaultCollapsed split>
            <ProFormSelect
              name="area"
              label="门店"
              request={async () => {
                const {
                  data: shopStoreListResp,
                  error: optionsError,
                  isLoading: optionsLoading
                } = useGetShopStoreList();
                return shopStoreListResp?.data
              }}
              onChange={handleAppIdChange}
            />
          </QueryFilter>
        </ProCard>
        <ProCard style={{}}>
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
