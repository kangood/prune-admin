import { useMutation, useQuery } from '@tanstack/react-query';

import { service } from '@/http/axios/service';
import { queryClient } from '@/http/tanstack/react-query';
import { InputType } from '@/pages/org/stations/constants';
import { globalSuccess } from '@/utils/antd-extract';

/**
 * 关联其他的列表查询
 */
export const useListOssRelate = (values?: InputType) => {
    return useQuery(['listOssRelate', values], () =>
        service.get('/oss/listRelate', { params: values }).then((res) => res.data),
    );
};

/**
 * 列表查询
 */
export const useListOss = (values?: InputType) => {
    return useQuery(['listOss', values], () =>
        service.get('/oss', { params: values }).then((res) => res.data),
    );
};

/**
 * 更新
 */
export const useUpdateOss = () => {
    return useMutation(async (params: InputType) => service.patch('/oss', { ...params }), {
        onSuccess: () => {
            globalSuccess();
            queryClient.invalidateQueries(['listOssRelate']);
        },
    });
};

/**
 * 新建用户
 */
export const useCreateOss = () => {
    return useMutation(async (params: InputType) => service.post('/oss', { ...params }), {
        onSuccess: () => {
            globalSuccess();
            queryClient.invalidateQueries(['listOssRelate']);
        },
    });
};

/**
 * 删除多个用户
 */
export const useDeleteOss = () => {
    return useMutation(async (ids: string[]) => service.delete('/oss', { data: { ids } }), {
        onSuccess: () => {
            globalSuccess();
            queryClient.invalidateQueries(['listOssRelate']);
        },
    });
};
