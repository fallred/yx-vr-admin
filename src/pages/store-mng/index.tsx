import React from 'react';
import { PageContainer } from "@ant-design/pro-layout";
import ShopList from "./shop-list";

const StoreMngPage: React.FC<{}> = () => {
  return (
    <PageContainer>
      <ShopList /> 
    </PageContainer>
  );
};

export default StoreMngPage;
