import { ARTICLE, DEMO, HOME, MAXBLOG, PROJECT, STATS } from "./module"
import { AreaChartOutlined, ExperimentOutlined, HomeOutlined, ProjectOutlined, ReadOutlined, MenuOutlined } from "@ant-design/icons"
import React from "react"

export const MENU_ITEMS_WITHOUT_SUB = [
    {
        key: MAXBLOG.KEY,
        className: "nav",
        label: MAXBLOG.NAME,
        icon: null,
    },
]

export const MENU_ITEMS_WITH_SUB = [
    {
        label: "",
        key: "submenu",
        icon: <MenuOutlined className="submenu-icon" />,
        items: MENU_ITEMS_WITHOUT_SUB
    },
]

export const SIDER_MENU_ITEMS = [
    {
        key: STATS.KEY,
        label: STATS.NAME,
        icon: <AreaChartOutlined />,
    },
    {
        key: HOME.KEY,
        label: HOME.NAME,
        icon: <HomeOutlined />,
    },
    {
        key: ARTICLE.KEY,
        label: ARTICLE.NAME,
        icon: <ReadOutlined />,
        children: [
            {
                key: ARTICLE.FUNCTIONS.ARTICLE_LIST.KEY,
                label: ARTICLE.FUNCTIONS.ARTICLE_LIST.NAME,
                icon: null,
            },
            {
                key: ARTICLE.FUNCTIONS.ARTICLE_TAGS.KEY,
                label: ARTICLE.FUNCTIONS.ARTICLE_TAGS.NAME,
                icon: null,
            },
        ]
    },
    {
        key: DEMO.KEY,
        label: DEMO.NAME,
        icon: <ExperimentOutlined />,
        children: [
            {
                key: DEMO.FUNCTIONS.DEMO_LIST.KEY,
                label: DEMO.FUNCTIONS.DEMO_LIST.NAME,
                icon: null,
            },
        ]
    },
    {
        key: PROJECT.KEY,
        label: PROJECT.NAME,
        icon: <ProjectOutlined />,
        children: [
            {
                key: PROJECT.FUNCTIONS.PROJECT_LIST.KEY,
                label: PROJECT.FUNCTIONS.PROJECT_LIST.NAME,
                icon: null,
            },
        ]
    },
]
