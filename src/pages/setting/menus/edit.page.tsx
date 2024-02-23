import { InfoCircleOutlined } from '@ant-design/icons';
import {
    Button,
    Col,
    Form,
    Input,
    InputNumber,
    Popover,
    Radio,
    RadioChangeEvent,
    Row,
    Switch,
} from 'antd';
import { useEffect, useState } from 'react';

import { useDictListTypes } from '@/services/dictionary';
import { useCreateMenu, useUpdateMenu } from '@/services/menu';
import { DATA_SCOPE_CUSTOM } from '@/utils/constants';
import { MyFormItem } from '@/utils/cutom-form-item';

import { InputType } from './list.page';

import { PermissionType } from '#/enum';

interface MenuEditFormProps {
    clickOne: InputType;
}

export const MenuEditForm: React.FC<MenuEditFormProps> = ({ clickOne }: MenuEditFormProps) => {
    const [form] = Form.useForm();
    const [isShowMenu, setIsShowMenu] = useState(true);
    const [isShowImplementClass, setIsShowImplementClass] = useState(false);
    const { data: dictListTypes } = useDictListTypes("'RESOURCE_TYPE','RESOURCE_DATA_SCOPE'");
    const { mutateAsync: updateMutate } = useUpdateMenu();
    const { mutateAsync: createMutate } = useCreateMenu();
    useEffect(() => {
        form.resetFields();
        form.setFieldsValue(clickOne);
        // 资源类型的现隐
        if (clickOne.resourceType === PermissionType.BUTTON) {
            setIsShowMenu(false);
        }
        if (clickOne.resourceType === PermissionType.CATALOGUE) {
            setIsShowMenu(true);
        }
        // 数据范围的现隐
        if (clickOne.dataScope === DATA_SCOPE_CUSTOM) {
            setIsShowImplementClass(true);
        } else {
            setIsShowImplementClass(false);
        }
    }, [clickOne, form]);

    // 资源类型变化回调
    const onChangeResourceType = (e: RadioChangeEvent) => {
        if (e.target.value === PermissionType.CATALOGUE) {
            setIsShowMenu(false);
        }
        if (e.target.value === PermissionType.CATALOGUE) {
            setIsShowMenu(true);
        }
    };
    // 数据范围变化回调
    const onChangeDataScope = (e: RadioChangeEvent) => {
        if (e.target.value === DATA_SCOPE_CUSTOM) {
            setIsShowImplementClass(true);
        } else {
            setIsShowImplementClass(false);
        }
    };
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
            colon={false}
            labelCol={{ span: 5 }}
            layout="horizontal"
            name="form_in_menu"
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
                name="name"
                label="名称"
                rules={[{ required: true, message: '名称不能为空' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="label"
                label="标签"
                rules={[{ required: true, message: '标签不能为空' }]}
            >
                <Input />
            </Form.Item>
            <MyFormItem
                name="resourceType"
                label="类型"
                rules={[{ required: true, message: '类型不能为空' }]}
                render={(children) => <div>{children}</div>}
            >
                <Radio.Group className="mx-3" buttonStyle="solid" onChange={onChangeResourceType}>
                    {dictListTypes?.RESOURCE_TYPE &&
                        dictListTypes?.RESOURCE_TYPE.map((item) => (
                            <Radio key={item.id?.toString()} value={item.code}>
                                {item.name}
                            </Radio>
                        ))}
                </Radio.Group>
            </MyFormItem>
            <Row gutter={24}>
                <Col offset={3} span={9}>
                    <Form.Item name="state" label="状态" valuePropName="checked">
                        <Switch checkedChildren="启用" unCheckedChildren="禁用" defaultChecked />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <MyFormItem
                        name="isGeneral"
                        label="通用菜单"
                        valuePropName="checked"
                        render={(children) => (
                            <div>
                                <Popover
                                    className="mx-1"
                                    color="#404040"
                                    content={
                                        <span className="text-white">
                                            无需分配给角色，大家都拥有的菜单
                                        </span>
                                    }
                                >
                                    <InfoCircleOutlined className="mt-2" />
                                </Popover>
                                {children}
                            </div>
                        )}
                    >
                        <Switch
                            className="-mr-5" // 这里没起作用
                            checkedChildren="是"
                            unCheckedChildren="否"
                            defaultChecked={false}
                        />
                    </MyFormItem>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col offset={3} span={9}>
                    <Form.Item name="sortValue" label="排序">
                        <InputNumber />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="group"
                        label="分组"
                        tooltip={{
                            title: '一个应用中有多组不同的菜单时使用',
                            icon: <InfoCircleOutlined className="mt-2" />,
                        }}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            {isShowMenu && (
                <div>
                    <Form.Item
                        name="path"
                        label="地址栏路径"
                        tooltip={{
                            title: '浏览器地址栏 # 号后的路径',
                            icon: <InfoCircleOutlined className="mt-2" />,
                        }}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="component"
                        label="页面路径"
                        tooltip={{
                            title: '前端项目src/views后的页面路径',
                            icon: <InfoCircleOutlined className="mt-2" />,
                        }}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item name="icon" label="菜单图标">
                        <Input />
                    </Form.Item>
                </div>
            )}
            {!isShowMenu && (
                <div>
                    <MyFormItem
                        className="-translate-x-6"
                        name="dataScope"
                        label="数据范围"
                        render={(children) => (
                            <Row gutter={24}>
                                <Col span={1}>
                                    <Popover
                                        color="#404040"
                                        content={
                                            <div className="text-white">
                                                每种数据范围对应一个DataScopeProvider接口的实现类，
                                                <br />
                                                “自定义”需要自己编写实现类，并implements
                                                DataScopeProvider
                                            </div>
                                        }
                                    >
                                        <InfoCircleOutlined className="mt-2" />
                                    </Popover>
                                </Col>
                                <Col span={22}>{children}</Col>
                            </Row>
                        )}
                    >
                        <Radio.Group
                            className="mx-0.5"
                            buttonStyle="solid"
                            onChange={onChangeDataScope}
                        >
                            {dictListTypes?.RESOURCE_DATA_SCOPE &&
                                dictListTypes?.RESOURCE_DATA_SCOPE.map((item) => (
                                    <Radio key={item.id?.toString()} value={item.code}>
                                        {item.name}
                                    </Radio>
                                ))}
                        </Radio.Group>
                    </MyFormItem>
                    <Row gutter={24}>
                        <Col offset={2} span={14}>
                            <MyFormItem
                                className="-translate-x-6"
                                name="isDef"
                                label="是否默认"
                                valuePropName="checked"
                                render={(children) => (
                                    <div>
                                        <Popover
                                            className="mr-3"
                                            color="#404040"
                                            content={
                                                <span className="text-white">
                                                    若某个菜单或视图决定后台接口启用了数据权限，请至少为该菜单或视图配置一个默认数据权限
                                                </span>
                                            }
                                        >
                                            <InfoCircleOutlined className="ml-1 mt-2" />
                                        </Popover>
                                        {children}
                                    </div>
                                )}
                            >
                                <Switch
                                    checkedChildren="是"
                                    unCheckedChildren="否"
                                    defaultChecked={false}
                                />
                            </MyFormItem>
                        </Col>
                        <Col span={8}>
                            {isShowImplementClass && (
                                <MyFormItem
                                    className="-translate-x-24"
                                    name="customClass"
                                    label="实现类"
                                    render={(children) => (
                                        <Row gutter={24}>
                                            <Col span={1}>
                                                <Popover
                                                    className="mr-3"
                                                    color="#404040"
                                                    content={
                                                        <div className="text-white">
                                                            1.
                                                            自行创建一个类，并实现DataScopeProvider接口
                                                            <br />
                                                            2.
                                                            在实现类上标记注解：@Component(“DATA_SCOPE_XXXX”)
                                                            <br />
                                                            3. 在此参数上配置：DATA_SCOPE_XXXX
                                                        </div>
                                                    }
                                                >
                                                    <InfoCircleOutlined className="mt-2" />
                                                </Popover>
                                            </Col>
                                            <Col span={20}>{children}</Col>
                                        </Row>
                                    )}
                                >
                                    <Input />
                                </MyFormItem>
                            )}
                        </Col>
                    </Row>
                </div>
            )}
            <Form.Item name="describe" label="描述">
                <Input />
            </Form.Item>
            <Form.Item>
                <Button danger type="dashed" size="large" htmlType="submit">
                    {clickOne.id ? '修改' : '新增'}
                </Button>
            </Form.Item>
        </Form>
    );
};
