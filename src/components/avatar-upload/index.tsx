import React from 'react';
import { Upload, message } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd/es/upload/interface';
import $axios, {useAxios, opt} from '@/api/config';

const env = import.meta.env.VITE_NODE_ENV;
const BASE_URL = import.meta.env.VITE_BASE_URL;

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
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.imageUrl !== prevState.imageUrl) {
      // 通过对比nextProps和prevState，返回一个用于更新状态的对象
      return {
        imageUrl: nextProps.imageUrl
      }
    }
    return null;
  }
  handleChange = info => {
    const {fileList} = this.state;
    let newFileList = [...info.fileList];
    // console.log('file info:', info);
    // console.log('fileList:', fileList);
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
      getBase64(info.file.originFileObj, imgUrl => {
        this.setState({
          imageUrl: imgUrl,
          loading: false,
        });
      });
    }
  };
  getValue = () => {
    return this.state.imageUrl;
  };
  render() {
    const accessToken = localStorage.getItem('accessToken');
    const uploadProps = {
        name: "avatar",
        showUploadList: false,
        // action: `${BASE_URL}/app/file/upload`,
        // multiple: false,
        listType: "picture-card",
        className: "avatar-uploader",
        beforeUpload,
        // onChange: this.handleChange,
        headers: {
          accessToken,
        },
        customRequest:  async info => {
          //手动上传
          const formData = new FormData();
          // 名字和后端接口名字对应
          formData.append('file', info.file);
          console.log('formData:', formData);
          // try {
              const response = await $axios.post(
                `/app/file/upload`,
                formData,
                {
                    headers: {
                      'Content-type': 'application/x-www-form-urlencoded'
                    }
                }
             );
             console.log('upload success response:', response);
              // const response = await uploadFilePromise(formData);
              //上传成功回调
              if (response.status === 200) {
                const imgUrl = response.data?.data ?? '';
                console.log('upload success imgUrl:', imgUrl);
                // this.setState({
                //   imageUrl: imgUrl,
                // });
                this.props.handleAvatarChange(imgUrl);
                message.success('上传成功！');
              }
          // }
          // catch (error) {
          //   message.error('上传失败！');
          // }
        },
        onRemove: file => {
          //删除图片调用
          this.setState(state => {
            const index = state.fileList.indexOf(file);
            const newFileList = state.fileList.slice();
            newFileList.splice(index, 1);
            return {
              fileList: newFileList,
            };
          });
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
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
    );
  }
}
export default AvatarUpload;