import {createWebHashHistory, createRouter} from 'vue-router'
import WorkFlowSpace from "../views/WorkFlowSpace";

const routerHashHis = createWebHashHistory()

let routes = [
    { path: '/', name: '/', component: WorkFlowSpace }
]

const router = createRouter({
    history: routerHashHis,
    routes: routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
    console.log(to);
    next();
});

export default router
