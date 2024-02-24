<div align="center"> 
<br> 
<br>
<h1> Prune Admin </h1>
</div>

**English** | [中文](./README.zh-CN.md)

## Introduction
Prune Admin is a modern admin rapid development platform built with React 18, Vite, Ant Design, and TypeScript. It is designed to help developers quickly create powerful admin management systems.

## Preview
+ https://prune.kangod.com

![login.png](https://qiniu.panlore.top/project/prune/20240224191913.png)
![home.png](https://qiniu.panlore.top/project/prune/20240224192244.png)
![menu.png](https://qiniu.panlore.top/project/prune/20240224192105.png)

## Features

- Built using React 18 hooks
- Powered by Vite for rapid development and hot module replacement
- Integrates Ant Design, providing a rich set of UI components and design patterns
- Written in TypeScript, offering type safety and an improved development experience
- [Integrate backend](https://github.com/KangodYan/prune-api) using the popular Node.js framework NestJS to provide data services
- Includes common admin features like user management, role management, menu management, and area management
- Supports internationalization for easy language switching
- Customizable themes and styles, Use TailwindCSS for atomic operations with on-demand usage
- Flexible routing configuration, supporting nested routes
- Integrate permission management to control page access based on user roles, down to button-level access rights.
- State management using Zustand
- Data fetching using React-Query
- Responsive design, adapting to various screen sizes and devices

## Quick Start

### Get the Project Code

```bash
git clone https://github.com/KangodYan/prune-admin.git
```

### Install Dependencies

In the project's root directory, run the following command to install project dependencies:

```bash
pnpm install
```

### Start the Development Server

Run the following command to start the development server:

```bash
pnpm dev
```

Visit [http://localhost:7442](http://localhost:7442) to view your application.

### Build for Production

Run the following command to build the production version:

```bash
pnpm build
```

The built files will be in the `dist` directory.
