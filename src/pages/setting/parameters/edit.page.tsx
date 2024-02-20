import { Form, Input, Modal, Radio } from 'antd';
import React from 'react';

import { useCreateParamter, useUpdateParamter } from '@/services/parameter';

import { DataType } from './constants';

interface ParameterEditFormProps {
    clickOne: DataType;
    onClose: (isReload?: boolean) => void;
}

export const ParameterEditForm: React.FC<ParameterEditFormProps> = ({ clickOne, onClose }) => {
    const [form] = Form.useForm();
    const { mutateAsync: updateMutate } = useUpdateParamter();
    const { mutateAsync: createMutate } = useCreateParamter();
    // 点击提交按钮的处理
    const submitHandle = async () => {
        const values = await form.validateFields();
        if (clickOne?.id) {
            updateMutate(values);
        } else {
            createMutate(values);
        }
        onClose();
    };
    return (
        <Modal
            open
            title={clickOne?.id ? '编辑' : '新建'}
            okText="提交"
            cancelText="取消"
            onCancel={() => onClose()}
            onOk={submitHandle}
        >
            <Form form={form} layout="vertical" name="form_in_modal" initialValues={clickOne}>
                <Form.Item name="id" hidden>
                    <Input />
                </Form.Item>
                <Form.Item
                    name="key"
                    label="参数键"
                    rules={[{ required: true, message: '请填写参数键' }]}
                >
                    <Input disabled={!!clickOne?.id} />
                </Form.Item>
                <Form.Item
                    name="name"
                    label="参数名称"
                    rules={[{ required: true, message: '请填写参数名称' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="value"
                    label="参数值"
                    rules={[{ required: true, message: '请填写参数值' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item name="describe" label="描述">
                    <Input />
                </Form.Item>
                <Form.Item name="state" label="状态">
                    <Radio.Group buttonStyle="solid">
                        <Radio.Button value defaultChecked>
                            启用
                        </Radio.Button>
                        <Radio.Button value={false}>禁用</Radio.Button>
                    </Radio.Group>
                </Form.Item>
                <Form.Item name="readonly" label="内置">
                    <Radio.Group buttonStyle="solid">
                        <Radio.Button value>是</Radio.Button>
                        <Radio.Button value={false} defaultChecked>
                            否
                        </Radio.Button>
                    </Radio.Group>
                </Form.Item>
            </Form>
        </Modal>
    );
};
