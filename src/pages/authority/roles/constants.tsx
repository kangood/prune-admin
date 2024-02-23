import { DeleteOutlined, EditOutlined, MenuOutlined, UserSwitchOutlined } from '@ant-design/icons';
import { Button, Space, Tag, Tooltip } from 'antd';
import { ColumnsType } from 'antd/es/table';

import { dayjsFormat } from '@/utils/helpers';

export interface InputType {
    code?: string;
    name?: string;
    category?: string;
    timeRange?: string;
    rangePicker?: string;
    state?: boolean;
    describe?: string;
    page?: number;
    limit?: number;
}

export interface OutputType {
    id?: string;
    code?: string;
    name?: string;
    category?: string;
    state?: boolean;
    readonly?: boolean;
    describe?: string;
    deletedAt?: Date;
    createdAt?: Date;
    createdBy?: number;
    updatedAt?: Date;
    updatedBy?: number;
}

interface IProps {
    onOpenFormHandler: (clickOne: OutputType) => void;
    onDelHandler: (ids: string[]) => void;
    onOpenRoleAllotHandler: (id: string) => void;
    onOpenResourceAllotHandler: (id: string) => void;
}

export const columns: ({
    onOpenFormHandler,
    onDelHandler,
    onOpenRoleAllotHandler,
    onOpenResourceAllotHandler,
}: IProps) => ColumnsType<OutputType> = ({
    onOpenFormHandler,
    onDelHandler,
    onOpenRoleAllotHandler,
    onOpenResourceAllotHandler,
}) => [
    {
        title: '编码',
        dataIndex: 'code',
    },
    {
        title: '角色类别',
        dataIndex: 'roleEchoDto',
        key: 'category',
        render: (roleEchoDto) => roleEchoDto?.category,
    },
    {
        title: '名称',
        dataIndex: 'name',
    },
    {
        title: '描述',
        dataIndex: 'describe',
    },
    {
        title: '状态',
        dataIndex: 'state',
        render: (state) => <Tag color={state ? 'green' : 'volcano'}>{state ? '启用' : '禁用'}</Tag>,
    },
    {
        title: '内置角色',
        dataIndex: 'readonly',
        render: (readonly) => (
            <Tag color={readonly ? 'green' : 'volcano'}>{readonly ? '是' : '否'}</Tag>
        ),
    },
    {
        title: '创建时间',
        dataIndex: 'createdAt',
        render: (createdAt) => dayjsFormat(createdAt),
    },
    {
        title: '操作',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <Tooltip title="编辑">
                    <Button
                        key="edit"
                        type="text"
                        icon={<EditOutlined />}
                        onClick={() => onOpenFormHandler(record)}
                    />
                </Tooltip>
                <Tooltip title="删除">
                    <Button
                        key="del"
                        type="text"
                        icon={<DeleteOutlined />}
                        onClick={() => onDelHandler([record.id!])}
                    />
                </Tooltip>
                <Tooltip title="分配角色">
                    <Button
                        key="roleAction"
                        type="text"
                        icon={<UserSwitchOutlined />}
                        onClick={() => onOpenRoleAllotHandler(record.id!)}
                    />
                </Tooltip>
                <Tooltip title="分配资源">
                    <Button
                        key="menuAction"
                        type="text"
                        icon={<MenuOutlined />}
                        onClick={() => onOpenResourceAllotHandler(record.id!)}
                    />
                </Tooltip>
            </Space>
        ),
    },
];
