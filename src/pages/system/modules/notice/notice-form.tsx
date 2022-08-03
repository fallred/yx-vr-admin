import React, { FC, useEffect, useState, useRef } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import moment from 'moment';
import { Modal, Form, Input, Drawer, Space, Button, Upload } from 'antd';
import {
  ProForm,
  ModalForm,
  ProFormText,
  ProFormTextArea,
  ProFormTreeSelect
} from '@ant-design/pro-components';
import { IRole, IRoleList, IRolePaginationResp } from '@/models/role';
import BraftEditor from '@/components/braft-editor/index';

interface NoticeFormProps {
  visible: boolean;
  current: Partial<IRole> | undefined;
  onSubmit: (values: IRole) => void;
  onCancel: () => void;
}

const formLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const NoticeForm: FC<NoticeFormProps> = (props: { visible: any; current: any; onCancel: any; onSubmit: any; }) => {
  const formRef = useRef(null);
  const [form] = Form.useForm();
  const { visible, current, onCancel, onSubmit } = props;
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

  const handleContentChange = (content: any) => {
    const formData = form.getFieldsValue();
    form.setFieldsValue({
      ...formData,
      content
    });
  };

  const getModalContent = () => {
    return (
      <Form
        {...formLayout}
        form={form}
        ref={formRef}
        onFinish={handleFinish}
      >
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
        {/* <ProForm.Item
          name="content"
          width="md"
          label="公告内容"
          rules={[
            {
              required: true,
              message: '请输入公告内容',
            },
          ]}
        >
            <BraftEditor
              content={current?.content ?? ''}
              handleChange={handleContentChange}
            />
        </ProForm.Item> */}
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

export default NoticeForm;
