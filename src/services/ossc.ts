import { useMutation, useQuery } from '@tanstack/react-query';

import { service } from '@/http/axios/service';
import { queryClient } from '@/http/tanstack/react-query';
import { InputType } from '@/pages/org/stations/constants';
import { globalSuccess } from '@/utils/antd-extract';

/**
 * 关联其他的列表查询
 */
export const useListOsscRelate = (values?: InputType) => {
    return useQuery(['listOsscRelate', values], () =>
        service.get('/ossc/listRelate', { params: values }).then((res) => res.data),
    );
};

/**
 * 列表查询
 */
export const useListOssc = (values?: InputType) => {
    return useQuery(['listOssc', values], () =>
        service.get('/ossc', { params: values }).then((res) => res.data),
    );
};

/**
 * 更新
 */
export const useUpdateOssc = () => {
    return useMutation(async (params: InputType) => service.patch('/ossc', { ...params }), {
        onSuccess: () => {
            globalSuccess();
            queryClient.invalidateQueries(['listOsscRelate']);
        },
    });
};

/**
 * 新建用户
 */
export const useCreateOssc = () => {
    return useMutation(async (params: InputType) => service.post('/ossc', { ...params }), {
        onSuccess: () => {
            globalSuccess();
            queryClient.invalidateQueries(['listOsscRelate']);
        },
    });
};

/**
 * 删除多个用户
 */
export const useDeleteOssc = () => {
    return useMutation(async (ids: number[]) => service.delete('/ossc', { data: { ids } }), {
        onSuccess: () => {
            globalSuccess();
            queryClient.invalidateQueries(['listOsscRelate']);
        },
    });
};
