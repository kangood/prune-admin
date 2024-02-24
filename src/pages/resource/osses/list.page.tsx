import { Form, Row, Col, Input, Button, Table, Pagination, message, Select, Card } from 'antd';
import { useState } from 'react';

import { useDictListTypes } from '@/services/dictionary';
import { useDeleteOss, useListOssRelate } from '@/services/oss';

import { InputType, OutputType, columns } from './constants';
import { OssDetailPage } from './detail.page';
import { OssEditForm } from './edit.page';

export default function Osss() {
    const [form] = Form.useForm();
    // 状态定义
    const [listRelateParams, setListRelateParams] = useState<InputType>();
    // API-hooks
    const { data, isLoading } = useListOssRelate(listRelateParams);
    const { mutateAsync: delMutate } = useDeleteOss();
    const { data: dictListTypes } = useDictListTypes("'OSSC_CATEGORY'");
    // ==========逻辑处理==========
    // 表单提交
    const onFinishHandler = (values: InputType) => {
        setListRelateParams(values);
    };
    // 打开编辑表单处理器，点击按钮触发
    const [clickOne, setClickOne] = useState<OutputType>();
    const [showInfo, setShowInfo] = useState(false);
    const onOpenFormHandler = (record?: OutputType) => {
        if (record) {
            setClickOne(record);
        } else {
            const defaultRecord = { state: true };
            setClickOne(defaultRecord);
        }
        setShowInfo(true);
    };
    // 删除处理器，点击删除按钮触发API调用
    const onDelHandler = async (ids: string[]) => {
        delMutate(ids);
    };
    // 关闭模态窗口并刷新数据
    const closeAndRefetchHandler = () => {
        setShowInfo(false);
    };
    // 重置功能处理
    const resetHandler = () => {
        form.resetFields();
        setListRelateParams(undefined);
    };
    // 字典详情分页改变处理
    const onPageChange = (page: number, pageSize: number) => {
        const values: InputType = { page, limit: pageSize };
        setListRelateParams(values);
    };
    // 批量删除处理
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [selectedIds, setSelectedIds] = useState<string[]>();
    const batchDelHandler = async () => {
        if (!selectedIds) {
            message.error('请勾选数据之后删除');
            return;
        }
        delMutate(selectedIds);
        setSelectedIds(undefined);
        setSelectedRowKeys([]);
    };
    // 多选框处理
    const rowSelection = {
        // 指定选中项的 key 数组，从0开始的下标，用于控制数据的勾选，自动的本来可以，手动主要用于删除后的清除
        selectedRowKeys,
        // 选中项发生变化时的回调
        onChange: (newSelectedRowKeys: React.Key[], selectedRows: OutputType[]) => {
            // 用于显示勾选项
            setSelectedRowKeys(newSelectedRowKeys);
            // 删除时的ids传值
            const ids: string[] = [];
            selectedRows.forEach((val, index) => {
                ids[index] = val.id!;
            });
            setSelectedIds(ids);
        },
    };
    // 给列表数据循环加入key属性，以便多选框可以定位
    if (data && data.meta.totalItems !== 0) {
        for (let i = 0; i < data.meta.itemCount; i++) {
            const key = data.meta.currentPage === 1 ? i : i + 1 + data.meta.perPage;
            data.items[i].key = key;
        }
    }
    // ==========详情页处理==========
    const [showInfoDetail, setShowInfoDetail] = useState(false);
    const onOpenDetailHanler = (record: OutputType) => {
        setShowInfoDetail(true);
        setClickOne(record);
    };
    return (
        <div>
            <Card>
                {/* 搜索和操作栏 */}
                <Form form={form} onFinish={onFinishHandler}>
                    <Row gutter={24}>
                        <Col span={1} />
                        <Col span={4}>
                            <Form.Item name="category">
                                {dictListTypes && (
                                    <Select
                                        showSearch
                                        allowClear
                                        placeholder="种类"
                                        optionFilterProp="label"
                                        filterOption={(input, option) =>
                                            (option?.name ?? '')
                                                .toLowerCase()
                                                .includes(input.toLowerCase())
                                        }
                                        fieldNames={{ value: 'code', label: 'name' }}
                                        options={dictListTypes?.OSSC_CATEGORY}
                                    />
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item name="code">
                                <Input placeholder="资源编码" allowClear />
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item name="accessKey">
                                <Input placeholder="accessKey" allowClear />
                            </Form.Item>
                        </Col>
                        <Col span={2}>
                            <Form.Item name="search">
                                <Button type="primary" htmlType="submit">
                                    搜索
                                </Button>
                            </Form.Item>
                        </Col>
                        <Col span={2}>
                            <Button type="primary" onClick={resetHandler}>
                                重置
                            </Button>
                        </Col>
                        <Col span={2}>
                            <Button type="primary" onClick={() => onOpenFormHandler()}>
                                添加
                            </Button>
                        </Col>
                        <Col span={2}>
                            <Button type="primary" onClick={batchDelHandler}>
                                删除
                            </Button>
                        </Col>
                    </Row>
                </Form>
                {/* 表格数据 */}
                <Table
                    rowSelection={{
                        ...rowSelection,
                    }}
                    columns={columns({
                        onOpenFormHandler,
                        onDelHandler,
                        onOpenDetailHanler,
                    })}
                    dataSource={data?.items}
                    loading={isLoading}
                    pagination={false}
                    scroll={{ x: 1700 }}
                />
                {/* 自定义分页 */}
                <Pagination
                    showSizeChanger
                    onChange={onPageChange}
                    total={data?.meta.totalItems}
                    showTotal={(total) => `共 ${total} 条`}
                    current={data?.meta.currentPage}
                />
                {/* 弹出层表单 */}
                {showInfo && (
                    <OssEditForm
                        clickOne={clickOne}
                        onClose={closeAndRefetchHandler}
                        dictListTypes={dictListTypes}
                    />
                )}
                {/* 详情页弹出页面 */}
                {showInfoDetail && (
                    <OssDetailPage
                        clickOne={clickOne}
                        dictListTypes={dictListTypes}
                        onClose={() => setShowInfoDetail(false)}
                    />
                )}
            </Card>
        </div>
    );
}
