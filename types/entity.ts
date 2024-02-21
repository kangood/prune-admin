import { BasicStatus, PermissionType } from './enum';

export interface UserToken {
    accessToken?: string;
    refreshToken?: string;
}

export interface UserInfo {
    id: string;
    email: string;
    account: string;
    password?: string;
    avatar?: string;
    roles?: Role;
    status?: BasicStatus;
    permissions?: Permission[];
}

export interface Organization {
    id: string;
    name: string;
    status: 'enable' | 'disable';
    desc?: string;
    order?: number;
    children?: Organization[];
}

export interface Permission {
    id: string;
    parentId: string;
    name: string;
    label: string;
    resourceType: PermissionType;
    path: string;
    status?: BasicStatus;
    sortValue?: number;
    icon?: string;
    component?: string;
    hide?: boolean;
    frameSrc?: string;
    newFeature?: boolean;
    children?: Permission[];
}

export interface Role {
    id: string;
    name: string;
    label: string;
    status: BasicStatus;
    order?: number;
    desc?: string;
    permission?: Permission[];
}
