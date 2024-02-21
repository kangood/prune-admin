import { Button, Card, Col, Form, Input, Row, Tree } from 'antd';
import { useState } from 'react';

import { useDeleteMultiArea, useListAreaTree } from '@/services/area';

import { AreaEditForm } from './edit.page';

export interface InputType {
    id?: string;
    // 生成树用
    parent?: string;
    // 展示用
    parentId?: string;
    label?: string;
    code?: string;
    fullName?: string;
    longitude?: string;
    latitude?: string;
    source?: string;
    level?: string;
    sortValue?: number;
}

export default function Areas() {
    const [form] = Form.useForm();
    const defaultClickOne: InputType = { source: '02' };
    // 状态定义
    const [checkedKeys, setCheckedKeys] = useState<string[]>();
    const [clickOne, setClickOne] = useState<InputType>(defaultClickOne);
    // API-hook
    const { data: listTree } = useListAreaTree();
    const { mutateAsync } = useDeleteMultiArea();
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
                <Col span={12}>
                    <Form form={form}>
                        <Row gutter={24}>
                            <Col span={9}>
                                <Form.Item name="name">
                                    <Input placeholder="名称" allowClear />
                                </Form.Item>
                            </Col>
                            <Col span={3}>
                                <Form.Item name="search">
                                    <Button type="primary" htmlType="submit">
                                        搜索
                                    </Button>
                                </Form.Item>
                            </Col>
                            <Col span={3}>
                                <Button type="primary">重置</Button>
                            </Col>
                            <Col span={3}>
                                <Button type="primary" onClick={addHandler}>
                                    添加
                                </Button>
                            </Col>
                            <Col span={3}>
                                <Button type="primary" onClick={delHandler}>
                                    删除
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                    <Row>
                        <Col span={24}>
                            <Card>
                                {listTree && (
                                    <Tree
                                        checkable
                                        checkStrictly
                                        // 默认展开所有树节点
                                        defaultExpandAll
                                        // 点击复选框触发
                                        onCheck={onCheck}
                                        // 点击树节点触发
                                        onSelect={onSelect}
                                        treeData={listTree}
                                        fieldNames={{ title: 'label', key: 'id' }}
                                    />
                                )}
                            </Card>
                        </Col>
                    </Row>
                </Col>
                <Col span={12}>
                    <Card title={clickOne.id ? '修改' : '新增'}>
                        <AreaEditForm clickOne={clickOne} />
                    </Card>
                </Col>
            </Row>
        </div>
    );
}
