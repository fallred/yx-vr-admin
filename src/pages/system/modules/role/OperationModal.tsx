import React, { FC, useEffect, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import moment from "moment";
import { Modal, Form, Input } from "antd";
import {
  ProForm,
  ModalForm,
  ProFormText,
  ProFormTextArea,
  ProFormTreeSelect
} from '@ant-design/pro-components';
import { userMenuTreeState } from "@/stores/recoilState";
import { IRole, IRoleList, IRolePaginationResp } from "@/models/role";

const { SHOW_PARENT } = ProFormTreeSelect;

interface OperationModalProps {
  visible: boolean;
  current: Partial<IRole> | undefined;
  onSubmit: (values: IRole) => void;
  onCancel: () => void;
}

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const OperationModal: FC<OperationModalProps> = (props) => {
  const userMenuTree = useRecoilValue(userMenuTreeState);
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
      onSubmit(values as IRole);
    }
  };

  const modalFooter = { okText: "保存", onOk: handleSubmit, onCancel };

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
        </Form>
    );
  };

  return (
    <Modal
      title={`角色${current ? "编辑" : "添加"}`}
      width={640}
      bodyStyle={{ padding: "28px 0 0" }}
      destroyOnClose
      visible={visible}
      {...modalFooter}
    >
      {getModalContent()}
    </Modal>
  );
};

export default OperationModal;
