import React from 'react';
import { PageContainer } from "@ant-design/pro-layout";
import ShopTableCard from "./shop-table-card";

const StoreMngPage: React.FC<{}> = () => {
  return (
    <PageContainer>
      <ShopTableCard showOperate={true} /> 
    </PageContainer>
  );
};

export default StoreMngPage;