import React, { FC, useEffect, useState, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import moment from "moment";
import { Modal, Form, Input, Drawer, Space, Button } from "antd";
import ProCard from "@ant-design/pro-card";
import ProForm, {
  ProFormText,
  ProFormTextArea,
  ProFormSelect,
  ProFormDateTimePicker,
  ProFormRate
} from "@ant-design/pro-form";
import {SexOptions, IdentifyOptions, ShopStoreStatusOptions} from '@/enums/common';
import { IShopStore, ShopStoreStatusEnum } from "@/models/shop-store";
import ProvinceCityArea from '@/components/province-city-area';
import AvatarUpload from '@/components/avatar-upload';

interface ShopFormProps {
  done: boolean;
  visible: boolean;
  current: Partial<IShopStore> | undefined;
  onDone: () => void;
  onSubmit: (values: IShopStore) => void;
  onCancel: () => void;
}

const formLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const ShopForm: FC<ShopFormProps> = (props) => {
  const formRef = useRef(null);
  const pcdRef = useRef<React.Component>(null);
  const [form] = Form.useForm();
  const { visible, current, onCancel, onSubmit } = props;
  const {selectedMenuTree} = current ?? {};

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
            provinceCityDistrict: {
                province: current.province,
                city: current.city,
                district: current.district,
            },
            createdAt: current.createdAt ? moment(current.createdAt) : null,
        });
    }
  }, [current]);

  const handleSubmit = () => {
    if (!form) return;
    const formData = form.getFieldsValue();
    const pcdData = pcdRef?.current?.getValue();
    form.setFieldsValue({
        ...formData,
        ...pcdData,
    });
    form.submit();
  };

  const handleFinish = async (values: { [key: string]: any }) => {
    if (onSubmit) {
        const payload = pcdRef?.current?.getValue();
        const formData = {...payload, ...values};
        onSubmit(formData);
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
                key="appId"
                name="appId"
                width="md"
                label="门店编号"
                tooltip="最长为24位"
                placeholder="请输入门店编号"
                rules={[{ required: true }]}
            />
            <ProFormText
                key="code"
                name="code"
                width="md"
                label="门店编码"
                placeholder="请输入门店编码"
                rules={[{ required: true }]}
            />
            <ProFormText
                key="franchisee"
                name="franchisee"
                width="md"
                label="加盟商"
                placeholder="请输入加盟商"
                rules={[{ required: true }]}
            />
            <ProFormRate
                key="grade"
                name="grade"
                label="门店评级"
                placeholder="请设置评级"
                width="md"
                rules={[{ required: true }]}
            />
            <ProFormText
                key="manager"
                name="manager"
                label="店长"
                width="md"
                placeholder="请输入店长姓名"
                rules={[{ required: true }]}
            />
            {/* <ProForm.Item key="managerImage" name="managerImage" label="店长头像">
              <AvatarUpload />
            </ProForm.Item> */}
            <ProFormText
                key="nm"
                name="nm"
                width="md"
                label="门店名称"
                placeholder="请输入门店名称"
                rules={[{ required: true }]}
            />
            <ProForm.Item
                key="provinceCityDistrict"
                name="provinceCityDistrict"
                width="md"
                label="省市区"
                placeholder="请选择省市区"
                rules={[{ required: true }]}
            >
                <ProvinceCityArea cdRef={pcdRef} hasFormItemWrap={false} />
            </ProForm.Item>
            <ProFormText
                key="address"
                name="address"
                width="md"
                label="详细地址"
                placeholder="请输入详细地址"
                rules={[{ required: true }]}
            />
            <ProFormText
                key="partner"
                name="partner"
                width="md"
                label="合伙人"
                placeholder="请输入合伙人"
                rules={[{ required: true }]}
            />
            <ProFormSelect
                key="status"
                name="status"
                label="状态"
                width="md"
                options={ShopStoreStatusOptions}
                placeholder="选择账号状态"
            />
            <ProFormDateTimePicker
                key="tm"
                name="tm"
                label="签约时间"
                fieldProps={{
                    format: (value) => value.format('YYYY-MM-DD'),
                }}
            />
        </ProCard>
    </Form>
    );
  };

  return (
    <Drawer
      title={`门店${current ? "编辑" : "添加"}`}
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

export default ShopForm;
