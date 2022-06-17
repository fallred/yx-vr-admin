import React, {useEffect, useState} from 'react';
import { Badge, notification, Modal, Button } from 'antd';
import { NotificationOutlined } from '@ant-design/icons';
import {useQueryNoticeAll, useQueryNoticeList} from '@/api';

const Notification: React.FC<{}> = () => {
  // const queryNoticeAllPromise = useQueryNoticeAll();
  const { data: noticeListPageResp} = useQueryNoticeList({
    current: 1,
    pageSize: 10,
  }, {});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [index, setIndex] = useState(0);
  const [noticeList, setNoticeList] = useState([]);
  const [notice, setNotice] = useState({});
  const openNotification = () => {
    notification.open({
      message: 'Notification Title',
      description:
        '<div>111</div>',
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  };
  const updateNext = () => {
    const idx = index + 1 < noticeList.length  ? index + 1 : index;
    setIndex(idx);
  };
  const showModal = () => {
    setNotice(noticeList?.[index]);
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  useEffect(() => {
    setNotice(noticeList?.[index]);
  }, [index]);
  // useEffect(async () => {
  //   const nList = await queryNoticeAllPromise();
  //   setNoticeList(nList);
  // }, []);
  useEffect(async () => {
    setNoticeList(noticeListPageResp?.data);
  }, [noticeListPageResp]);
  return (
    <div className="notification">
        <Badge dot onClick={showModal}>
          <NotificationOutlined style={{ fontSize: 16 }} />
        </Badge>
        <Modal
          title={notice?.title}
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              关闭
            </Button>,
            <Button key="next" type="primary" onClick={updateNext}>
              下一个
            </Button>,
          ]}
        >
          <p dangerouslySetInnerHTML={{__html: notice?.content}}>
          </p>
        </Modal>
    </div>
  );
};

export default Notification;
