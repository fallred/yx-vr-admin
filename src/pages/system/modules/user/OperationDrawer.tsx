import React, { FC, useEffect, useState, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import moment from "moment";
import { Modal, Form, Input, Drawer, Space, Button } from "antd";
import ProCard from "@ant-design/pro-card";
import ProForm, {
  ModalForm,
  ProFormText,
  ProFormTextArea,
  ProFormTreeSelect,
  ProFormSelect
} from "@ant-design/pro-form";
import {SexOptions, IdentifyOptions, UserStatusOptions} from '@/enums/common';
import {useGetRoleListAll} from "@/api";
import AvatarUpload from '@/components/avatar-upload';
import ShopStoreTable from '@/pages/store-mng/shop-list';
import { IRole, IRoleList, IRolePaginationResp } from "@/models/role";

interface OperationDrawerProps {
  done: boolean;
  visible: boolean;
  current: Partial<IRole> | undefined;
  onDone: () => void;
  onSubmit: (values: IRole) => void;
  onCancel: () => void;
}

const formLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const OperationDrawer: FC<OperationDrawerProps> = (props) => {
  const formRef = useRef(null);
  const [form] = Form.useForm();
  const { visible, current = {}, onCancel, onSubmit } = props;
  const {selectedMenuTree} = current;
  const { data: roleListAllResp, error, isLoading, refetch } = useGetRoleListAll();
  const [roleOptions, setRoleOptions] = useState<IRole[]>();
  const fieldNames = {label: 'name', value: 'id', key: 'id'};
  useEffect(() => {
    const options = roleListAllResp.data?.map(item => ({value: item?.id, label: item?.name}));
    setRoleOptions(options);
  }, [roleListAllResp]);

  useEffect(() => {
    if (formRef.current) {
      if (!visible) {
        form.resetFields();
      }
    }
  }, [formRef, visible]);

  useEffect(() => {
    if (current) {
      form.setFieldsValue({
        ...current,
        createdAt: current.createdAt ? moment(current.createdAt) : null,
      });
    }
  }, [current]);

  const handleSubmit = () => {
    if (!form) return;
    const formData = form.getFieldsValue();
    form.setFieldsValue({
      ...formData,
    });
    form.submit();
  };

  const handleFinish = async (values: { [key: string]: any }) => {
    if (onSubmit) {
      onSubmit(values as IRole);
    }
  };

  const getModalContent = () => {
    return (
      <Form {...formLayout} form={form} ref={formRef} onFinish={handleFinish}>
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
            <ProFormText
                key="companyName"
                name="companyName"
                width="md"
                label="公司名称"
                tooltip="最长为24位"
                placeholder="请输入公司名称"
                rules={[{ required: true }]}
            />
            <ProFormText
                key="attention"
                name="attention"
                width="md"
                label="关注领域"
                tooltip="最长为24位"
                placeholder="请输入关注领域"
                rules={[{ required: true }]}
            />
            <ProFormText
                key="remark"
                name="remark"
                width="md"
                label="用途说明"
                placeholder="请输入用途"
                rules={[{ required: true }]}
            />
            <ProFormText key="imgUrl" name="imgUrl" label="头像设置">
              <AvatarUpload />
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
          {/* <ProCard
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
          </ProCard> */}
          <ShopStoreTable filterType="" />
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

export default OperationDrawer;
