import { DeleteOutlined, DiffOutlined, EditOutlined, RedoOutlined } from '@ant-design/icons';
import { Avatar, Button, Space, Tag, Tooltip } from 'antd';
import { ColumnsType } from 'antd/es/table';

import { dayjsFormat } from '@/utils/helpers';

import { OutputType as OrgMap } from '../orgs/list.page';
import { OutputType as StationMap } from '../stations/constants';

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
    key?: React.Key;
    id?: string;
    account?: string;
    name?: string;
    email?: string;
    password?: string;
    mobile?: string;
    orgId?: string;
    orgMap?: OrgMap;
    stationId?: string;
    stationMap?: StationMap;
    sex?: string;
    state?: boolean;
    workDescribe?: string;
    deletedAt?: Date;
    createdAt?: Date;
    createdBy?: number;
    updatedAt?: Date;
    updatedBy?: number;
    createdOrgId?: string;
}

interface IProps {
    onOpenFormHandler: (clickOne: OutputType) => void;
    onDelHandler: (ids: string[]) => void;
    onOpenDetailHanler: (clickOne: OutputType) => void;
    onOpenResetPwdHanler: (clickOne: OutputType) => void;
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
    onOpenResetPwdHanler,
}: IProps) => ColumnsType<OutputType> = ({
    onOpenFormHandler,
    onDelHandler,
    onOpenDetailHanler,
    onOpenResetPwdHanler,
}) => [
    {
        title: '头像',
        dataIndex: 'avatar',
        render: (avatar) => <Avatar src={`${avatar}`} />,
        width: 65,
        fixed: 'left',
    },
    {
        title: '账号',
        dataIndex: 'account',
        fixed: 'left',
        width: 105,
    },
    {
        title: '姓名',
        dataIndex: 'name',
        fixed: 'left',
    },
    {
        title: '性别',
        dataIndex: 'sex',
        render: (sex) => <Tag color={sex === 'M' ? 'green' : 'red'}>{translateSex(sex)}</Tag>,
        width: 75,
    },
    {
        title: '邮箱',
        dataIndex: 'email',
        render: (email) => (
            <Tooltip placement="topLeft" title={email}>
                {email}
            </Tooltip>
        ),
        ellipsis: {
            showTitle: false,
        },
    },
    {
        title: '民族',
        dataIndex: 'userEchoDto',
        key: 'nation',
        render: (userEchoDto) => userEchoDto?.nation,
        width: 110,
    },
    {
        title: '学历',
        dataIndex: 'userEchoDto',
        key: 'education',
        render: (userEchoDto) => userEchoDto?.education,
        width: 80,
    },
    {
        title: '职位状态',
        dataIndex: 'userEchoDto',
        key: 'positionStatus',
        render: (userEchoDto) => userEchoDto?.positionStatus,
        width: 120,
    },
    {
        title: '机构',
        dataIndex: 'orgMap',
        key: 'orgId',
        render: (orgMap) => (orgMap?.type === '01' ? orgMap?.abbreviation : orgMap?.label),
        width: 100,
    },
    {
        title: '岗位',
        dataIndex: 'stationMap',
        key: 'stationId',
        render: (stationMap) => (
            <Tooltip placement="topLeft" title={stationMap?.name}>
                {stationMap?.name}
            </Tooltip>
        ),
        ellipsis: {
            showTitle: false,
        },
    },
    {
        title: '状态',
        dataIndex: 'state',
        render: (state) => <Tag color={state ? 'green' : 'volcano'}>{state ? '启用' : '禁用'}</Tag>,
        width: 80,
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
                <Tooltip title="重置密码">
                    <Button
                        key="resetPwd"
                        type="text"
                        icon={<RedoOutlined />}
                        onClick={() => onOpenResetPwdHanler(record)}
                    />
                </Tooltip>
            </Space>
        ),
    },
];
