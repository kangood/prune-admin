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

![sign-in.png](https://github.com/KangodYan/prune-admin/assets/36319737/fb9b5118-2fb8-44bc-b15c-529e546cff10)
![menu-black.png](https://github.com/KangodYan/prune-admin/assets/36319737/d160e725-34be-484c-b84c-e1188e7772e4)
![home.png](https://github.com/KangodYan/prune-admin/assets/36319737/e9d8dbd4-33e3-4f62-95de-ab2d1aba118d)

## Features

- Built using React 18 hooks
- Powered by Vite for rapid development and hot module replacement
- Integrates Ant Design, providing a rich set of UI components and design patterns
- Written in TypeScript, offering type safety and an improved development experience
- Integrate backend [Prune Api](https://github.com/KangodYan/prune-api) using the popular Node.js framework NestJS to provide data services
- Includes common admin features like user management, role management, menu management, and area management
- Supports internationalization for easy language switching
- Customizable themes and styles, Use TailwindCSS for atomic operations with on-demand usage
- Flexible routing configuration, supporting nested routes
- Integrate permission management to control page access based on user roles, down to button-level access rights (To be perfected)
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
