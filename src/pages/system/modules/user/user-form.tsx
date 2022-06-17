import React, { FC, useEffect, useState, useRef } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import moment from 'moment';
import { Modal, Form, Input, Drawer, Space, Button } from 'antd';
import {
  ProCard,
  ProForm,
  ModalForm,
  ProFormText,
  ProFormTextArea,
  ProFormTreeSelect,
  ProFormSelect
} from '@ant-design/pro-components';
import {SexOptions, IdentifyOptions, UserStatusOptions} from '@/enums/common';
import {useGetRoleListAll} from '@/api';
import AvatarUpload from '@/components/avatar-upload';
import ShopTableCard from '@/pages/store-mng/shop-table-card';
import { IUser } from '@/models/user-mng';

interface UserFormProps {
  visible: boolean;
  current: Partial<IUser> | undefined;
  onSubmit: (values: IUser) => void;
  onCancel: () => void;
}

const formLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const UserForm: FC<UserFormProps> = (props) => {
  const formRef = useRef(null);
  const avatarRef = useRef(null);
  const shopTableRef = useRef<React.Component>(null);
  const [form] = Form.useForm();
  const { visible, current, onCancel, onSubmit } = props;
  const {selectedMenuTree} = current ?? {};
  const { data: roleListAll, error, isLoading, refetch } = useGetRoleListAll();
  const [roleOptions, setRoleOptions] = useState<IUser[]>();
  const [avatarUrl, setAvatarUrl] = useState<string>('');
  const [selectedApps, setSelectedApps] = useState<string[]>([]);
  const fieldNames = {label: 'name', value: 'id', key: 'id'};
  useEffect(() => {
    const options = roleListAll?.map(item => ({value: item?.id, label: item?.name}));
    setRoleOptions(options);
  }, [roleListAll]);

  // useEffect(() => {
  //   if (formRef.current) {
  //     if (!visible) {
  //       form.resetFields();
  //     }
  //   }
  // }, [formRef, visible]);

  useEffect(() => {
    form.resetFields();
    if (current) {
      form.setFieldsValue({
        ...current,
        createdAt: current.createdAt ? moment(current.createdAt) : null,
      });
      setAvatarUrl(current.imageUrl);
      const appIds = current?.apps?.map(item => item.appId);
      setSelectedApps(appIds);
    }
    // else {
    //   form.resetFields();
    // }
  }, [current]);

  const handleSubmit = () => {
    if (!form) return;
    const formData = form.getFieldsValue();
    const appIdList = shopTableRef?.current?.getValue();
    console.log('appIdList:', appIdList);
    form.setFieldsValue({
      ...formData,
      imageUrl: avatarUrl,
      appId: appIdList?.join(',') ?? '',
    });
    form.submit();
  };
  const handleAvatarChange = url => {
    setAvatarUrl(url);
    form.setFieldsValue({
      imageUrl: url,
    });
  };
  const handleFinish = async (values: { [key: string]: any }) => {
    if (onSubmit) {
      onSubmit(values as IUser);
    }
  };

  const getModalContent = () => {
    return (
      <Form
        {...formLayout}
        form={form}
        ref={formRef}
        onFinish={handleFinish}
      >
          <ProCard
            title="基本信息"
            bordered
            headerBordered
            collapsible
            style={{
              marginBottom: 16,
              minWidth: 200,
              maxWidth: '100%',
            }}
          >
            <ProFormText
                key="username"
                name="username"
                width="md"
                label="用户昵称"
                tooltip="最长为24位"
                placeholder="请输入用户昵称"
                rules={[{ required: true }]}
            />
            <ProFormText.Password
              key="password"
              name="password"
              width="md"
              label="密码"
              placeholder="请输入密码"
              rules={[{ required: true }]}
            />
            <ProFormText
                key="realName"
                name="realName"
                width="md"
                label="真实姓名"
                tooltip="最长为24位"
                placeholder="请输入用户姓名"
                rules={[{ required: true }]}
            />
            <ProFormSelect
              key="sex"
              name="sex"
              label="性别"
              width="md"
              options={SexOptions}
              placeholder="选择性别"
            />
            <ProFormSelect
              key="status"
              name="status"
              label="状态"
              width="md"
              options={UserStatusOptions}
              placeholder="选择账号状态"
            />
            {/* <ProFormText
                key="companyName"
                name="companyName"
                width="md"
                label="公司名称"
                tooltip="最长为24位"
                placeholder="请输入公司名称"
                rules={[{ required: true }]}
            /> */}
            <ProFormText key="imageUrl" name="imageUrl" label="头像设置">
              <AvatarUpload
                ref={avatarRef}
                imageUrl={avatarUrl}
                handleAvatarChange={handleAvatarChange}
              />
            </ProFormText>
            <ProFormSelect
                key="identityType"
                name="identityType"
                label="账号类型"
                width="md"
                options={IdentifyOptions}
                placeholder="选择账号类型"
              />
              <ProFormSelect
                key="roleId"
                name="roleId"
                label="角色"
                width="md"
                options={roleOptions}
                // fieldNames={fieldNames}
                placeholder="选择角色"
              />
          </ProCard>
          <ProCard
              title="数据设置"
              bordered
              headerBordered
              collapsible
              style={{
                marginBottom: 16,
                minWidth: 200,
                maxWidth: '100%',
              }}
          >
          
            <ShopTableCard
              shopTableRef={shopTableRef}
              selectedApps={selectedApps}
              showSearch={false}
              showTableTitle={false}
            />
          </ProCard>
          <ProForm.Item
              className="user-form__apps"
              name="appId"
              width="md"
              label=""
          >
          </ProForm.Item>
      </Form>
    );
  };

  return (
    <Drawer
      title={`用户${current ? "编辑" : "添加"}`}
      width={800}
      onClose={onCancel}
      visible={visible}
      bodyStyle={{ paddingBottom: 0 }}
      extra={
        <Space>
          <Button onClick={onCancel}>取消</Button>
          <Button onClick={handleSubmit} type="primary">保存</Button>
        </Space>
      }
    >
      {getModalContent()}
    </Drawer>
  );
};

export default UserForm;
