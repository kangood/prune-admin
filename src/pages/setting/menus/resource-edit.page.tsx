import { Form, Input, Modal } from 'antd';

import { useCreateResource, useUpdateResource } from '@/services/resource';

import { OutputType } from './list.page';

interface ResourceEditFormProps {
    clickReourceOne?: OutputType;
    onClose: () => void;
}

export const ResourceEditForm: React.FC<ResourceEditFormProps> = ({
    clickReourceOne,
    onClose,
}: ResourceEditFormProps) => {
    const [form] = Form.useForm();
    const { mutateAsync: updateMutate } = useUpdateResource();
    const { mutateAsync: createMutate } = useCreateResource();
    // 表单提交处理
    const submitHandle = async () => {
        const values = await form.validateFields();
        values.menuName = undefined;
        if (clickReourceOne?.id) {
            updateMutate(values);
        } else {
            createMutate(values);
        }
        onClose();
    };
    return (
        <Modal
            open
            title={clickReourceOne?.id ? '编辑' : '新建'}
            okText="提交"
            cancelText="取消"
            onCancel={() => onClose()}
            onOk={submitHandle}
        >
            <Form form={form} layout="vertical" name="form_in_role" initialValues={clickReourceOne}>
                <Form.Item name="id" hidden>
                    <Input />
                </Form.Item>
                <Form.Item name="menuId" hidden>
                    <Input />
                </Form.Item>
                <Form.Item name="menuName" label="所属菜单">
                    <Input disabled />
                </Form.Item>
                <Form.Item
                    name="code"
                    label="编码"
                    rules={[{ required: true, message: '编码不能为空' }]}
                >
                    <Input disabled={!!clickReourceOne?.id} />
                </Form.Item>
                <Form.Item
                    name="name"
                    label="名称"
                    rules={[{ required: true, message: '资源名称不能为空' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item name="describe" label="描述">
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};
