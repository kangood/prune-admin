// react-query
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
// react
import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
// react helmet
import { HelmetProvider } from 'react-helmet-async';
// eslint-disable-next-line import/no-unresolved
import 'virtual:svg-icons-register';

import App from '@/App';
import { queryClient } from '@/http/tanstack/react-query';

// i18n
import './locales/i18n';
// tailwind css
import './theme/index.css';

const charAt = `
    ██████╗ ██████╗ ██╗   ██╗███╗   ██╗███████╗
    ██╔══██╗██╔══██╗██║   ██║████╗  ██║██╔════╝
    ██████╔╝██████╔╝██║   ██║██╔██╗ ██║█████╗  
    ██╔═══╝ ██╔══██╗██║   ██║██║╚██╗██║██╔══╝  
    ██║     ██║  ██║╚██████╔╝██║ ╚████║███████╗
    ╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝
  `;
console.info(`%c${charAt}`, 'color: #5BE49B');

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <HelmetProvider>
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            <Suspense>
                <App />
            </Suspense>
        </QueryClientProvider>
    </HelmetProvider>,
);

// 不再使用 mock 数据，调用 nest 后端获取
// worker.start({ onUnhandledRequest: 'bypass' });
