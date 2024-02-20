import { Form, Input, Modal, Radio } from 'antd';

import { useCreateRole, useUpdateRole } from '@/services/role';

import { OutputType as DictOutputType } from '../../setting/dictionaries/constants';

import { OutputType } from './constants';

interface StationEditFormProps {
    clickOne?: OutputType;
    onClose: () => void;
    listDict: DictOutputType[] | undefined;
}

export const StationEditForm: React.FC<StationEditFormProps> = ({
    clickOne,
    onClose,
    listDict,
}) => {
    const [form] = Form.useForm();
    const { mutateAsync: updateMutate } = useUpdateRole();
    const { mutateAsync: createMutate } = useCreateRole();
    // 表单提交处理
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
            <Form form={form} layout="vertical" name="form_in_role" initialValues={clickOne}>
                <Form.Item name="id" hidden>
                    <Input />
                </Form.Item>
                <Form.Item
                    name="code"
                    label="编码"
                    rules={[{ required: true, message: '编码不能为空' }]}
                >
                    <Input disabled={!!clickOne?.id} />
                </Form.Item>
                <Form.Item
                    name="category"
                    label="角色类别"
                    rules={[{ required: true, message: '角色类别不能为空' }]}
                >
                    <Radio.Group buttonStyle="solid">
                        {listDict &&
                            listDict.map((item) => (
                                <Radio.Button key={item.id?.toString()} value={item.code}>
                                    {item.name}
                                </Radio.Button>
                            ))}
                    </Radio.Group>
                </Form.Item>
                <Form.Item
                    name="name"
                    label="角色名称"
                    rules={[{ required: true, message: '角色名称不能为空' }]}
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
                <Form.Item name="describe" label="描述">
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};
