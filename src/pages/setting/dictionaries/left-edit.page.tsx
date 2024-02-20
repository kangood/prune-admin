import { Form, Input, Modal, Radio } from 'antd';

import { useCreateDict, useUpdateDict } from '@/services/dictionary';

import { OutputType } from './constants';

interface DictionaryLeftEditFormProps {
    clickDict?: OutputType;
    onClose: (isReload?: boolean) => void;
}

export const DictionaryLeftEditForm: React.FC<DictionaryLeftEditFormProps> = ({
    clickDict,
    onClose,
}) => {
    const [form] = Form.useForm();
    const { mutateAsync: updateMutate } = useUpdateDict();
    const { mutateAsync: createMutate } = useCreateDict();
    const submitHandle = async () => {
        const values = await form.validateFields();
        // 这里需要 await 修改的 fetch结束，再利用 onClose(true) 去 list 页面执行 refetch
        if (clickDict?.id) {
            await updateMutate(values);
        } else {
            // 这里是字典的类型增加，所以需要 code=00
            values.code = '00';
            values.name = '';
            await createMutate(values);
        }
        onClose(true);
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
            <Form form={form} layout="vertical" name="form_in_modal_left" initialValues={clickDict}>
                <Form.Item name="id" hidden>
                    <Input />
                </Form.Item>
                <Form.Item
                    name="type"
                    label="类型"
                    rules={[{ required: true, message: '类型不能为空' }]}
                >
                    <Input disabled={!!clickDict?.id} />
                </Form.Item>
                <Form.Item
                    name="label"
                    label="类型标签"
                    rules={[{ required: true, message: '类型标签不能为空' }]}
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
            </Form>
        </Modal>
    );
};
