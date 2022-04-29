import React, { useEffect, useRef, useState } from "react";
import { PageContainer } from "@ant-design/pro-layout";
import UserList from "./modules/user/index";

const UserMngPage = () => {
  return (
    <PageContainer>
      <UserList /> 
    </PageContainer>
  );
};

export default UserMngPage;
