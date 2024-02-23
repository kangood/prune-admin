export enum BasicStatus {
    DISABLE,
    ENABLE,
}

export enum ResultEnum {
    SUCCESS = 0,
    ERROR = -1,
    TIMEOUT = 401,
}

export enum StorageEnum {
    User = 'user',
    Token = 'token',
    Settings = 'settings',
    I18N = 'i18nextLng',
}

export enum ThemeMode {
    Light = 'light',
    Dark = 'dark',
}

export enum ThemeLayout {
    Vertical = 'vertical',
    Horizontal = 'horizontal',
    Mini = 'mini',
}

export enum ThemeColorPresets {
    Default = 'default',
    Cyan = 'cyan',
    Purple = 'purple',
    Blue = 'blue',
    Orange = 'orange',
    Red = 'red',
}

export enum LocalEnum {
    en_US = 'en_US',
    zh_CN = 'zh_CN',
}

export enum MultiTabOperation {
    FULLSCREEN = 'fullscreen',
    REFRESH = 'refresh',
    CLOSE = 'close',
    CLOSEOTHERS = 'closeOthers',
    CLOSEALL = 'closeAll',
    CLOSELEFT = 'closeLeft',
    CLOSERIGHT = 'closeRight',
}

export enum PermissionType {
    CATALOGUE = '10', // 字典值：资源类型-有子级的菜单
    MENU = '20', // 字典值：资源类型-无子级的菜单
    BUTTON = '60', // 字典值：资源类型-按钮（暂时空缺，只作为判断用）
}
