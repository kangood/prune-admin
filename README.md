<div align="center"> 
<br> 
<h1> Prune Admin </h1>
</div>

**中文** | [English](./README.en-US.md)

## 简介

Prune Admin 是一个现代化风格的快速开发平台，前端基于 React 18、Vite、Ant Design 和 TypeScript 构建，后端使用 NestJS 开发：[Prune Api](https://github.com/kangood/prune-api)，它旨在帮助开发人员快速搭建功能强大的后台管理系统。

## 预览
+ https://prune.kangod.top

![sign-in.png](https://raw.githubusercontent.com/kangood/prune-admin/main/src/assets/sign-in.png)
![menu-black.png](https://raw.githubusercontent.com/kangood/prune-admin/main/src/assets/menu-black.png)
![home.png](https://raw.githubusercontent.com/kangood/prune-admin/main/src/assets/home.png)

## 特性

- 使用 React 18 hooks 进行构建
- 基于 Vite 进行快速开发和热模块替换
- 集成 Ant Design，提供丰富的 UI 组件和设计模式
- 使用 TypeScript 编写，提供类型安全性和更好的开发体验
- 使用 Node.js 流行框架 NestJS 集成后端 [Prune Api](https://github.com/kangood/prune-api)，提供数据服务
- 集成常见的后台管理功能，如用户管理、角色管理、菜单管理、地区管理等
- 集成国际化支持，轻松切换多语言
- 可定制的主题和样式，使用 TailwindCSS 原子化操作按需使用
- 灵活的路由配置，支持多级嵌套路由
- 集成权限管理，根据用户角色控制页面以及细化到按钮的访问权限（待完善）
- 使用 Zustand 进行状态管理
- 使用 React-Query 进行数据获取
- 响应式设计，适应各种屏幕尺寸和设备

## 快速开始

### 获取项目代码

```bash
git clone https://github.com/kangood/prune-admin.git
```

### 安装依赖

在项目根目录下运行以下命令安装项目依赖：

```bash
pnpm install
```

### 启动开发服务器

运行以下命令以启动开发服务器：

```bash
pnpm dev
```

访问 [http://localhost:7442](http://localhost:7442) 查看您的应用程序。

### 构建生产版本

运行以下命令以构建生产版本：

```bash
pnpm build
```

构建后的文件将位于 `dist` 目录中。

## 鸣谢

本项目的前端是在 [slash-admin](https://github.com/d3george/slash-admin) 脚手架基础上进行的开发，我在此基础上开发了后台管理系统中常用的一些页面
