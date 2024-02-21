import { useMutation, useQuery } from '@tanstack/react-query';

import { service } from '@/http/axios/service';
import { queryClient } from '@/http/tanstack/react-query';
import { InputType } from '@/pages/org/stations/constants';
import { globalSuccess } from '@/utils/antd-extract';

/**
 * 关联其他的列表查询
 */
export const useListUserRelate = (values?: InputType) => {
    return useQuery(['listUserRelate', values], () =>
        service
            .get('/user/listRelate', {
                params: values,
            })
            .then((res) => res.data),
    );
};

/**
 * 更新用户
 */
export const useUpdateUser = () => {
    return useMutation(async (params: InputType) => service.patch('/user', { ...params }), {
        onSuccess: () => {
            globalSuccess();
            queryClient.invalidateQueries(['listUserRelate']);
        },
    });
};

/**
 * 新建用户
 */
export const useCreateUser = () => {
    return useMutation(async (params: InputType) => service.post('/user', { ...params }), {
        onSuccess: () => {
            globalSuccess();
            queryClient.invalidateQueries(['listUserRelate']);
        },
    });
};

/**
 * 删除多个用户
 */
export const useDeleteUser = () => {
    return useMutation(async (ids: string[]) => service.delete('/user', { data: { ids } }), {
        onSuccess: () => {
            globalSuccess();
            queryClient.invalidateQueries(['listUserRelate']);
        },
    });
};
