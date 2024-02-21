import { Modal, Transfer } from 'antd';
import { useEffect, useState } from 'react';

import { OutputType as UserOutputType } from '@/pages/org/users/constants';
import { useSaveUserRoleList, OutputType as UserRoleOutputType } from '@/services/user-role';

interface RoleAllotPageProps {
    listUser: UserOutputType[];
    clickRoleId: string;
    clickUserRoleList: UserRoleOutputType[];
    onClose: () => void;
}

interface RecordType {
    key: string;
    title: string;
    chosen: boolean;
}

export const RoleAllotPage: React.FC<RoleAllotPageProps> = ({
    listUser,
    clickRoleId,
    clickUserRoleList,
    onClose,
}) => {
    const [dataList, setDataList] = useState<RecordType[]>([]);
    const [targetKeys, setTargetKeys] = useState<string[]>([]);
    const { mutateAsync } = useSaveUserRoleList();
    useEffect(() => {
        getListUserProcess();
    }, []);
    // 处理用户数据，转换成穿梭框识别的list
    const getListUserProcess = () => {
        const tempDataList: RecordType[] = [];
        const tempTargetKeys: string[] = [];
        listUser.forEach((user) => {
            const data = {
                key: `${user.id}`,
                title: `${user.account ? user.account : ''} -
                    ${user.name ? user.name : ''}`,
                chosen: !!clickUserRoleList?.find((item) => item.userId === user.id),
            };
            if (data.chosen) {
                tempTargetKeys.push(data.key);
            }
            tempDataList.push(data);
        });
        setDataList(tempDataList);
        setTargetKeys(tempTargetKeys);
    };
    // 根据搜索内容进行筛选
    const filterOption = (inputValue: string, option: RecordType) =>
        option.title.indexOf(inputValue) > -1;
    // 更新右侧框的数据集
    const handleChange = (newTargetKeys: string[]) => {
        setTargetKeys(newTargetKeys);
    };
    // 表单提交处理
    const submitHandle = async () => {
        await mutateAsync({ roleId: clickRoleId, userIdList: targetKeys.map(String) });
        onClose();
    };
    return (
        <Modal
            open
            title="分配角色成员"
            okText="提交"
            cancelText="取消"
            onCancel={() => onClose()}
            onOk={submitHandle}
        >
            <Transfer
                dataSource={dataList}
                locale={{
                    itemUnit: '项',
                    itemsUnit: '项',
                    searchPlaceholder: '请输入搜索内容',
                }}
                titles={['全部用户', '已选用户']}
                showSearch
                filterOption={filterOption}
                targetKeys={targetKeys}
                onChange={handleChange}
                render={(item) => item.title}
            />
        </Modal>
    );
};
