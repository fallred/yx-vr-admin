import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Result } from 'antd';
import { useLocale } from '@/locales';

const NotificationPage: React.FC<{}> = () => {
  const navigate = useNavigate();
  const { formatMessage } = useLocale();
  return (
    <div className='notification'>
        公告
    </div>
  );
};

export default NotificationPage;
