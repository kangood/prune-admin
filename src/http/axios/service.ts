import axios from 'axios';

import { useUserStore } from '@/store/userStore';
import { globalError } from '@/utils/antd-extract';

// 刷新token的API调用
// const refreshTokenApi = async () => {
//     // 调用API
//     const res = await service.get('auth/refresh', {
//         params: {
//             refreshToken: localStorage.getItem('refresh_token'),
//         },
//     });
//     if (res) {
//         // 更新token数据
//         FetcherStore.setState((state) => {
//             state.token = res.data.accessToken;
//         });
//         localStorage.setItem('refresh_token', res.data.refreshToken);
//     }
//     return res;
// };
// 设置axios的额外配置
export const service = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API,
});
// 拦截请求处理
service.interceptors.request.use(async (params) => {
    // 添加token（使用 useUserToken() 获取不了，使用 useUserStore.getState() 获取）
    const { accessToken } = useUserStore.getState().userToken;
    if (accessToken) {
        params.headers.set('Authorization', `Bearer ${accessToken}`);
    }
    return params;
});
// 拦截响应处理
service.interceptors.response.use(
    async (response) => {
        return response;
    },
    async (error) => {
        // if (import.meta.env.DEV) console.log('respError', error);
        if (!error.response)
            switch (error.response.status) {
                case 401: {
                    // 如果响应401就把原本的FetcherStore数据设置为空，好让页面跳至登录页
                    // FetcherStore.setState((state) => {
                    //     state.token = null;
                    // });
                    // // 响应401且不是刷新token的请求时，去主动调用刷新token请求
                    // if (!error.response.config.url.includes('auth/refresh')) {
                    //     const res = await refreshTokenApi();
                    //     if (res.status === 200) {
                    //         return axios(error.response.config);
                    //     }
                    //     message.error('登录过期，请重新登录');
                    //     return Promise.reject(res.data);
                    // }
                    break;
                }
                default:
                    globalError(error);
                    break;
            }
        return Promise.reject(error);
    },
);
