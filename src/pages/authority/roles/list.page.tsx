import { Form, Row, Col, Input, Button, Table, Pagination, DatePicker, message, Card } from 'antd';
import locale from 'antd/es/date-picker/locale/zh_CN';
import { useEffect, useState } from 'react';

import { useListDictSingleType } from '@/services/dictionary';
import { useListMenuTreeForRole } from '@/services/menu';
import { useDeleteRole, useListRoleRelate } from '@/services/role';
import { useListRoleAuthorityIdByRoleId } from '@/services/role-authority';
import { useListUserRelate } from '@/services/user';
import { useListUserRoleRelate } from '@/services/user-role';
import { PAGE_MAX_LIMIT } from '@/utils/constants';

import { InputType, OutputType, columns } from './constants';
import { StationEditForm } from './edit.page';
import { ResourceAllotPage, traverseTree } from './resource-allot.page';
import { RoleAllotPage } from './role-allot.page';

export default function Roles() {
    const [form] = Form.useForm();
    // 状态定义
    const [listRelateParams, setListRelateParams] = useState<InputType>();
    // API-hooks
    const { data } = useListRoleRelate(listRelateParams);
    const { listDataItems: listDict } = useListDictSingleType('ROLE_CATEGORY', 1, PAGE_MAX_LIMIT);
    const { data: userData } = useListUserRelate({ page: 1, limit: PAGE_MAX_LIMIT });
    const { mutateAsync: delMutate } = useDeleteRole();
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
    const closeAndRefetchHandler = async () => {
        setShowInfo(false);
    };
    // 重置功能处理
    const resetHandler = () => {
        form.resetFields();
        // 清空时间组件，无参请求API
        setDate([]);
        setListRelateParams(undefined);
    };
    // 详情分页改变处理
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
    // ==========角色分配处理==========
    const [showInfoRoleAllot, setShowInfoRoleAllot] = useState<boolean>(false);
    const [shouldFetch, setShouldFetch] = useState(false);
    const [clickRoleId, setClickRoleId] = useState('');
    // 点击后就去查询，在当前页面查完再传到role-allot页面
    const { data: listUserRoleRelate } = useListUserRoleRelate(clickRoleId, shouldFetch);
    // 打开
    const onOpenRoleAllotHandler = async (roleId: string) => {
        setClickRoleId(roleId);
        setShouldFetch(true);
        setShowInfoRoleAllot(true);
    };
    // 关闭
    const onCloseForRoleAllotHandler = async () => {
        setShouldFetch(false);
        setShowInfoRoleAllot(false);
    };
    // ==========资源分配处理==========
    const [showInfoResourceAllot, setShowInfoResourceAllot] = useState<boolean>(false);
    const { data: clickListRoleAuthorityId } = useListRoleAuthorityIdByRoleId({
        roleId: clickRoleId,
    });
    // 在当前页面查完再传到resource-allot页面，只查询一次
    const { data: listMenuTree } = useListMenuTreeForRole();
    // 初始加载处理节点名称
    useEffect(() => {
        listMenuTree?.forEach((rootNode) => {
            traverseTree(rootNode);
        });
    }, [listMenuTree]);
    // 打开
    const onOpenResourceAllotHandler = async (roleId: string) => {
        setClickRoleId(roleId);
        setShowInfoResourceAllot(true);
    };
    // 关闭
    const onCloseForResourceAllotHandler = async () => {
        setShowInfoResourceAllot(false);
    };
    return (
        <div>
            <Card>
                {/* 搜索和操作栏 */}
                <Form form={form} onFinish={onFinishHandler}>
                    <Row gutter={24}>
                        <Col span={4}>
                            <Form.Item name="code">
                                <Input placeholder="编码" allowClear />
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item name="name">
                                <Input placeholder="角色名称" allowClear />
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
                        onOpenRoleAllotHandler,
                        onOpenResourceAllotHandler,
                    })}
                    dataSource={data?.items}
                    pagination={false}
                />
                {/* 自定义分页 */}
                <Pagination
                    showSizeChanger
                    onChange={onPageChange}
                    total={data?.meta.totalItems}
                    showTotal={(total) => `共 ${total} 条`}
                    current={data?.meta.currentPage}
                />
                {/* 编辑弹出层表单 */}
                {showInfo && (
                    <StationEditForm
                        clickOne={clickOne}
                        listDict={listDict}
                        onClose={closeAndRefetchHandler}
                    />
                )}
                {/* 角色分配页弹出页面 */}
                {showInfoRoleAllot && listUserRoleRelate && (
                    <RoleAllotPage
                        listUser={userData?.items}
                        clickRoleId={clickRoleId}
                        clickUserRoleList={listUserRoleRelate}
                        onClose={onCloseForRoleAllotHandler}
                    />
                )}
                {/* 角色分配页弹出页面 */}
                {showInfoResourceAllot && clickListRoleAuthorityId && (
                    <ResourceAllotPage
                        clickRoleId={clickRoleId}
                        clickListRoleAuthorityId={clickListRoleAuthorityId}
                        listMenuTreeInitData={listMenuTree as OutputType[]}
                        onClose={onCloseForResourceAllotHandler}
                    />
                )}
                {/* <Unique /> */}
            </Card>
        </div>
    );
}
