import React, { FC, useEffect, useState, useRef } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import moment from 'moment';
import { Modal, Form, Input, Drawer, Space, Button } from 'antd';
import {
  ProCard,
  ProForm,
  ProFormText,
  ProFormDatePicker,
  ProFormDigit,
} from '@ant-design/pro-components';
import { IShopTask } from '@/models/shop-task';
import locale from 'antd/es/date-picker/locale/zh_CN';

interface ShopTaskFormProps {
  visible: boolean;
  current: Partial<IShopTask> | undefined;
  onSubmit: (values: IShopTask) => void;
  onCancel: () => void;
}

const formLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
};

const ShopTaskForm: FC<ShopTaskFormProps> = (props) => {
  const formRef = useRef(null);
  const [form] = Form.useForm();
  const {visible, current, onCancel, onSubmit} = props;

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
            // tm: current.tm ? moment(current.tm) : null,
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
        onSubmit(values);
    }
  };

  const getModalContent = () => {
    return (
      <Form
        {...formLayout}
        ref={formRef}
        form={form}
        onFinish={handleFinish}
      >
        {/* <ProFormText
          name="appId"
          label="门店编号"
          disabled
          rules={[
            {
              required: false,
              message: '请输入门店编号',
            },
          ]}
        /> */}
        <ProFormDigit 
          name="taskAmount"
          label="任务量"
          min={1}
          fieldProps={{ precision: 0 }}
          rules={[
            {
              required: true,
              message: '请输入任务量',
            },
          ]}
        />
        <ProFormDatePicker
          name="tm"
          label="日期"
          format="yyyy-MM"
          picker="month"
          locale={locale}
          rules={[
            {
              required: true,
              message: '请选择日期',
            },
          ]}
        />
    </Form>
    );
  };

  return (
    <Drawer
      title={`门店任务${current ? "编辑" : "添加"}`}
      width={480}
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

export default ShopTaskForm;
