import { useMutation, useQuery } from '@tanstack/react-query';

import { service } from '@/http/axios/service';
import { queryClient } from '@/http/tanstack/react-query';
import { InputType } from '@/pages/authority/roles/constants';
import { globalSuccess } from '@/utils/antd-extract';

/**
 * 关联其他的列表查询
 */
export const useListRoleRelate = (values?: InputType) => {
    return useQuery(['listRoleRelate', values], () =>
        service.get('/role/listRelate', { params: values }).then((res) => res.data),
    );
};

/**
 * 删除
 */
export const useDeleteRole = () => {
    return useMutation(async (ids: string[]) => service.delete('role', { data: { ids } }), {
        onSuccess: () => {
            globalSuccess();
            queryClient.invalidateQueries(['listRoleRelate']);
        },
    });
};

/**
 * 更新
 */
export const useUpdateRole = () => {
    return useMutation(async (params: InputType) => service.patch('role', { ...params }), {
        onSuccess: () => {
            globalSuccess();
            queryClient.invalidateQueries(['listRoleRelate']);
        },
    });
};

/**
 * 新建
 */
export const useCreateRole = () => {
    return useMutation(async (params: InputType) => service.post('role', { ...params }), {
        onSuccess: () => {
            globalSuccess();
            queryClient.invalidateQueries(['listRoleRelate']);
        },
    });
};
