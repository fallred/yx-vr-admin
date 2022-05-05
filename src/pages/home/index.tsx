import React, { useEffect, useRef, useState } from "react";
import { Image } from 'antd';
import homeImg from "@/assets/home.png";

function Home() {
    return (
      <Image
        width="100%"
        src={homeImg}
      />
    );
  }
  
export default () => <Home />;