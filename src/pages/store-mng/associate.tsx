import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import UserList from '../system/modules/user/index';

const AssociateMngPage: React.FC<{}> = () => {
  return (
    <PageContainer>
      <UserList identityType={2} /> 
    </PageContainer>
  );
};

export default AssociateMngPage;
