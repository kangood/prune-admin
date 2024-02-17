import { message } from 'antd';
import { AxiosError } from 'axios';

import { Result } from '#/api';

export const globalSuccess = () => message.success('success', 2);
// export const globalError = (error: AxiosError) => message.error(error.message);
export const globalError = (error: AxiosError<Result>) =>
    message.error(error.response?.data.message ?? error.message);
