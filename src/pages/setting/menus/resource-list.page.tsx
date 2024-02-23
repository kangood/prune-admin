import { Button, DatePicker, Form, Input, Pagination, Space, Table, message } from 'antd';
import locale from 'antd/es/date-picker/locale/zh_CN';
import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';

import { useDeleteResource, useListResource } from '@/services/resource';

import { columns } from './resource-constants';
import { ResourceEditForm } from './resource-edit.page';

import { PermissionType } from '#/enum';

interface ResourceListPageProps {
    clickMenuId: string;
    clickMenuName: string | undefined;
    clickMenuResourceType: string | undefined;
}

export interface InputType {
    menuId?: string;
    code?: string;
    name?: string;
    timeRange?: string;
    rangePicker?: string;
    page?: number;
    limit?: number;
}

export interface OutputType {
    id?: string;
    menuId?: string;
    menuName?: string;
    // ...
}

export const ResourceListPage: React.FC<ResourceListPageProps> = ({
    clickMenuId,
    clickMenuName,
    clickMenuResourceType,
}) => {
    const [form] = Form.useForm();
    const [listRequestParams, setlistRequestParams] = useState<InputType>({ menuId: clickMenuId });
    const { data } = useListResource(listRequestParams);
    const { mutateAsync: delMutate } = useDeleteResource();
    useEffect(() => {
        setlistRequestParams({ menuId: clickMenuId });
        form.resetFields();
    }, [clickMenuId]);
    // 分页改变的回调处理
    const onPageChange = (page: number, pageSize: number) => {
        const values: InputType = { menuId: clickMenuId, page, limit: pageSize };
        setlistRequestParams(values);
    };
    // 时间改变时回调，更新时间传值
    const [timedate, setDate] = useState<string[]>([]);
    const dateChangeHandler = (_date: any, dateString: [string, string]) => {
        setDate(dateString);
    };
    // 表单提交时把范围时间传入values参数中
    const onFinishHandler = (values: InputType) => {
        values.menuId = clickMenuId;
        if (timedate.length > 0 && timedate[0] !== '' && timedate[1] !== '') {
            values.timeRange = `'${timedate[0]} 00:00:00','${timedate[1]} 23:56:59'`;
        }
        // 清空表单中的rangePicker值，传参由timedate控制
        values.rangePicker = undefined;
        setlistRequestParams(values);
    };
    // 重置功能处理
    const resetHandler = () => {
        form.resetFields();
        // 清空时间组件，无参请求API
        setDate([]);
        setlistRequestParams({ menuId: clickMenuId });
    };
    // 批量删除处理
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [selectedIds, setSelectedIds] = useState<string[]>();
    const batchDelHandler = async () => {
        if (!selectedIds || isEmpty(selectedIds)) {
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
    // 打开编辑表单处理器，点击按钮触发
    const [clickReourceOne, setClickReourceOne] = useState<OutputType>();
    const [resourceEditShowInfo, setResourceEditShowInfo] = useState<boolean>(false);
    const onOpenFormHandler = (record?: OutputType) => {
        const newRecord = { ...record, menuName: clickMenuName };
        if (newRecord) {
            setClickReourceOne(newRecord);
        } else {
            const defaultRecord = { menuId: clickMenuId };
            setClickReourceOne(defaultRecord);
        }
        setResourceEditShowInfo(true);
    };
    // 删除处理器，点击删除按钮触发API调用
    const onDelHandler = async (ids: string[]) => {
        delMutate(ids);
    };
    return (
        <div>
            <Form
                name="resource_form"
                form={form}
                colon={false}
                onFinish={onFinishHandler}
                labelCol={{ span: 10 }}
                wrapperCol={{ span: 24 }}
            >
                <Space>
                    <Form.Item name="code" label="编码">
                        <Input placeholder="请输入" allowClear />
                    </Form.Item>
                    <Form.Item name="name" label="名称">
                        <Input placeholder="请输入" allowClear />
                    </Form.Item>
                </Space>
                <Space>
                    <Form.Item name="rangePicker" label="创建时间">
                        <DatePicker.RangePicker
                            className="w-28"
                            locale={locale}
                            onChange={dateChangeHandler}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button className="ml-11" onClick={resetHandler}>
                            重置
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            查询
                        </Button>
                    </Form.Item>
                </Space>
            </Form>
            <Space>
                <span className="text-sm">
                    {clickMenuName ? `【${clickMenuName}】` : ''}资源列表
                </span>
                <Space>
                    <Button
                        disabled={!clickMenuId || clickMenuResourceType === PermissionType.BUTTON}
                        type="primary"
                        onClick={batchDelHandler}
                    >
                        删除
                    </Button>
                    <Button
                        disabled={!clickMenuId || clickMenuResourceType === PermissionType.BUTTON}
                        type="primary"
                        onClick={() => onOpenFormHandler({ menuId: clickMenuId })}
                    >
                        新增
                    </Button>
                </Space>
            </Space>
            <Table
                rowKey="id"
                rowSelection={{
                    ...rowSelection,
                }}
                bordered
                columns={columns({ onOpenFormHandler, onDelHandler })}
                dataSource={data?.items}
                pagination={false}
                scroll={{ x: 460 }}
            />
            {/* 自定义分页 */}
            {!isEmpty(data?.items) && (
                <Pagination
                    showSizeChanger
                    onChange={onPageChange}
                    total={data?.meta.totalItems}
                    showTotal={(total) => `共 ${total} 条`}
                    current={data?.meta.currentPage}
                />
            )}
            {/* 编辑弹出层表单 */}
            {resourceEditShowInfo && (
                <ResourceEditForm
                    clickReourceOne={clickReourceOne!}
                    onClose={() => setResourceEditShowInfo(false)}
                />
            )}
        </div>
    );
};
