import {
    Form,
    Row,
    Col,
    Input,
    Button,
    Table,
    Pagination,
    DatePicker,
    TreeSelect,
    message,
    Card,
} from 'antd';
import locale from 'antd/es/date-picker/locale/zh_CN';
import { useState } from 'react';

import { useDictListTypes } from '@/services/dictionary';
import { useListOrgTree } from '@/services/org';
import { useDeleteUser, useListUserRelate } from '@/services/user';

import { InputType, OutputType, columns } from './constants';
import { UserDetailPage } from './detail.page';
import { UserEditForm } from './edit.page';
import { ResetPwdForm } from './reset-pwd.page';

export default function Users() {
    const [form] = Form.useForm();
    // 状态定义
    const [listRelateParams, setListRelateParams] = useState<InputType>();
    // API-hooks
    const { data } = useListUserRelate(listRelateParams);
    const { mutateAsync: delMutate } = useDeleteUser();
    const { data: listOrgTree } = useListOrgTree();
    const { data: dictListTypes } = useDictListTypes("'NATION','POSITION_STATUS','EDUCATION'");
    // ==========逻辑处理==========
    // 时间改变时回调，更新时间传值
    const [timedate, setDate] = useState<string[]>([]);
    const dateChangeHandler = (_date: any, dateString: [string, string]) => {
        setDate(dateString);
    };
    // 表单提交时把范围时间传入values参数中
    const onFinishHandler = (values: InputType) => {
        if (timedate.length > 0 && timedate[0] !== '' && timedate[1] !== '') {
            values.timeRange = `'${timedate[0]} 00:00:00','${timedate[1]} 23:56:59'`;
        }
        // 清空表单中的rangePicker值，传参由timedate控制
        values.rangePicker = undefined;
        setListRelateParams(values);
    };
    // 打开编辑表单处理器，点击按钮触发
    const [clickOne, setClickOne] = useState<OutputType>();
    const [showInfo, setShowInfo] = useState(false);
    const onOpenFormHandler = (record?: OutputType) => {
        if (record) {
            setClickOne(record);
        } else {
            const defaultRecord = { state: true, password: '123456' };
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
    // 树结构数据处理
    const [treeValue, setTreeValue] = useState<string>();
    const onChange = (newValue: string) => {
        setTreeValue(newValue);
    };
    // 重置功能处理
    const resetHandler = () => {
        form.resetFields();
        // 清空时间组件，无参请求API
        setDate([]);
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
    // ==========重置密码页处理==========
    const [showInfoResetPwd, setShowInfoResetPwd] = useState(false);
    const onOpenResetPwdHanler = (record: OutputType) => {
        setShowInfoResetPwd(true);
        setClickOne(record);
    };
    return (
        <div>
            <Card>
                {/* 搜索和操作栏 */}
                <Form form={form} onFinish={onFinishHandler}>
                    <Row gutter={24}>
                        <Col span={4}>
                            <Form.Item name="account">
                                <Input placeholder="账号" allowClear />
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item name="orgId">
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
                        </Col>
                        <Col span={4}>
                            <Form.Item name="rangePicker">
                                <DatePicker.RangePicker
                                    locale={locale}
                                    onChange={dateChangeHandler}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={2} />
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
                        onOpenResetPwdHanler,
                    })}
                    dataSource={data?.items}
                    pagination={false}
                    scroll={{ x: 1400 }}
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
                    <UserEditForm
                        clickOne={clickOne}
                        onClose={closeAndRefetchHandler}
                        dictListTypes={dictListTypes}
                    />
                )}
                {/* 详情页弹出页面 */}
                {showInfoDetail && (
                    <UserDetailPage clickOne={clickOne} onClose={() => setShowInfoDetail(false)} />
                )}
                {/* 重设密码页弹出页面 */}
                {showInfoResetPwd && (
                    <ResetPwdForm
                        clickId={clickOne?.id}
                        onClose={() => setShowInfoResetPwd(false)}
                    />
                )}
            </Card>
        </div>
    );
}
