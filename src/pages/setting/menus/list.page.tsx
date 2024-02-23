import { SearchOutlined } from '@ant-design/icons';
import { Button, Card, Col, Form, Input, Row, Space, Tree, message } from 'antd';
import { DataNode } from 'antd/es/tree';
import { useState } from 'react';

import { useDeleteMenu, useListMenuTree } from '@/services/menu';

import { MenuEditForm } from './edit.page';
import { ResourceListPage } from './resource-list.page';

import { PermissionType } from '#/enum';

export interface InputType {
    id?: string;
    // 生成树用
    parent?: string;
    // 展示用
    parentId?: string;
    label?: string;
    resourceType?: string;
    path?: string;
    component?: string;
    icon?: string;
    dataScope?: string;
    isDef?: boolean;
    state?: boolean;
    isGeneral?: boolean;
    sortValue?: number;
    group?: string;
    describe?: string;
}

export interface OutputType {
    id?: string;
    key?: number;
    parent?: OutputType;
    children?: OutputType[];
    depth?: number;
    label?: string;
    path?: string;
    component?: string;
    isDef?: boolean;
    mpath?: string;
    icon?: string;
    resourceType?: string;
    parentId?: string;
    sortValue?: number;
    state?: boolean;
    describe?: string;
    deletedAt?: Date;
    createdAt?: Date;
    createdBy?: number;
    updatedAt?: Date;
    updatedBy?: number;
}

export default function Menus() {
    const [form] = Form.useForm();
    const defaultClickOne: InputType = {
        resourceType: PermissionType.MENU,
        state: true,
        isGeneral: false,
        isDef: false,
    };
    // 状态定义
    const [checkedKeys, setCheckedKeys] = useState<string[]>();
    const [clickOne, setClickOne] = useState<InputType>(defaultClickOne);
    // API-hook
    const { data: listMenuTree } = useListMenuTree();
    const { mutateAsync } = useDeleteMenu();
    // ==========逻辑处理==========
    // 复选框点击时处理
    const onCheck = (checked: React.Key[] | { checked: React.Key[] }) => {
        if (!Array.isArray(checked)) {
            const { checked: checkedValues } = checked;
            setCheckedKeys(checkedValues.map((key) => String(key)));
        }
    };
    // 树节点点击时处理
    const onSelect = async (selectedKeysValue: React.Key[], info: any) => {
        if (selectedKeysValue && selectedKeysValue.length > 0) {
            setClickOne(info.selectedNodes[0]);
        }
    };
    // 点击新增时的处理
    const addHandler = () => {
        if (clickOne.id) {
            defaultClickOne.parent = clickOne.id;
            defaultClickOne.parentId = clickOne.id;
            setClickOne(defaultClickOne);
        }
    };
    // 点击删除时的处理
    const delHandler = async () => {
        if (checkedKeys) {
            mutateAsync(checkedKeys);
        }
    };
    return (
        <div>
            <Row gutter={8}>
                <Col span={6}>
                    <Card>
                        <Row>
                            <Form form={form} onFinish={() => message.success('还没做')}>
                                <Space>
                                    <Button onClick={addHandler}>添加节点</Button>
                                    <Button className="ml-8" onClick={delHandler}>
                                        删除
                                    </Button>
                                </Space>
                                <Space>
                                    <span className="text-base">菜单列表</span>
                                    <Form.Item name="name">
                                        <Input
                                            className="mt-6 w-32"
                                            placeholder="搜索"
                                            allowClear
                                        />
                                    </Form.Item>
                                    <Form.Item name="search">
                                        <Button
                                            className="mt-6"
                                            icon={<SearchOutlined />}
                                            htmlType="submit"
                                        />
                                    </Form.Item>
                                </Space>
                            </Form>
                        </Row>
                        <Row>
                            {listMenuTree && (
                                <Tree
                                    checkable
                                    checkStrictly
                                    // 默认展开所有树节点
                                    defaultExpandAll
                                    // 点击复选框触发
                                    onCheck={onCheck}
                                    // 点击树节点触发
                                    onSelect={onSelect}
                                    treeData={listMenuTree as DataNode[]}
                                    fieldNames={{ title: 'name', key: 'id' }}
                                />
                            )}
                        </Row>
                    </Card>
                </Col>
                <Col span={11}>
                    <Card title={clickOne.id ? '修改' : '新增'}>
                        <MenuEditForm clickOne={clickOne} />
                    </Card>
                </Col>
                <Col span={7}>
                    <Card>
                        <ResourceListPage
                            clickMenuId={clickOne.id ?? ''}
                            clickMenuLabel={clickOne.label}
                            clickMenuResourceType={clickOne.resourceType}
                        />
                    </Card>
                </Col>
            </Row>
        </div>
    );
}
