import React, {Suspense} from "react"
import { Routes, Route } from "react-router-dom"
import Index from "../page/index/Index"
import NotFound from "../page/notFound/NotFound"
import { HOME, ARTICLE, LOGIN, MAXBLOG, STATS, DEMO, PROJECT } from "../config/module"
import { CENTER_CONTENT, MAIN_LAYOUT } from "../config/layout"
import Login from "../page/login/Login"
import MaxBlog from "../page/maxblog/index/MaxBlog"
import Stats from "../page/maxblog/stats/Stats"

const lazyLoad = path => {
    const Comp = React.lazy(() => import(`../${path}`))
    return (
        <Suspense fallback={<>加载中...</>}>
            <Comp />
        </Suspense>
    )
}

export default (
    <Routes>
        <Route path="/" element={<Index/>}/>
        <Route path={LOGIN.PATH} element={<Login/>}/>
        <Route path={MAXBLOG.PATH} element={<MaxBlog/>}/>
        <Route element={lazyLoad(MAIN_LAYOUT.FILE_PATH)}>
            <Route element={lazyLoad(CENTER_CONTENT.FILE_PATH)}>
                <Route path={STATS.FULL_PATH} element={<Stats/>}/>
                <Route path={HOME.FULL_PATH} element={lazyLoad(HOME.FILE_PATH)}/>
                <Route path={ARTICLE.FUNCTIONS.ARTICLE_LIST.FULL_PATH} element={lazyLoad(ARTICLE.FUNCTIONS.ARTICLE_LIST.FILE_PATH)}/>
                <Route path={ARTICLE.FUNCTIONS.ARTICLE_TAGS.FULL_PATH} element={lazyLoad(ARTICLE.FUNCTIONS.ARTICLE_TAGS.FILE_PATH)}/>
                <Route path={DEMO.FUNCTIONS.DEMO_LIST.FULL_PATH} element={lazyLoad(DEMO.FUNCTIONS.DEMO_LIST.FILE_PATH)}/>
                <Route path={PROJECT.FUNCTIONS.PROJECT_LIST.FULL_PATH} element={lazyLoad(PROJECT.FUNCTIONS.PROJECT_LIST.FILE_PATH)}/>
            </Route>
        </Route>
        <Route path="*" element={<NotFound/>}/>
    </Routes>
)