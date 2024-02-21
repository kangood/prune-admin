/**
 * 分页信息
 */
export interface PageMeta {
    currentPage: number; // 当前页数
    itemCount: number; // 当前页记录数
    perPage: number; // 每页的记录数
    totalItems: number; // 总记录数
    totalPages: number; // 总页数
}

/**
 * 查询返回信息
 */
export interface QueryResultType<T> {
    items: T[]; // 数据项集合
    meta: PageMeta; // 分页信息
}

/**
 * 树节点
 */
export interface TreeNode {
    id: string;
    label: string;
    parent: TreeNode | null;
    children: TreeNode[];
}
