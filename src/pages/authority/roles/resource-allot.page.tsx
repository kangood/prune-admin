import { SearchOutlined } from '@ant-design/icons';
import {
    Button,
    Card,
    Col,
    Form,
    Input,
    Modal,
    Row,
    Space,
    Table,
    Tooltip,
    Tree,
    message,
} from 'antd';
import { ColumnsType } from 'antd/es/table';
import { DataNode } from 'antd/es/tree';
import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';

import { useListResource } from '@/services/resource';
import { useSaveBatchRoleAutority } from '@/services/role-authority';

import { OutputType } from '../../setting/menus/list.page';
import { OutputType as ResourceOutputType } from '../../setting/menus/resource-list.page';

import { PermissionType } from '#/enum';

interface ResourceAllotPageProps {
    clickRoleId: string;
    clickListRoleAuthorityId: any;
    listMenuTreeInitData: OutputType[];
    listMenuTreeVariable?: OutputType[];
    onClose: () => void;
}

export interface InputType {
    menuIdList?: string[];
    resourceIdList?: string[];
    roleId?: string;
    roleIds?: string[];
}

/**
 * 递归遍历树结构，并处理节点标签值
 */
export const traverseTree = (node: OutputType) => {
    // 处理节点的标签值
    node.name = `${node.resourceType === PermissionType.BUTTON ? '「按钮」' : '「菜单」'}${
        node.name
    }`;
    // 递归处理子节点
    node.children = node.children?.map((childNode) => traverseTree(childNode));
    return node;
};

// /**
//  * 递归遍历树结构，并处理节点标签值
//  */
// const traverseTreeOnSearch = (node: OutputType, value: string, searchNodeList: OutputType[]) => {
//     // 处理节点的标签值
//     if (node.label?.includes(value)) {
//         searchNodeList.push(node);
//     }
//     // 递归处理子节点
//     node.children = node.children?.map((childNode) =>
//         traverseTreeOnSearch(childNode, value, searchNodeList),
//     );
//     return node;
// };

// /**
//  * 递归遍历树结构，并处理节点标签值，只push节点ID
//  */
// const traverseTreeOnSearchToId = (node: OutputType, value: string, searchNodeList: number[]) => {
//     // 处理节点的标签值
//     if (node.label?.includes(value)) {
//         searchNodeList.push(node.id!);
//     }
//     // 递归处理子节点
//     node.children = node.children?.map((childNode) =>
//         traverseTreeOnSearchToId(childNode, value, searchNodeList),
//     );
//     return node;
// };

// /**
//  * 递归删除不要的数据
//  */
// const removeNodesByIds = (tree: OutputType[], idsToRemove: number[]): OutputType[] => {
//     return tree.filter((node) => {
//         if (idsToRemove.includes(node.id!)) {
//             return true; // 如果当前节点的 ID 在要删除的列表中，不包含该节点
//         }

//         if (node.children) {
//             node.children = removeNodesByIds(node.children, idsToRemove);
//         }

//         return false; // 保留当前节点
//     });
// };

export const ResourceAllotPage: React.FC<ResourceAllotPageProps> = ({
    clickRoleId,
    clickListRoleAuthorityId,
    listMenuTreeInitData,
    onClose,
}) => {
    const [treeData] = useState<OutputType[]>(listMenuTreeInitData);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const { mutateAsync } = useSaveBatchRoleAutority();
    const [checkedNodes, setCheckedNodes] = useState<InputType>();
    // console.log('123', listMenuTreeInitData, listMenuTreeVariable);
    // setTimeout(() => {
    //     setTreeData(listMenuTreeInitData);
    // }, 10);
    useEffect(() => {
        // 赋初始值，避免没有改动就保存时的无值状态
        setCheckedNodes({
            roleId: clickRoleId,
            menuIdList: clickListRoleAuthorityId.menuIdList,
            resourceIdList: clickListRoleAuthorityId.resourceIdList,
        });
        // 资源多选框初始值
        setSelectedRowKeys(clickListRoleAuthorityId.resourceIdList);
    }, []);
    // 复选框点击时处理
    const onCheck = (_checked: React.Key[] | { checked: React.Key[] }, info: any) => {
        if (!isEmpty(info.checkedNodes)) {
            const menuIdList = info.checkedNodes.map((item: OutputType) => item.id);
            setCheckedNodes({
                roleId: clickRoleId,
                menuIdList,
                resourceIdList: selectedRowKeys.map((item) => item as string),
            });
        } else {
            setCheckedNodes(undefined);
        }
    };
    // 表单提交处理
    const submitHandle = async () => {
        if (checkedNodes) {
            mutateAsync(checkedNodes);
        }
        onClose();
    };
    // ==========搜索处理==========
    // 变化回调
    const onChange = (_e: React.ChangeEvent<HTMLInputElement>) => {
        message.error('暂时不做了');
        // // 搜索字
        // const { value } = e.target;
        // if (value === '') {
        //     // set一次之后就会被跟着更新数据
        //     // setTreeData(listMenuTreeInitData);
        //     return;
        // }
        // // 1、递归所有节点，查询搜索字对应的节点
        // // const searchNodeList: OutputType[] = [];
        // const searchNodeList: number[] = [];
        // console.log('你变了？', treeData);
        // listMenuTreeInitData?.forEach((rootNode) => {
        //     traverseTreeOnSearchToId(rootNode, value, searchNodeList);
        // });
        // console.log('searchNodeList', searchNodeList);
        // // 2、计算需要保留的节点id
        // // 3、递归删除不用显示的节点
        // const prunedTree = removeNodesByIds(listMenuTreeVariable, searchNodeList);
        // console.log('prunedTree', prunedTree);
        // setTreeData(prunedTree);
    };
    // ==========资源表格处理==========
    // 点击树节点触发
    const [clickMenuId, setClickMenuId] = useState<string>('');
    const onSelect = (selectedKeys: React.Key[]) => {
        if (!isEmpty(selectedKeys)) {
            setClickMenuId(selectedKeys[0] as string);
        }
    };
    const { data: resourceData } = useListResource({ menuId: clickMenuId });
    const reourceColumns: () => ColumnsType<ResourceOutputType> = () => [
        {
            className: 'text-center',
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
            width: 380,
        },
        {
            className: 'text-center',
            title: '名称',
            dataIndex: 'name',
        },
    ];
    // 多选框处理
    const rowSelection = {
        // 指定选中项的 key 数组
        selectedRowKeys,
        onChange: (newSelectedRowKeys: React.Key[]) => {
            // 用于追加变化后的选中项
            const finalSelectedRowKeys = selectedRowKeys.concat(newSelectedRowKeys);
            setSelectedRowKeys(finalSelectedRowKeys);
            // 修改数据状态，调用API
            setCheckedNodes({
                roleId: clickRoleId,
                menuIdList: checkedNodes?.menuIdList,
                resourceIdList: finalSelectedRowKeys.map((item) => String(item)),
            });
        },
    };
    return (
        <Modal
            open
            title="分配菜单和资源"
            okText="提交"
            cancelText="取消"
            onCancel={() => onClose()}
            onOk={submitHandle}
            width="65%"
        >
            <Row gutter={12}>
                <Col span={9}>
                    <Card title="菜单">
                        <Row>
                            <Form onFinish={() => message.success('还没做')}>
                                <Space>
                                    <Form.Item name="name">
                                        <Input placeholder="搜索" allowClear onChange={onChange} />
                                    </Form.Item>
                                    <Form.Item name="search">
                                        <Button icon={<SearchOutlined />} htmlType="submit" />
                                    </Form.Item>
                                </Space>
                            </Form>
                        </Row>
                        <Row>
                            <Tree
                                // 开启复选框
                                checkable
                                // 父子节点选中状态不再关联
                                checkStrictly
                                // 默认展开所有树节点
                                defaultExpandAll
                                // 默认选中复选框的树节点
                                defaultCheckedKeys={clickListRoleAuthorityId.menuIdList}
                                // 点击复选框触发
                                onCheck={onCheck}
                                // 点击树节点触发
                                onSelect={onSelect}
                                // 异步加载数据
                                // loadData={onLoadData}
                                // 展开/收起时触发
                                // onExpand={onExpand}
                                // 是否自动展开父节点
                                // autoExpandParent
                                treeData={treeData as DataNode[]}
                                fieldNames={{ title: 'name', key: 'id' }}
                            />
                        </Row>
                    </Card>
                </Col>
                <Col span={15}>
                    <Card title="资源">
                        <Table
                            rowKey="id"
                            rowSelection={{
                                ...rowSelection,
                            }}
                            bordered
                            columns={reourceColumns()}
                            dataSource={resourceData?.items}
                            pagination={false}
                        />
                    </Card>
                </Col>
            </Row>
        </Modal>
    );
};
