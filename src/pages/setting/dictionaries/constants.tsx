import { DeleteOutlined, EditOutlined } from '@ant-design/icons/lib/icons';
import { Button, Space, Tag, Tooltip } from 'antd';
import { ColumnsType } from 'antd/es/table';

import { dayjsFormat } from '@/utils/helpers';

export interface InputType {
    code: string;
    name: string;
    keyword: string;
}

export interface OutputType {
    id?: string;
    type: string;
    label: string;
    code?: string;
    name?: string;
    state?: boolean;
    describe?: string;
    sortValue?: number;
    icon?: string;
    cssStyle?: string;
    cssClass?: string;
    readonly?: boolean;
    createdBy?: number;
    updatedBy?: number;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}

export interface DictMapListType {
    [key: string]: OutputType[];
}

interface IPropsLeft {
    onOpenFormHandlerLeft: (clickDict: OutputType) => void;
    onDelHandlerLeft: (ids: string[]) => void;
}

interface IProps {
    onOpenFormHandler: (clickDict: OutputType) => void;
    onDelHandler: (ids: string[]) => void;
}

export const listTypeColumns: ({
    onOpenFormHandlerLeft,
    onDelHandlerLeft,
}: IPropsLeft) => ColumnsType<OutputType> = ({ onOpenFormHandlerLeft, onDelHandlerLeft }) => [
    {
        title: '类型',
        dataIndex: 'type',
        render: (type) => (
            <Tooltip placement="topLeft" title={type}>
                {type}
            </Tooltip>
        ),
        ellipsis: {
            showTitle: false,
        },
    },
    {
        title: '类型标签',
        dataIndex: 'label',
    },
    {
        title: '状态',
        dataIndex: 'state',
        width: 70,
        render: (state) => <Tag color={state ? 'green' : 'volcano'}>{state ? '启用' : '禁用'}</Tag>,
    },
    {
        title: '操作',
        key: 'action',
        width: 90,
        render: (_, record) => (
            <Space size={0}>
                <Tooltip title="编辑">
                    <Button
                        key="edit"
                        type="text"
                        icon={<EditOutlined />}
                        onClick={() => onOpenFormHandlerLeft(record)}
                    />
                </Tooltip>
                <Tooltip title="删除">
                    <Button
                        key="del"
                        type="text"
                        icon={<DeleteOutlined />}
                        onClick={() => onDelHandlerLeft([record.id!])}
                    />
                </Tooltip>
            </Space>
        ),
    },
];

export const listColumns: ({
    onOpenFormHandler,
    onDelHandler,
}: IProps) => ColumnsType<OutputType> = ({ onOpenFormHandler, onDelHandler }) => [
    {
        title: '编码',
        dataIndex: 'code',
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
        width: 70,
        render: (state) => <Tag color={state ? 'green' : 'volcano'}>{state ? '启用' : '禁用'}</Tag>,
    },
    {
        title: '创建时间',
        dataIndex: 'createdAt',
        width: 180,
        render: (createdAt) => dayjsFormat(createdAt),
    },
    {
        title: '操作',
        key: 'action',
        width: 90,
        render: (_, record) => (
            <Space size={0}>
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
            </Space>
        ),
    },
];
