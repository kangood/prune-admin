import { QueryClient } from '@tanstack/react-query';

// 创建一个 client
export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            // 设置HTTP状态码为403的时候不重试，其他情况取默认值
            retry: (_failureCount, error: any) => error.response?.status !== 403,
            cacheTime: 300_000, // 缓存有效期 5m
            staleTime: 10_1000, // 数据变得 "陈旧"（stale）的时间 10s
            refetchOnWindowFocus: false, // 禁止窗口聚焦时重新获取数据
            refetchOnReconnect: false, // 禁止重新连接时重新获取数据
            refetchOnMount: false, // 禁止组件挂载时重新获取数据
        },
    },
});
