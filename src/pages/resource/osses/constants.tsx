import { DeleteOutlined, DiffOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Space, Tag, Tooltip } from 'antd';
import { ColumnsType } from 'antd/es/table';

import { dayjsFormat } from '@/utils/helpers';

export interface InputType {
    name?: string;
    orgId?: string;
    timeRange?: string;
    rangePicker?: string;
    state?: boolean;
    workDescribe?: string;
    page?: number;
    limit?: number;
}

export interface OutputType {
    id?: string;
    code?: string;
    category?: string;
    bucketName?: string;
    accessKey?: string;
    secretKey?: string;
    endpoint?: string;
    describe?: string;
    state?: boolean;
    deletedAt?: Date;
    createdAt?: Date;
    createdBy?: number;
    updatedAt?: Date;
    updatedBy?: number;
}

interface IProps {
    onOpenFormHandler: (clickOne: OutputType) => void;
    onDelHandler: (ids: string[]) => void;
    onOpenDetailHanler: (clickOne: OutputType) => void;
}

export const translateSex = (sex: string | undefined) => {
    if (sex === 'M') {
        return '男';
    }
    if (sex === 'W') {
        return '女';
    }
    return '未知';
};

export const columns: ({
    onOpenFormHandler,
    onDelHandler,
    onOpenDetailHanler,
}: IProps) => ColumnsType<OutputType> = ({
    onOpenFormHandler,
    onDelHandler,
    onOpenDetailHanler,
}) => [
    {
        title: '种类',
        dataIndex: 'ossEchoDto',
        key: 'category',
        render: (ossEchoDto) => <Tag color="blue">{ossEchoDto?.category}</Tag>,
        width: 100,
        fixed: 'left',
    },
    {
        title: '资源编码',
        dataIndex: 'code',
        width: 150,
    },
    {
        title: '资源地址',
        dataIndex: 'endpoint',
        render: (endpoint) => (
            <Tooltip placement="topLeft" title={endpoint}>
                {endpoint}
            </Tooltip>
        ),
        ellipsis: {
            showTitle: false,
        },
        width: 280,
    },
    {
        title: '空间名',
        dataIndex: 'bucketName',
        render: (bucketName) => (
            <Tooltip placement="topLeft" title={bucketName}>
                {bucketName}
            </Tooltip>
        ),
        ellipsis: {
            showTitle: false,
        },
        width: 130,
    },
    {
        title: 'accessKey',
        dataIndex: 'accessKey',
        render: (accessKey) => (
            <Tooltip placement="topLeft" title={accessKey}>
                {accessKey}
            </Tooltip>
        ),
        ellipsis: {
            showTitle: false,
        },
    },
    {
        title: 'secretKey',
        dataIndex: 'secretKey',
        render: (secretKey) => (
            <Tooltip placement="topLeft" title={secretKey}>
                {secretKey}
            </Tooltip>
        ),
        ellipsis: {
            showTitle: false,
        },
    },
    {
        title: '描述',
        dataIndex: 'description',
        width: 175,
    },
    {
        title: '创建时间',
        dataIndex: 'createdAt',
        width: 180,
        render: (createdAt) => dayjsFormat(createdAt),
    },
    {
        title: '状态',
        dataIndex: 'state',
        render: (state) => <Tag color={state ? 'green' : 'volcano'}>{state ? '启用' : '禁用'}</Tag>,
        fixed: 'right',
        width: 80,
    },
    {
        title: '操作',
        key: 'action',
        fixed: 'right',
        width: 180,
        render: (_, record) => (
            <Space size="small">
                <Tooltip title="详情">
                    <Button
                        key="detail"
                        type="text"
                        icon={<DiffOutlined />}
                        onClick={() => onOpenDetailHanler(record)}
                    />
                </Tooltip>
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
