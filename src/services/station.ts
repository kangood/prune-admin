import { useMutation, useQuery } from '@tanstack/react-query';
import { UploadFile } from 'antd';
import FileSaver from 'file-saver';

import { service } from '@/http/axios/service';
import { queryClient } from '@/http/tanstack/react-query';
import { InputType, OutputType } from '@/pages/org/stations/constants';
import { globalSuccess } from '@/utils/antd-extract';
import { QueryResultType } from '@/utils/types';

/**
 * 分页查询
 */
export const useListStation = () => {
    return useQuery<QueryResultType<OutputType>>(['listStation'], () =>
        service.get('/station').then((res) => res.data),
    );
};

/**
 * 关联机构的列表查询
 */
export const useListStationRelate = (values?: InputType) => {
    return useQuery(['listStationRelate', values], async () =>
        service
            .get('/station/listRelate', {
                params: values,
            })
            .then((res) => res.data),
    );
};

/**
 * 更新岗位
 */
export const useUpdateStation = () => {
    return useMutation(async (params: InputType) => service.patch('/station', { ...params }), {
        onSuccess: () => {
            globalSuccess();
            queryClient.invalidateQueries(['listStationRelate']);
        },
    });
};

/**
 * 新建岗位
 */
export const useCreateStation = () => {
    return useMutation(async (params: InputType) => service.post('/station', { ...params }), {
        onSuccess: () => {
            globalSuccess();
            queryClient.invalidateQueries(['listStationRelate']);
        },
    });
};

/**
 * 删除多个岗位
 */
export const useDeleteStation = () => {
    return useMutation(async (ids: string[]) => service.delete('/station', { data: { ids } }), {
        onSuccess: () => {
            globalSuccess();
            queryClient.invalidateQueries(['listStationRelate']);
        },
    });
};

/**
 * 导出Excel
 */
export const exportStationExcel = async (values?: InputType) => {
    const response = await service.get('/station/exportExcel', {
        params: values,
        responseType: 'arraybuffer',
    });
    const blob = new Blob([response.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    FileSaver.saveAs(blob, '导出岗位数据.xlsx');
};

/**
 * 导入Excel
 */
export const useImportStationExcel = () => {
    return useMutation(
        async (file: UploadFile) =>
            service.post(
                '/station/importExcel',
                { file },
                { headers: { 'Content-Type': 'multipart/form-data' } },
            ),
        {
            onSuccess: async () => {
                globalSuccess();
            },
        },
    );
};
