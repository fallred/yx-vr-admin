import React, { FC, useEffect, useState, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import moment from "moment";
import { Modal, Form, Input, Drawer, Space, Button, Upload } from "antd";
import {
  ProForm,
  ModalForm,
  ProFormText,
  ProFormTextArea,
  ProFormTreeSelect
} from '@ant-design/pro-components';
import { IRole, IRoleList, IRolePaginationResp } from "@/models/role";
import BraftEditor from '@/components/braft-editor/index';

interface OperationDrawerProps {
  visible: boolean;
  current: Partial<IRole> | undefined;
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
  const { visible, current, onCancel, onSubmit } = props;
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
        <ProFormText
          name="title"
          label="公告标题"
          rules={[
            {
              required: true,
              message: '请输入公告标题',
            },
          ]}
        />
        <ProFormTextArea
          name="content"
          label="公告内容"
          rules={[
            {
              required: true,
              message: '请输入公告内容',
            },
          ]}
        />
        {/* <ProFormTextArea
          name="content"
          label="公告内容"
          rules={[
            {
              required: true,
              message: '请输入公告内容',
            },
          ]}
        >
            <BraftEditor content={current?.content ?? ''} />
        </ProFormTextArea> */}
      </Form>
    );
  };

  return (
    <Drawer
      title={`公告${current ? "编辑" : "添加"}`}
      width={800}
      onClose={onCancel}
      visible={visible}
      bodyStyle={{ paddingBottom: 80 }}
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
