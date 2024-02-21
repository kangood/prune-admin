import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Space, Tag, Tooltip } from 'antd';
import { ColumnsType } from 'antd/es/table';

import { dayjsFormat } from '@/utils/helpers';

export interface DataType {
    id?: string;
    key?: string;
    name?: string;
    value?: string;
    describe?: string;
    state?: boolean;
    readonly?: boolean;
    createdAt?: string;
    timeRange?: string;
    rangePicker?: string;
    page?: number;
    limit?: number;
}

interface IProps {
    onOpenFormHandler: (clickOne: DataType) => void;
    onDelHandler: (ids: string[]) => void;
}

export const columns: ({ onOpenFormHandler, onDelHandler }: IProps) => ColumnsType<DataType> = ({
    onOpenFormHandler,
    onDelHandler,
}) => [
    {
        title: '参数键',
        dataIndex: 'key',
    },
    {
        title: '参数名称',
        dataIndex: 'name',
        width: 150,
    },
    {
        title: '参数值',
        dataIndex: 'value',
        width: 170,
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
        title: '内置',
        dataIndex: 'readonly',
        render: (readonly) => (
            <Tag color={readonly ? 'green' : 'volcano'}>{readonly ? '是' : '否'}</Tag>
        ),
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
            </Space>
        ),
    },
];
