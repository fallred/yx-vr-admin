import React from 'react';
import { PageContainer } from "@ant-design/pro-layout";
import ShopList from "./shop-list";

const StoreMngPage: React.FC<{}> = () => {
  return (
    <PageContainer>
      <ShopList showOperate={true} /> 
    </PageContainer>
  );
};

export default StoreMngPage;
