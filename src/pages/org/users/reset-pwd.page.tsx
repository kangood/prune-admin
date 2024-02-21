import { Form, Input, Modal } from 'antd';

import { useUpdateUser } from '@/services/user';

interface ResetPwdFormProps {
    clickId?: string;
    onClose: () => void;
}

export const ResetPwdForm: React.FC<ResetPwdFormProps> = ({ clickId, onClose }) => {
    const [form] = Form.useForm();
    const { mutateAsync: updateMutate } = useUpdateUser();
    // 表单提交处理
    const submitHandle = async () => {
        const values = await form.validateFields();
        values.id = clickId;
        updateMutate(values);
        onClose();
    };
    return (
        <Modal
            open
            title="修改密码"
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
                name="form_in_reset_pwd"
            >
                <Form.Item name="id" hidden>
                    <Input />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="密码"
                    hasFeedback
                    rules={[
                        { required: true, message: '密码不能为空' },
                        {
                            pattern: /^(?![0-9]+$)(?![a-z]+$)[a-z0-9]{6,}$/,
                            message: '有且只能包含小写字母和数字，长度大于 6',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    name="confirmPassword"
                    label="确认密码"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: '确认密码不能为空',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('两次密码输入不一致'));
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>
            </Form>
        </Modal>
    );
};
