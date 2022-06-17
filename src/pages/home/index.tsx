import React, { useEffect, useRef, useState } from 'react';
import { Image } from 'antd';
import homeImg from '@/assets/home.png';

function Home() {
    return (
      <div className="home">
        <img
          className="home-img"
          src={homeImg}
        />
      </div>
    );
  }
  
export default () => <Home />;