import React, { FC, useEffect, useState, useRef } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import moment from 'moment';
import {
  Modal, Form, Input,
  Drawer, Space, Button,
  Popover, Rate
} from 'antd';
import {
  ProCard,
  ProForm,
  ProFormText,
  ProFormTextArea,
  ProFormSelect,
  ProFormDateTimePicker,
  ProFormRate
} from '@ant-design/pro-components';
import {SexOptions, IdentifyOptions, ShopStoreStatusOptions} from '@/enums/common';
import { IShopStore, ShopStoreStatusEnum, IProvinceCityDistrict } from "@/models/shop-store";
import ProvinceCityArea from '@/components/province-city-area';
import AvatarUpload from '@/components/avatar-upload';
import WithRate from '@/components/with-rate';
import {dateTimeFormat, dateMonthFormat} from '@/lib/common';

interface ShopFormProps {
  visible: boolean;
  current: Partial<IShopStore> | undefined;
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
  const [pcdData, setPcdData] = useState<IProvinceCityDistrict>({});
  const [pcdCompVisible, setPcdCompVisible] = useState(false);
  // const [gradeNumber, setGradeNumber] = useState(0);
  const { visible, current, onCancel, onSubmit } = props;
  const {grade} = current ?? {};
  const {selectedMenuTree} = current ?? {};

  useEffect(() => {
    form.resetFields();
    if (current) {
        const pcdDataTemp = {
            province: current.province,
            city: current.city,
            district: current.district,
            provinceName: current.provinceName,
            cityName: current.cityName,
            districtName: current.districtName,
        };
        form.setFieldsValue({
            ...current,
            provinceCityDistrict: pcdDataTemp,
            createdAt: current.createdAt ? moment(current.createdAt) : null,
        });
        setPcdData(pcdDataTemp);
        // const gradeTemp = grade ? parseFloat(grade, 2) : 0;
        // setGradeNumber(gradeTemp);
    }
  }, [current]);

  const handleSubmit = () => {
    if (!form) return;
    const formData = form.getFieldsValue();
    const {province, city, district} = pcdData ?? {};
    form.setFieldsValue({
        ...formData,
        province, city, district
    });
    form.submit();
  };

  const handleFinish = async (values: { [key: string]: any }) => {
    // console.log('shop-form handleFinish values:', values);
    const {province, city, district} = pcdData ?? {};
    if (onSubmit) {
        const formData = {...values, province, city, district};
        onSubmit(formData);
    }
  };
  const handlePcdChange = pcdDataTemp => {
  };
  const handleGradeChange = gradeTemp => {
    form.setFieldsValue({
      ...current,
      grade: gradeTemp,
    });
  };
  const handlePcdConfirm = () => {
    setPcdCompVisible(false);
    const pcdDataTemp = pcdRef?.current?.getValue();
    const {province, city, district} = pcdDataTemp ?? {};
    form.setFieldsValue({
      provinceCityDistrict: pcdDataTemp,
      province, city, district
    });
    setPcdData(pcdDataTemp);
  };

  const handleVisibleChange = (newVisible: boolean) => {
    setPcdCompVisible(newVisible);
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
            {current ?
            (
              <>
                <ProFormText
                    key="appId"
                    name="appId"
                    width="md"
                    label="门店编号"
                    placeholder="请输入门店编号"
                    disabled={true}
                    rules={[{ required: false }]}
                />
                <ProFormText
                    key="code"
                    name="code"
                    width="md"
                    label="门店编码"
                    placeholder="请输入门店编码"
                    disabled={true}
                    rules={[{ required: false }]}
                />
              </>
            )
            : null}
            <ProFormText
                key="franchisee"
                name="franchisee"
                width="md"
                label="加盟商"
                placeholder="请输入加盟商"
                rules={[{ required: true }]}
            />
            <ProForm.Item
              name="grade"
              width="md"
              label="门店评级"
              placeholder="请设置评级"
              rules={[{ required: true }]}
            >
                {/* <Rate allowHalf value={gradeNumber} onChange={setGradeNumber} count={5} /> */}
                <WithRate
                  allowHalf
                  grade={grade}
                  onChange={handleGradeChange}
                  count={5}
                />
            </ProForm.Item>
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
            {
              <Popover
                  content={
                    <>
                      <ProvinceCityArea
                        cdRef={pcdRef}
                        hasFormItemWrap={false}
                        pcdData={pcdData}
                        change={handlePcdChange}
                      />
                      <a onClick={handlePcdConfirm}>确定</a>
                    </>
                  }
                  title="设置省市区"
                  trigger="click"
                  visible={pcdCompVisible}
                  onVisibleChange={handleVisibleChange}
                >
                  <div className="pcdLabelBox">
                    <span className="pcdLabel">
                      {`${pcdData.provinceName || ''} - ${pcdData.cityName || ''} - ${pcdData.districtName || ''}`}
                    </span>
                    <a className="pcdEditLink">编辑</a>
                  </div>
                </Popover>
              }
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
                format="YYYY-MM-DD HH:mm:ss"
                // fieldProps={{
                //     format: dateTimeFormat,
                // }}
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
