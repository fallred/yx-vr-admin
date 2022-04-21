import React, { FC, useEffect, useRef } from "react";
import moment from "moment";
import { Modal, Form, Input } from "antd";
import ProForm, {
  ModalForm,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-form";
import { menuListState } from "@stores/menu";

interface OperationModalProps {
  done: boolean;
  visible: boolean;
  current: Partial<API.IRole> | undefined;
  onDone: () => void;
  onSubmit: (values: API.IRole) => void;
  onCancel: () => void;
}

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const OperationModal: FC<OperationModalProps> = (props) => {
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
        <ProFormTreeSelect
          name="name"
          placeholder="Please select"
          allowClear
          width={330}
          secondary
          // request={async () => {
          //   return [
          //     {
          //       title: 'Node1',
          //       value: '0-0',
          //       children: [
          //         {
          //           title: 'Child Node1',
          //           value: '0-0-0',
          //         },
          //       ],
          //     },
          //     {
          //       title: 'Node2',
          //       value: '0-1',
          //       children: [
          //         {
          //           title: 'Child Node3',
          //           value: '0-1-0',
          //         },
          //         {
          //           title: 'Child Node4',
          //           value: '0-1-1',
          //         },
          //         {
          //           title: 'Child Node5',
          //           value: '0-1-2',
          //         },
          //       ],
          //     },
          //   ];
          // }}
          // tree-select args
          fieldProps={{
            treeData: menuListState,
            showArrow: false,
            filterTreeNode: true,
            showSearch: true,
            dropdownMatchSelectWidth: false,
            labelInValue: true,
            autoClearSearchValue: true,
            multiple: true,
            treeNodeFilterProp: 'name',
            fieldNames: {
              label: 'name',
            },
          }}
        />
        <ProFormTextArea
          name="auth"
          label="角色权限"
          rules={[
            {
              required: true,
              message: '请输入角色权限',
            },
          ]}
        />
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
