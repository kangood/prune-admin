import { useMutation, useQuery } from '@tanstack/react-query';

import { service } from '@/http/axios/service';
import { queryClient } from '@/http/tanstack/react-query';
import { globalSuccess } from '@/utils/antd-extract';

interface InputType {
    roleId: number;
    userIdList?: number[];
}

export interface OutputType {
    id: number;
    userId: number;
    roleId: number;
}

/**
 * 根据角色ID查询用户角色关联
 */
export const useListUserRoleRelate = (roleId: number, shouldFetch: boolean) => {
    return useQuery<OutputType[]>(
        ['listUserRoleRelate', roleId, shouldFetch],
        async () =>
            service
                .get('user-role/listUserRoleByRoleId', { params: { roleId } })
                .then((res) => res.data),
        {
            enabled: shouldFetch,
        },
    );
};

/**
 * 删除并新建
 */
export const useSaveUserRoleList = () => {
    return useMutation(
        async (params: InputType) => service.post('user-role/saveListAfterDelete', { ...params }),
        {
            onSuccess: () => {
                globalSuccess();
                queryClient.invalidateQueries(['listUserRoleRelate']);
            },
        },
    );
};
