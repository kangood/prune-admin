import { Column } from '@antv/g2plot';
import { Avatar, Button, Divider, Tabs, TabsProps } from 'antd';
import { useEffect, useRef } from 'react';

import Card from '@/components/card';

const data = [
    {
        name: '您',
        date: '2023-12-20',
        pv: 34,
    },
    {
        name: '总数',
        date: '2023-12-20',
        pv: 38,
    },
    {
        name: '您',
        date: '2023-12-21',
        pv: 27,
    },
    {
        name: '总数',
        date: '2023-12-21',
        pv: 29,
    },
    {
        name: '您',
        date: '2023-12-22',
        pv: 23,
    },
    {
        name: '总数',
        date: '2023-12-22',
        pv: 24,
    },
    {
        name: '您',
        date: '2023-12-23',
        pv: 19,
    },
    {
        name: '总数',
        date: '2023-12-23',
        pv: 35,
    },
    {
        name: '您',
        date: '2023-12-24',
        pv: 10,
    },
    {
        name: '总数',
        date: '2023-12-24',
        pv: 10,
    },
    {
        name: '您',
        date: '2023-12-25',
        pv: 4,
    },
    {
        name: '总数',
        date: '2023-12-25',
        pv: 5,
    },
    {
        name: '您',
        date: '2023-12-26',
        pv: 30,
    },
    {
        name: '总数',
        date: '2023-12-26',
        pv: 33,
    },
    {
        name: '您',
        date: '2023-12-27',
        pv: 29,
    },
    {
        name: '总数',
        date: '2023-12-27',
        pv: 31,
    },
    {
        name: '您',
        date: '2023-12-28',
        pv: 18,
    },
    {
        name: '总数',
        date: '2023-12-28',
        pv: 23,
    },
];

export default function Home() {
    const ref = useRef(null);
    // 图表。保证首次加载，且只加载一次
    useEffect(() => {
        if (!ref.current) {
            return;
        }
        const stackedColumnPlot = new Column(ref.current, {
            data,
            isGroup: true,
            xField: 'date',
            yField: 'pv',
            seriesField: 'name',
            /** 设置颜色 */
            // color: ['#1ca9e6', '#f88c24'],
            /** 设置间距 */
            // marginRatio: 0.1,
            // 柱子样式
            // columnStyle: {
            //     radius: [20, 20, 0, 0],
            // },
        });
        stackedColumnPlot.render();
        // 返回清理函数，以确保在下一次运行之前清理上一次的实例
        // eslint-disable-next-line consistent-return
        return () => {
            stackedColumnPlot.destroy();
        };
    }, []);
    // 标签切换 items
    const items: TabsProps['items'] = [
        {
            key: '1',
            label: '项目介绍',
            children: (
                <div>
                    <div className="m-4">
                        <span>产品名称</span>
                        <div className="mx-3 inline-block h-4 w-[1px] bg-[#dcdfe6]" />
                        <Button
                            className="text-blue-500 bg-[#e8f4ff]"
                            href="https://github.com/KangodYan/prune-admin"
                            target="_blank"
                        >
                            Prune 快速开发平台
                        </Button>
                        <div className="mx-3 inline-block h-4 w-[1px] bg-[#dcdfe6]" />
                        <span>立即去点个star吧~</span>
                    </div>
                    <Divider orientation="right">⭐ </Divider>
                    <div className="m-4">
                        <span>账号密码</span>
                        <div className="mx-3 inline-block h-4 w-[1px] bg-[#dcdfe6]" />
                        <Button className="text-blue-500 border-blue-500">
                            平台管理员 (prune_pt)
                        </Button>
                        <div className="mx-3 inline-block h-4 w-[1px] bg-[#dcdfe6]" />
                        <Button className="text-green-500 border-green-500">
                            超级管理员 (prune)
                        </Button>
                        <div className="mx-3 inline-block h-4 w-[1px] bg-[#dcdfe6]" />
                        <Button> 普通用户 (normal)</Button>
                    </div>
                    <Divider orientation="right">密码密码密码密码密码都是：123456</Divider>
                    <div className="m-4">
                        <span>获取源码</span>
                        <div className="mx-3 inline-block h-4 w-[1px] bg-[#dcdfe6]" />
                        <Button
                            className="bg-red-400 text-white"
                            href="https://github.com/KangodYan/tealamp-api-nestjs"
                            target="_blank"
                        >
                            Prune 后端服务
                        </Button>
                        <div className="mx-3 inline-block h-4 w-[1px] bg-[#dcdfe6]" />
                        <Button
                            className="bg-green-400 text-white"
                            href="https://github.com/KangodYan/prune-admin"
                            target="_blank"
                        >
                            Prune 后台管理 (本项目)
                        </Button>
                    </div>
                </div>
            ),
        },
        {
            key: '2',
            label: '技术栈',
            children: 'Content of Tab Pane 2',
        },
    ];
    return (
        <div>
            <section className="bg-white dark:bg-slate-900">
                <div className="container mx-auto flex flex-wrap px-5 py-4">
                    <div className="mb-auto mt-auto flex content-start sm:w-2/3 sm:pr-10 lg:w-3/5">
                        <div className="mt-6">
                            <Avatar
                                size="large"
                                src="https://qiniu.panlore.top/project/prune/rc-upload-1716455792616-2.jpg"
                            />
                        </div>
                        <div className="mb-6 w-full px-4 sm:p-4">
                            <h1 className="title-font mb-2 text-xl font-medium text-gray-900 dark:text-[var(--color-text)]">
                                Good morning, 超级管理员, Have a coffee break ☕
                            </h1>
                            <div className="leading-relaxed">上次登录时间： 第一次登录系统</div>
                        </div>
                    </div>
                    <div className="mb-auto flex content-start sm:w-2/3 lg:w-2/5">
                        <div className="w-1/2 p-4 sm:w-1/2 lg:w-1/3">
                            <h2 className="title-font text-3xl font-medium text-gray-900 dark:text-[var(--color-text)]">
                                1
                            </h2>
                            <p className="leading-relaxed">今日 IP</p>
                        </div>
                        <div className="w-1/2 p-4 sm:w-1/2 lg:w-1/3">
                            <h2 className="title-font text-3xl font-medium text-gray-900 dark:text-[var(--color-text)]">
                                3
                            </h2>
                            <p className="leading-relaxed">今日访问</p>
                        </div>
                        <div className="w-1/2 p-4 sm:w-1/2 lg:w-1/3">
                            <h2 className="title-font text-3xl font-medium text-gray-900 dark:text-[var(--color-text)]">
                                10,212
                            </h2>
                            <p className="leading-relaxed">总访问量</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="mt-3 flex ">
                <div className="bg-white dark:bg-slate-900 mr-3 w-1/2">
                    <Card>
                        <div className="m-5 font-bold text-[#487ec1]">近八天系统访问记录</div>
                        <div className="ml-5" ref={ref} />
                    </Card>
                </div>
                <div className="bg-white dark:bg-slate-900 w-1/2 pl-3">
                    <Card>
                        <Tabs defaultActiveKey="1" items={items} />
                    </Card>
                </div>
            </section>
        </div>
    );
}
