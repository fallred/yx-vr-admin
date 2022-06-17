import React from 'react';
import { useNavigate } from 'react-router-dom';
import { NotificationOutlined } from '@ant-design/icons';
import NoticeView from '@/pages/notification/index';

const NotificationPage: React.FC<{}> = () => {
  const navigate = useNavigate();
  return (
    <div className='notification'>
        <Badge dot>
          <NotificationOutlined style={{ fontSize: 16 }} />
        </Badge>
        <NoticeView />
    </div>
  );
};

export default NotificationPage;
