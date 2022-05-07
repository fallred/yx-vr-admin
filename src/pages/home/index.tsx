import React, { useEffect, useRef, useState } from "react";
import { Image } from 'antd';
import homeImg from "@/assets/home.png";

function Home() {
    return (
      <div className="home">
        <Image
          height="500"
          src={homeImg}
        />
      </div>
    );
  }
  
export default () => <Home />;