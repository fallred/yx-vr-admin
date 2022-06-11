import React from 'react';
import { Upload, message } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd/es/upload/interface';

const env = import.meta.env.VITE_NODE_ENV;

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

class AvatarUpload extends React.Component {
  state = {
    loading: false,
    imageUrl: '',
    fileList: [
      // {
      //   uid: '-1',
      //   name: 'xxx.png',
      //   status: 'done',
      //   url: 'http://www.baidu.com/xxx.png',
      // },
    ],
  };
  // static getDerivedStateFromProps(nextProps, prevState) {
  //   return {imageUrl: nextProps.value ?? ''};
  // }
  handleChange = info => {
    const {fileList} = this.state;
    let newFileList = [...info.fileList];
    console.log('file info:', info);
    console.log('fileList:', fileList);
    // 1. Limit the number of uploaded files
    // Only to show two recent uploaded files, and old ones will be replaced by the new
    newFileList = fileList.slice(-2);

    // 2. Read from response and show file link
    newFileList = fileList.map(file => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.data;
      }
      return file;
    });

    this.setState({
      fileList: newFileList
    });
  };
  handleChange1 = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // const getBase64 = (file: RcFile): Promise<string> =>
      // new Promise((resolve, reject) => {
      //   const reader = new FileReader();
      //   reader.readAsDataURL(file);
      //   reader.onload = () => resolve(reader.result as string);
      //   reader.onerror = error => reject(error);
      // });
      // Get this url from response in real world.
      console.log('info.file.originFileObj:', info.file.originFileObj);
      getBase64(info.file.originFileObj, imgUrl => {
        console.log('imageUrl:', imgUrl);
        this.setState({
          imageUrl: imgUrl,
          loading: false,
        });
      });
    }
  };
  getValue = () => {
    return this.state.fileList?.[0]?.url;
  };
  render() {
    const accessToken = localStorage.getItem('accessToken');
    const uploadProps = {
        // name: 'file',
        action: "/mock/app/file/upload",
        listType: "picture-card",
        className: "avatar-uploader",
        showUploadList: true,
        fileList: this.state.fileList,
        multiple: false,
        beforeUpload,
        onChange: this.handleChange,
        headers: {
          accessToken,
        },
    };
    const { loading, imageUrl } = this.state;
    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>上传</div>
      </div>
    );
    return (
      <Upload {...uploadProps}>
        {/* {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton} */}
        {uploadButton}
      </Upload>
    );
  }
}
export default AvatarUpload;