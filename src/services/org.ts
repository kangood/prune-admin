import { useMutation, useQuery } from '@tanstack/react-query';

import { service } from '@/http/axios/service';
import { queryClient } from '@/http/tanstack/react-query';
import { InputType } from '@/pages/org/orgs/list.page';
import { globalSuccess } from '@/utils/antd-extract';

/**
 * 树结构查询
 */
export const useListOrgTree = () => {
    return useQuery(['listOrgTree'], async () => service.get('/org/tree').then((res) => res.data));
};

/**
 * 更新
 */
export const useUpdateOrg = () => {
    return useMutation(async (params: InputType) => service.patch('/org', { ...params }), {
        onSuccess: () => {
            globalSuccess();
            queryClient.invalidateQueries(['listOrgTree']);
        },
    });
};

/**
 * 新建
 */
export const useCreateOrg = () => {
    return useMutation(async (params: InputType) => service.post('/org', { ...params }), {
        onSuccess: () => {
            globalSuccess();
            queryClient.invalidateQueries(['listOrgTree']);
        },
    });
};

/**
 * 删除
 */
export const useDeleteOrg = () => {
    return useMutation(async (ids: string[]) => service.delete('/org', { data: { ids } }), {
        onSuccess: () => {
            globalSuccess();
            queryClient.invalidateQueries(['listOrgTree']);
        },
    });
};
