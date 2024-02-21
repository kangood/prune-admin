import { Form, Input, Modal, Radio, TreeSelect } from 'antd';
import { useState } from 'react';

import { useListOrgTree } from '@/services/org';
import { useCreateStation, useUpdateStation } from '@/services/station';

import { OutputType } from './constants';

interface StationEditFormProps {
    clickOne?: OutputType;
    onClose: () => void;
}

export const StationEditForm: React.FC<StationEditFormProps> = ({ clickOne, onClose }) => {
    const [form] = Form.useForm();
    const { mutateAsync: updateMutate } = useUpdateStation();
    const { mutateAsync: createMutate } = useCreateStation();
    const { data: listOrgTree } = useListOrgTree();
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
            <Form form={form} layout="vertical" name="form_in_station" initialValues={clickOne}>
                <Form.Item name="id" hidden>
                    <Input />
                </Form.Item>
                <Form.Item
                    name="name"
                    label="岗位名称"
                    rules={[{ required: true, message: '岗位名称不能为空' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item name="orgId" label="机构">
                    <TreeSelect
                        showSearch
                        style={{ width: '100%' }}
                        value={treeValue}
                        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                        placeholder="机构"
                        allowClear
                        treeDefaultExpandAll
                        onChange={onChange}
                        treeData={listOrgTree}
                        fieldNames={{ value: 'id' }}
                    />
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
