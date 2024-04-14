// 前端模块
export const LOGIN = {
    NAME: "登录页",
    KEY: "Login",
    PATH: "login",
    FULL_PATH: "/login",
    FILE_PATH: "page/login/Login",
}

export const HOME = {
    NAME: "首页",
    KEY: "HOME",
    PATH: "home",
    FULL_PATH: "/home",
    FILE_PATH: "page/home/Home",
}

export const STATS = {
    NAME: "统计",
    KEY: "STATS",
    PATH: "stats",
    FULL_PATH: "/maxblog/stats",
    FILE_PATH: "page/maxblog/stats/Stats",
}

export const ARTICLE = {
    NAME: "文章",
    KEY: "ARTICLE",
    PATH: "article",
    FULL_PATH: "/maxblog/article",
    FUNCTIONS: {
        ARTICLE_LIST: {
            NAME: "文章列表",
            KEY: "ARTICLE_LIST",
            PATH: "articleList",
            FULL_PATH: "/maxblog/article/list",
            FILE_PATH: "page/maxblog/article/ArticleList",
            FUNCTIONS: {
                CREATE_ARTICLE: {
                    NAME: "创建文章",
                    KEY: "CREATE_ARTICLE",
                    PATH: "article/createArticle",
                    FULL_PATH: "/maxblog/article/createArticle",
                    FILE_PATH: "page/maxblog/article/ArticleArticle",
                },
                UPDATE_ARTICLE: {
                    NAME: "更新文章",
                    KEY: "UPDATE_ARTICLE",
                    PATH: "article/updateArticle",
                    FULL_PATH: "/maxblog/article/updateArticle",
                    FILE_PATH: "page/maxblog/article/ArticleArticle",
                },
            },
        },
        ARTICLE_TAGS: {
            NAME: "标签",
            KEY: "ARTICLE_TAGS",
            PATH: "articleTags",
            FULL_PATH: "/maxblog/article/tags",
            FILE_PATH: "page/maxblog/article/ArticleTags",
        },
    },
}

export const DEMO = {
    NAME: "样例",
    KEY: "DEMO",
    PATH: "demo",
    FULL_PATH: "/maxblog/demo",
    FUNCTIONS: {
        DEMO_LIST: {
            NAME: "样例列表",
            KEY: "DEMO_LIST",
            PATH: "demoList",
            FULL_PATH: "/maxblog/demo/list",
            FILE_PATH: "page/maxblog/demo/DemoList",
        },
    },
}

export const PROJECT = {
    NAME: "项目",
    KEY: "PROJECT",
    PATH: "project",
    FULL_PATH: "/maxblog/project",
    FUNCTIONS: {
        PROJECT_LIST: {
            NAME: "项目列表",
            KEY: "PROJECT_LIST",
            PATH: "projectList",
            FULL_PATH: "/maxblog/project/list",
            FILE_PATH: "page/maxblog/project/ProjectList",
        },
    },
}

export const MODULE_MAXBLOG = {
    HOME,
    STATS,
    ARTICLE,
    DEMO,
    PROJECT,
}

export const MAXBLOG = {
    NAME: "MaxBlog",
    KEY: "MAXBLOG",
    PATH: "maxblog",
    MODULE_MAXBLOG,
}