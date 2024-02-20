import { Button, Form, Input, InputNumber, Radio } from 'antd';
import { useEffect } from 'react';

import { useCreateArea, useUpdateArea } from '@/services/area';
import { useListDictSingleType } from '@/services/dictionary';
import { PAGE_MAX_LIMIT } from '@/utils/constants';

import { InputType } from './list.page';

interface AreaEditFormProps {
    clickOne: InputType;
}

export const AreaEditForm: React.FC<AreaEditFormProps> = ({ clickOne }) => {
    const [form] = Form.useForm();
    const { mutateAsync: updateMutate } = useUpdateArea();
    const { mutateAsync: createMutate } = useCreateArea();
    const { listDataItems } = useListDictSingleType('AREA_LEVEL', 1, PAGE_MAX_LIMIT);
    useEffect(() => {
        form.resetFields();
        form.setFieldsValue(clickOne);
    }, [clickOne]);

    // 表单提交并刷新
    const onFinishHandler = async (values: InputType) => {
        if (values.id) {
            updateMutate(values);
        } else {
            createMutate(values);
        }
    };
    return (
        <Form
            form={form}
            layout="vertical"
            name="form_in_area"
            initialValues={clickOne}
            onFinish={onFinishHandler}
        >
            <Form.Item name="id" hidden>
                <Input />
            </Form.Item>
            {!clickOne.id && (
                <Form.Item name="parent" hidden>
                    <Input />
                </Form.Item>
            )}
            <Form.Item name="parentId" label="上级ID">
                <Input disabled />
            </Form.Item>
            <Form.Item
                name="label"
                label="名称"
                rules={[{ required: true, message: '名称不能为空' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="code"
                label="编码"
                rules={[{ required: true, message: '编码不能为空' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item name="fullName" label="全名">
                <Input />
            </Form.Item>
            <Form.Item name="longitude" label="经度">
                <Input />
            </Form.Item>
            <Form.Item name="latitude" label="纬度">
                <Input />
            </Form.Item>
            <Form.Item name="source" label="数据来源">
                <Radio.Group buttonStyle="solid">
                    <Radio.Button value="01">爬取</Radio.Button>
                    <Radio.Button value="02" defaultChecked>
                        新增
                    </Radio.Button>
                </Radio.Group>
            </Form.Item>
            <Form.Item
                name="level"
                label="行政区级"
                rules={[{ required: true, message: '行政区级不能为空' }]}
            >
                <Radio.Group buttonStyle="solid">
                    {listDataItems &&
                        listDataItems.map((item) => (
                            <Radio key={item.id?.toString()} value={item.code}>
                                {item.name}
                            </Radio>
                        ))}
                </Radio.Group>
            </Form.Item>
            <Form.Item name="sortValue" label="排序">
                <InputNumber />
            </Form.Item>
            <Form.Item>
                <Button danger type="dashed" size="large" htmlType="submit">
                    {clickOne.id ? '修改' : '新增'}
                </Button>
            </Form.Item>
        </Form>
    );
};
