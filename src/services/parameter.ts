import { useMutation, useQuery } from '@tanstack/react-query';

import { service } from '@/http/axios/service';
import { queryClient } from '@/http/tanstack/react-query';
import { DataType } from '@/pages/setting/parameters/constants';
import { globalSuccess } from '@/utils/antd-extract';

/**
 * 分页查询参数
 */
export const useListParameter = (values?: DataType) => {
    return useQuery(['listParameter', values], () =>
        service
            .get('param', {
                params: values,
            })
            .then((res) => res.data),
    );
};

/**
 * 批量删除
 */
export const useDeleteParam = () => {
    return useMutation(async (ids: string[]) => service.delete('param', { data: { ids } }), {
        onSuccess: () => {
            globalSuccess();
            queryClient.invalidateQueries(['listParameter']);
        },
    });
};

/**
 * 更新参数
 */
export const useUpdateParamter = () => {
    return useMutation(async (params: DataType) => service.patch('param', { ...params }), {
        onSuccess: () => {
            globalSuccess();
            queryClient.invalidateQueries(['listParameter']);
        },
    });
};

/**
 * 添加参数
 */
export const useCreateParamter = () => {
    return useMutation(async (params: DataType) => service.post('param', { ...params }), {
        onSuccess: () => {
            globalSuccess();
            queryClient.invalidateQueries(['listParameter']);
        },
    });
};
