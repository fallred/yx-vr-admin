import React from 'react';
import moment from 'moment';
import { QueryFilter, ProFormSelect, ProFormDatePicker } from '@ant-design/pro-form';
import ProDescriptions from '@ant-design/pro-descriptions';
import ProCard from '@ant-design/pro-card';
import {useGetShopStoreList} from "@/api";

const ShopDetailPage: React.FC<{}> = () => {
  const {
    data: shopStoreListResp,
    error: optionsError,
    isLoading: optionsLoading
  } = useGetShopStoreList();
  return (
      <div className='shop-detail'>
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
            />
            
          </QueryFilter>
        </ProCard>
        <ProCard style={{  }}>
          <ProDescriptions column={2} title="高级定义列表" tooltip="包含了从服务器请求，columns等功能">
            <ProDescriptions.Item
              label="日期"
              fieldProps={{
                format: 'YYYY.MM.DD',
              }}
              valueType="date"
            >
              {moment().valueOf()}
            </ProDescriptions.Item>
            <ProDescriptions.Item
              label="日期区间"
              fieldProps={{
                format: 'YYYY.MM.DD HH:mm:ss',
              }}
              valueType="dateTimeRange"
            >
              {[moment().add(-1, 'd').valueOf(), moment().valueOf()]}
            </ProDescriptions.Item>
            <ProDescriptions.Item
              label="时间"
              fieldProps={{
                format: 'YYYY.MM.DD',
              }}
              valueType="time"
            >
              {moment().valueOf()}
            </ProDescriptions.Item>

            <ProDescriptions.Item
              label="时间日期"
              fieldProps={{
                format: 'YYYY.MM.DD HH:mm:SS',
              }}
              valueType="dateTime"
            >
              {moment().valueOf()}
            </ProDescriptions.Item>

            <ProDescriptions.Item
              label="更新时间"
              fieldProps={{
                format: 'YYYY.MM.DD',
              }}
              valueType="fromNow"
            >
              {moment().add(-1, 'month').valueOf()}
            </ProDescriptions.Item>
          </ProDescriptions>
        </ProCard>
      </div>
  );
};

export default ShopDetailPage;
