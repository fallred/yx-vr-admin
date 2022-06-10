import React, { Suspense, useMemo } from "react";
import { Outlet } from "react-router-dom";
import SuspendFallbackLoading from "@/pages/layout/suspendFallbackLoading";


const SubLayout: React.FC<{}> = () => {
  return (
    <Suspense fallback={<SuspendFallbackLoading />}>
      <Outlet />
    </Suspense>
  );
};

export default SubLayout;
