import { Form, Input, Modal, Radio } from 'antd';

import { useCreateDict, useUpdateDict } from '@/services/dictionary';

import { OutputType } from './constants';

interface DictionaryRightEditFormProps {
    clickDict?: OutputType;
    onClose: () => void;
}

export const DictionaryRightEditForm: React.FC<DictionaryRightEditFormProps> = ({
    clickDict,
    onClose,
}) => {
    const [form] = Form.useForm();
    const { mutateAsync: updateMutate } = useUpdateDict();
    const { mutateAsync: createMutate } = useCreateDict();
    const submitHandle = async () => {
        const values = await form.validateFields();
        if (clickDict?.id) {
            updateMutate(values);
        } else {
            createMutate(values);
        }
        onClose();
    };
    return (
        <Modal
            open
            title={clickDict?.id ? '编辑' : '新建'}
            okText="提交"
            cancelText="取消"
            onCancel={() => onClose()}
            onOk={submitHandle}
        >
            <Form form={form} layout="vertical" name="form_in_modal" initialValues={clickDict}>
                <Form.Item name="id" hidden>
                    <Input />
                </Form.Item>
                <Form.Item
                    name="type"
                    label="类型"
                    rules={[{ required: true, message: '类型不能为空' }]}
                >
                    <Input disabled />
                </Form.Item>
                <Form.Item
                    name="label"
                    label="类型标签"
                    rules={[{ required: true, message: '类型标签不能为空' }]}
                >
                    <Input disabled />
                </Form.Item>
                <Form.Item
                    name="code"
                    label="编码"
                    rules={[{ required: true, message: '编码不能为空' }]}
                >
                    <Input disabled={!!clickDict?.id} />
                </Form.Item>
                <Form.Item
                    name="name"
                    label="名称"
                    rules={[{ required: true, message: '名称不能为空' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="state"
                    label="状态"
                    rules={[{ required: true, message: '状态不能为空' }]}
                >
                    <Radio.Group buttonStyle="solid">
                        <Radio.Button value defaultChecked>
                            启用
                        </Radio.Button>
                        <Radio.Button value={false}>禁用</Radio.Button>
                    </Radio.Group>
                </Form.Item>
                <Form.Item name="sortValue" label="排序">
                    <Input />
                </Form.Item>
                <Form.Item name="describe" label="描述">
                    <Input />
                </Form.Item>
                <Form.Item name="icon" label="图标">
                    <Input />
                </Form.Item>
                <Form.Item name="cssClass" label="类选择器">
                    <Input />
                </Form.Item>
                <Form.Item name="cssStyle" label="样式">
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};
