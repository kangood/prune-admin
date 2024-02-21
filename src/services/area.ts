import { useMutation, useQuery } from '@tanstack/react-query';

import { service } from '@/http/axios/service';
import { queryClient } from '@/http/tanstack/react-query';
import { InputType } from '@/pages/org/orgs/list.page';
import { globalSuccess } from '@/utils/antd-extract';

/**
 * 树结构查询
 */
export const useListAreaTree = () => {
    return useQuery(['listAreaTree'], async () =>
        service.get('/area/tree').then((res) => res.data),
    );
};

/**
 * 更新
 */
export const useUpdateArea = () => {
    return useMutation(async (params: InputType) => service.patch('/area', { ...params }), {
        onSuccess: () => {
            globalSuccess();
            queryClient.invalidateQueries(['listAreaTree']);
        },
    });
};

/**
 * 新建
 */
export const useCreateArea = () => {
    return useMutation(async (params: InputType) => service.post('/area', { ...params }), {
        onSuccess: () => {
            globalSuccess();
            queryClient.invalidateQueries(['listAreaTree']);
        },
    });
};

/**
 * 删除
 */
export const useDeleteMultiArea = () => {
    return useMutation(async (ids: string[]) => service.delete('/area', { data: { ids } }), {
        onSuccess: () => {
            globalSuccess();
            queryClient.invalidateQueries(['listAreaTree']);
        },
    });
};
