import React, { FC, useEffect, useRef, useState, useImperativeHandle } from "react";
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import React, { useState } from 'react';
import {useImportStoreList} from '@/api';

interface IUploadFileRProps {
    // apiUrl: '',
    limit: 1,
};
const UploadFile: FC<IUploadFileRProps> = props => {
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const { mutateAsync: importStoreList } = useImportStoreList();
  const handleUpload = () => {
    const formData = new FormData();
    if (limit > 1) {
        fileList.forEach((file) => {
            formData.append('files[]', file.originFileObj);
        });
    }
    else {
        const file = fileList?.[0];
        formData.append('file', file.originFileObj);
    }
    
    setUploading(true);
    // You can use any AJAX library you like
    // fetch(apiUrl, {
    //   method: 'POST',
    //   body: formData,
    // })
    //   .then((res) => res.json())
    //   .then(() => {
    //     setFileList([]);
    //     message.success('上传成功');
    //   })
    //   .catch(() => {
    //     message.error('上传失败');
    //   })
    //   .finally(() => {
    //     setUploading(false);
    //   });

    // try {
    // }
    // catch (error) {}
    const isSuccess = await mutateAsync(formData);
    if (isSuccess) {
        setFileList([]);
        message.success('上传成功');
    }
    else {
        message.success('上传失败');
    }
    setUploading(false);
  };

  const uploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };
  return (
    <>
      <Upload {...uploadProps}>
        <Button icon={<UploadOutlined />}>选择文件</Button>
      </Upload>
      <Button
        type="primary"
        onClick={handleUpload}
        disabled={fileList.length === 0}
        loading={uploading}
        style={{
          marginTop: 16,
        }}
      >
        {uploading ? '上传中' : '点击上传'}
      </Button>
    </>
  );
};

export default UploadFile;