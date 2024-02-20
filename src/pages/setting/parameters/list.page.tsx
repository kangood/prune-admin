import { Button, Col, Input, Row, Table, DatePicker, message, Form, Pagination, Card } from 'antd';
import locale from 'antd/es/date-picker/locale/zh_CN';
import { useState } from 'react';

import { useDeleteParam, useListParameter } from '@/services/parameter';

import { DataType, columns } from './constants';
import { ParameterEditForm } from './edit.page';

const { RangePicker } = DatePicker;

export default function Parameters() {
    const [form] = Form.useForm();
    const [showInfo, setShowInfo] = useState(false);
    const [listRequestParams, setListRequestParams] = useState<DataType>();
    const { data } = useListParameter(listRequestParams);
    const { mutateAsync: delMutate } = useDeleteParam();
    // 删除处理器，点击删除按钮触发
    const onDelHandler = (ids: string[]) => {
        delMutate(ids);
    };
    const [clickOne, setClickOne] = useState<DataType>({});
    // 打开编辑表单处理器，点击按钮触发
    const onOpenFormHandler = (record?: DataType) => {
        if (record) {
            setClickOne(record);
        } else {
            const defaultRecord = { state: true, readonly: false };
            setClickOne(defaultRecord);
        }
        setShowInfo(true);
    };
    // 时间改变时回调，更新时间传值
    const [timedate, setTimedate] = useState<string[]>([]);
    const dateChangeHandler = (_date: any, dateString: [string, string]) => {
        setTimedate(dateString);
    };
    // 表单提交时把范围时间传入values参数中
    const onFinishHandler = (values: DataType) => {
        if (timedate.length > 0 && timedate[0] !== '' && timedate[1] !== '') {
            values.timeRange = `'${timedate[0]} 00:00:00','${timedate[1]} 23:56:59'`;
        }
        // 清空表单中的rangePicker值，传参由timedate控制
        values.rangePicker = undefined;
        setListRequestParams(values);
    };
    // 重置功能处理
    const resetHandler = () => {
        form.resetFields();
        // 清空时间组件，无参请求API
        setTimedate([]);
        setListRequestParams(undefined);
    };
    // 分页处理
    const onPageChange = (page: number, pageSize: number) => {
        const values = { page, limit: pageSize };
        setListRequestParams(values);
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
        onChange: (newSelectedRowKeys: React.Key[], selectedRows: DataType[]) => {
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
    return (
        <div>
            <Card>
                {/* 搜索和操作栏 */}
                <Form form={form} onFinish={onFinishHandler}>
                    <Row gutter={24}>
                        <Col span={4}>
                            <Form.Item name="key">
                                <Input placeholder="参数键" allowClear />
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item name="name">
                                <Input placeholder="参数名称" allowClear />
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item name="value">
                                <Input placeholder="参数值" allowClear />
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item name="rangePicker">
                                <RangePicker locale={locale} onChange={dateChangeHandler} />
                            </Form.Item>
                        </Col>
                        <Col span={2}>
                            <Form.Item>
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
                    columns={columns({ onOpenFormHandler, onDelHandler })}
                    dataSource={data?.items}
                    pagination={false}
                    rowSelection={{
                        ...rowSelection,
                    }}
                />
                <Pagination
                    showSizeChanger
                    onChange={onPageChange}
                    total={data?.meta.totalItems}
                    current={data?.meta.currentPage}
                    showTotal={(total: number) => `共 ${total} 条`}
                />
                {/* 弹出层表单 */}
                {showInfo && (
                    <ParameterEditForm clickOne={clickOne} onClose={() => setShowInfo(false)} />
                )}
            </Card>
        </div>
    );
}
