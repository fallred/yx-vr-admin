import React, { FC, useEffect, useState, useRef } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import moment from 'moment';
import { Modal, Form, Input, Drawer, Space, Button } from 'antd';
import {queryMenuAndFuncNodes} from '@/lib/tree-util';
import { IRole, IRoleList, IRolePaginationResp } from '@/models/role';
import {
  ProForm,
  ModalForm,
  ProFormText,
  ProFormTextArea,
  ProFormTreeSelect
} from '@ant-design/pro-components';
import AuthTree from '../auth-tree/index';

interface RoleFormProps {
  visible: boolean;
  current: Partial<IRole> | undefined;
  onSubmit: (values: IRole) => void;
  onCancel: () => void;
}

const formLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const RoleForm: FC<RoleFormProps> = (props) => {
  const formRef = useRef(null);
  const [form] = Form.useForm();
  const { visible, current, onCancel, onSubmit } = props;
  const {selectedMenuTree = []} = current ?? {};
  const [menuCheckedKeys, setMenuCheckedKeys] = useState<React.Key[]>([]);
  const [funcCheckedKeys, setFuncCheckedKeys] = useState<React.Key[]>([]);
  const [halfCheckedKeys, setHalfCheckedKeys] = useState<React.Key[]>([]);
  const authTreeRef = useRef<React.Component>(null);
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

  useEffect(() => {
    if (selectedMenuTree?.length > 0) {
      const {menuNodes, funcNodes, halfIds} = queryMenuAndFuncNodes(selectedMenuTree);
      setMenuCheckedKeys(menuNodes);
      setFuncCheckedKeys(funcNodes);
      setHalfCheckedKeys(halfIds);
    }
  }, [selectedMenuTree]);

  const handleSubmit = () => {
    if (!form) return;
    const formData = form.getFieldsValue();
    const selMenuTree = authTreeRef?.current?.getValue();
    const selMenuTreeJSON = JSON.stringify(selMenuTree);
    console.log('selMenuTreeJSON:', selMenuTreeJSON);
    console.log('selMenuTree:', selMenuTree);
    const powerSelected = selMenuTree ? JSON.stringify(selMenuTree) : '[]';
    form.setFieldsValue({
      ...formData,
      powerSelected
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
        <ProFormText
          name="name"
          label="角色名称"
          rules={[
            {
              required: true,
              message: '请输入角色名称',
            },
          ]}
        />
        <ProFormText
          name="code"
          label="角色编码"
          rules={[
            {
              required: true,
              message: '请输入角色编码',
            },
          ]}
        />
        <ProFormTextArea
          name="comment"
          label="角色描述"
          rules={[
            {
              required: true,
              message: '请输入角色描述',
            },
          ]}
        />
        <ProFormText name="powerSelected" label="权限菜单">
            <AuthTree
              cRef={authTreeRef}
              leftCheckedKeys={menuCheckedKeys}
              rightCheckedKeys={funcCheckedKeys}
              halfCheckedKeys={halfCheckedKeys}
            />
        </ProFormText>
        </Form>
    );
  };

  return (
    <Drawer
        title={`角色${current ? "编辑" : "添加"}`}
        width={800}
        onClose={onCancel}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
        <Space>
            <Button onClick={onCancel}>取消</Button>
            <Button onClick={handleSubmit} type="primary">
            保存
            </Button>
        </Space>
        }
    >
      {getModalContent()}
    </Drawer>
  );
};

export default RoleForm;
