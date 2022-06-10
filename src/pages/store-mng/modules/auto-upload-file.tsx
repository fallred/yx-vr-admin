

import React, { FC, useEffect, useRef, useState, useImperativeHandle } from "react";
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';

interface IAutoUploadFileProps {
    apiUrl: string;
    maxCount: number;
    btnText: string;
};

const AutoUploadFile: FC<IAutoUploadFileProps> = props => {
    const uploadProps = {
        name: 'file',
        className: "auto-upload-box",
        action: props.apiUrl,
        maxCount: props.maxCount,
        multiple: props.maxCount > 1,
        headers: {
          authorization: 'authorization-text',
        },
        onChange(info) {
          if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
          }
      
          if (info.file.status === 'done') {
            message.success(`${info.file.name} 文件上传成功`);
          } else if (info.file.status === 'error') {
            message.error(`${info.file.name} 文件上传成功.`);
          }
        },
    };
    const tpl = (
    <Upload {...uploadProps}>
        <Button icon={<UploadOutlined />}>{props.btnText}</Button>
    </Upload>
    );
    return tpl;
}

export default AutoUploadFile;