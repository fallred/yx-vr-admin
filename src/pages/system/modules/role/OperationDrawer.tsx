import React, { FC, useEffect, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import moment from "moment";
import { Modal, Form, Input, Drawer, Space, Button } from "antd";
import AuthTree from '@/components/auth-tree/index.tsx';
import ProForm, {
  ModalForm,
  ProFormText,
  ProFormTextArea,
  ProFormTreeSelect
} from "@ant-design/pro-form";
import { menuListState } from "@/lib/recoilState";
const { SHOW_PARENT } = ProFormTreeSelect;

interface OperationDrawerProps {
  done: boolean;
  visible: boolean;
  current: Partial<API.IRole> | undefined;
  onDone: () => void;
  onSubmit: (values: API.IRole) => void;
  onCancel: () => void;
}

const formLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const OperationDrawer: FC<OperationDrawerProps> = (props) => {
  let menuList = useRecoilValue(menuListState);
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
    form.submit();
  };

  const handleFinish = async (values: { [key: string]: any }) => {
    if (onSubmit) {
      onSubmit(values as API.IRole);
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
          <ProFormTreeSelect
            name="menuCodeList"
            placeholder="Please select"
            allowClear
            width={330}
            secondary
            request={async () => {
              return menuList;
            }}
            // tree-select args
            fieldProps={{
              treeData: menuList,
              showArrow: false,
              filterTreeNode: true,
              showSearch: true,
              dropdownMatchSelectWidth: false,
              labelInValue: true,
              autoClearSearchValue: true,
              multiple: true,
              treeNodeFilterProp: 'name',
              treeCheckable: true,
              showCheckedStrategy: SHOW_PARENT,
              fieldNames: {
                label: 'name',
                value: 'code',
                children: 'children'
              },
            }}
          />
        </ProFormText>
        
        <ProFormText name="powerSelected" label="权限菜单">
            <AuthTree />
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

export default OperationDrawer;
