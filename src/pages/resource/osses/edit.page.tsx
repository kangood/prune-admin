import { Form, Input, Modal, Radio } from 'antd';

import { DictMapListType } from '@/pages/setting/dictionaries/constants';
import { useCreateOss, useUpdateOss } from '@/services/oss';

import { OutputType } from './constants';

interface OssEditFormProps {
    clickOne?: OutputType;
    onClose: () => void;
    dictListTypes: DictMapListType | undefined;
}

export const OssEditForm: React.FC<OssEditFormProps> = ({ clickOne, onClose, dictListTypes }) => {
    const [form] = Form.useForm();
    const { mutateAsync: updateMutate } = useUpdateOss();
    const { mutateAsync: createMutate } = useCreateOss();
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
            width={820}
            open
            title={clickOne?.id ? '编辑' : '新建'}
            okText="提交"
            cancelText="取消"
            onCancel={() => onClose()}
            onOk={submitHandle}
        >
            <Form
                form={form}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 18 }}
                layout="horizontal"
                name="form_in_edit"
                initialValues={clickOne}
            >
                <Form.Item name="id" hidden>
                    <Input />
                </Form.Item>
                <Form.Item
                    name="category"
                    label="种类"
                    rules={[{ required: true, message: '种类不能为空' }]}
                >
                    <Radio.Group buttonStyle="solid">
                        {dictListTypes &&
                            dictListTypes?.OSSC_CATEGORY.map((item) => (
                                <Radio key={item.id?.toString()} value={item.code}>
                                    {item.name}
                                </Radio>
                            ))}
                    </Radio.Group>
                </Form.Item>
                <Form.Item
                    name="code"
                    label="资源编码"
                    rules={[{ required: true, message: '资源编码不能为空' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="endpoint"
                    label="资源地址"
                    rules={[{ required: true, message: '资源地址不能为空' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="bucketName"
                    label="空间名"
                    rules={[{ required: true, message: '空间名不能为空' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="accessKey"
                    label="accessKey"
                    rules={[{ required: true, message: 'accessKey 不能为空' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="secretKey"
                    label="secretKey"
                    rules={[{ required: true, message: 'secretKey 不能为空' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="state"
                    label="状态"
                    rules={[{ required: true, message: '状态不能为空' }]}
                >
                    <Radio.Group buttonStyle="solid">
                        <Radio.Button value>启用</Radio.Button>
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
