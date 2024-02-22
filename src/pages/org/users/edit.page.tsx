import { Form, Input, Modal, Radio, Select, Tooltip, TreeSelect } from 'antd';
import { useState } from 'react';

import { OSSImageUploadQiniu } from '@/components/oss-img-upload-qiniu';
import { DictMapListType } from '@/pages/setting/dictionaries/constants';
import { useListOrgTree } from '@/services/org';
import { useListStation } from '@/services/station';
import { useCreateUser, useUpdateUser } from '@/services/user';

import { OutputType } from './constants';

interface UserEditFormProps {
    clickOne?: OutputType;
    onClose: () => void;
    dictListTypes: DictMapListType | undefined;
}

export const UserEditForm: React.FC<UserEditFormProps> = ({ clickOne, onClose, dictListTypes }) => {
    const [form] = Form.useForm();
    const { mutateAsync: updateMutate } = useUpdateUser();
    const { mutateAsync: createMutate } = useCreateUser();
    const { data: listOrgTree } = useListOrgTree();
    const { data: listStation } = useListStation();
    // 表单提交处理
    const submitHandle = async () => {
        const values = await form.validateFields();
        values.avatar = typeof values.avatar === 'string' ? values.avatar : values.avatar?.url;
        if (clickOne?.id) {
            updateMutate(values);
        } else {
            createMutate(values);
        }
        onClose();
    };
    // 树结构数据处理
    const [treeValue, setTreeValue] = useState<string>();
    const onChange = (newValue: string) => {
        setTreeValue(newValue);
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
                    name="account"
                    label="账号"
                    rules={[{ required: true, message: '账号名称不能为空' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="name"
                    label="姓名"
                    rules={[{ required: true, message: '姓名不能为空' }]}
                >
                    <Input />
                </Form.Item>
                {!clickOne?.id && (
                    <Form.Item
                        name="password"
                        label="密码"
                        rules={[{ required: true, message: '密码不能为空' }]}
                    >
                        <Tooltip placement="topLeft" title="用户的默认密码为123456">
                            <Input.Password defaultValue="123456" />
                        </Tooltip>
                    </Form.Item>
                )}
                <Form.Item name="avatar" label="头像">
                    <OSSImageUploadQiniu />
                </Form.Item>
                <Form.Item name="orgId" label="机构">
                    <TreeSelect
                        showSearch
                        style={{ width: '100%' }}
                        value={treeValue}
                        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                        placeholder="选择一个机构"
                        allowClear
                        treeDefaultExpandAll
                        onChange={onChange}
                        treeData={listOrgTree}
                        fieldNames={{ value: 'id' }}
                    />
                </Form.Item>
                <Form.Item name="stationId" label="岗位">
                    <Select
                        showSearch
                        placeholder="选择一个岗位"
                        // optionFilterProp="label"
                        // onChange={onChange}
                        // onSearch={onSearch}
                        filterOption={(input, option) =>
                            (option?.name ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        fieldNames={{ value: 'id', label: 'name' }}
                        options={listStation?.items}
                    />
                </Form.Item>
                <Form.Item name="email" label="邮箱">
                    <Input />
                </Form.Item>
                <Form.Item name="mobile" label="电话">
                    <Input />
                </Form.Item>
                <Form.Item
                    name="sex"
                    label="性别"
                    rules={[{ required: true, message: '性别不能为空' }]}
                >
                    <Select
                        showSearch
                        placeholder="选择性别"
                        options={[
                            { label: '男', value: 'M' },
                            { label: '女', value: 'W' },
                            { label: '未知', value: 'N' },
                        ]}
                    />
                </Form.Item>
                <Form.Item name="nation" label="民族">
                    <Select
                        showSearch
                        placeholder="选择一个民族"
                        optionFilterProp="label"
                        // onChange={onChange}
                        // onSearch={onSearch}
                        filterOption={(input, option) =>
                            (option?.name ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        fieldNames={{ value: 'code', label: 'name' }}
                        options={dictListTypes?.NATION}
                    />
                </Form.Item>
                <Form.Item name="education" label="学历">
                    <Select
                        showSearch
                        placeholder="选择一个学历"
                        optionFilterProp="label"
                        // onChange={onChange}
                        // onSearch={onSearch}
                        filterOption={(input, option) =>
                            (option?.name ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        fieldNames={{ value: 'code', label: 'name' }}
                        options={dictListTypes?.EDUCATION}
                    />
                </Form.Item>
                <Form.Item name="positionStatus" label="职位状态">
                    <Select
                        showSearch
                        placeholder="选择一个职位状态"
                        optionFilterProp="label"
                        // onChange={onChange}
                        // onSearch={onSearch}
                        filterOption={(input, option) =>
                            (option?.name ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        fieldNames={{ value: 'code', label: 'name' }}
                        options={dictListTypes?.POSITION_STATUS}
                    />
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
                <Form.Item name="workDescribe" label="个人描述">
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};
