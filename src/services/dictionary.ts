import { useMutation, useQuery } from '@tanstack/react-query';

import { service } from '@/http/axios/service';
import { queryClient } from '@/http/tanstack/react-query';
import { DictMapListType, InputType, OutputType } from '@/pages/setting/dictionaries/constants';
import { globalSuccess } from '@/utils/antd-extract';
import { QueryResultType } from '@/utils/types';

/**
 * 根据类型查询字典列表
 */
export const useListType = (label: string, page?: number, limit?: number) => {
    return useQuery(['dictListType', label, page, limit], () =>
        service
            .get('dict/listType', { params: { label, page, limit } })
            .then((response) => response.data),
    );
};

/**
 * 多类型字典列表查询
 */
export const useDictListTypes = (types?: string) => {
    return useQuery<DictMapListType>(['dictListTypes', types], () =>
        service
            .get('dict/listMultiType', { params: { type: types } })
            .then((response) => response.data),
    );
};

/**
 * 根据ID查询单个字典值
 */
export const useGetDictById = (id: string) => {
    return useQuery([], () => service.get(`dict/${id}`).then((response) => response.data));
};

/**
 * 按单个type查询字典列表
 */
export const useListDictSingleType = (
    clickType: string,
    page?: number,
    limit?: number,
    code?: string,
    name?: string,
) => {
    const { data, isLoading, refetch } = useQuery<QueryResultType<OutputType>>(
        ['listDictSingleType', clickType, page, limit, code, name],
        async () =>
            service
                .get('dict', { params: { type: clickType, page, limit, code, name } })
                .then((res) => res.data),
        { enabled: clickType !== '' },
    );
    return {
        listDataItems: data?.items,
        listMeta: data?.meta,
        listLoading: isLoading,
        listRefetch: refetch,
    };
};

/**
 * 批量删除字典
 */
export const useDelDicts = () => {
    return useMutation(async (ids: string[]) => service.delete('dict', { data: { ids } }), {
        onSuccess: () => {
            globalSuccess();
            queryClient.invalidateQueries(['listDictSingleType']);
        },
    });
};

/**
 * 更新单个字典值
 */
export const useUpdateDict = () => {
    return useMutation(async (params: InputType) => service.patch('dict', { ...params }), {
        onSuccess: () => {
            globalSuccess();
            queryClient.invalidateQueries(['listDictSingleType']);
        },
    });
};

/**
 * 新建单个字典值
 */
export const useCreateDict = () => {
    return useMutation(async (params: InputType) => service.post('dict', params), {
        onSuccess: () => {
            globalSuccess();
            queryClient.invalidateQueries(['listDictSingleType']);
        },
    });
};
