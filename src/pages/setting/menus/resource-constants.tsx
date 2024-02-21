import { Button, Space, Tooltip, message } from 'antd';
import { ColumnsType } from 'antd/es/table';

import { OutputType } from './resource-list.page';

interface IProps {
    onOpenFormHandler: (clickOne: OutputType) => void;
    onDelHandler: (ids: string[]) => void;
}

export const columns: ({ onOpenFormHandler, onDelHandler }: IProps) => ColumnsType<OutputType> = ({
    onOpenFormHandler,
    onDelHandler,
}) => [
    {
        title: '编码',
        dataIndex: 'code',
        render: (code) => (
            <Tooltip placement="topLeft" title={code}>
                {code}
            </Tooltip>
        ),
        ellipsis: {
            showTitle: false,
        },
        width: 200,
    },
    {
        title: '名称',
        dataIndex: 'name',
    },
    {
        title: '操作',
        key: 'action',
        fixed: 'right',
        width: 150,
        render: (_, record) => (
            <Space.Compact size="small">
                <Button key="edit" type="link" onClick={() => onOpenFormHandler(record)}>
                    编辑
                </Button>
                <Button key="copy" type="link" onClick={() => message.success('还没做')}>
                    复制
                </Button>
                <Button
                    key="delete"
                    type="link"
                    onClick={() => onDelHandler([record.id as string])}
                >
                    删除
                </Button>
            </Space.Compact>
        ),
    },
];
