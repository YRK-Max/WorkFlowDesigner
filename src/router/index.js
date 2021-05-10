import Vue from 'vue'
import Router from 'vue-router'
import WorkFlowSpace from "@/views/WorkFlowSpace";

let constantRouterMap = [
    {
        path: '/',
        name: '/',
        component: WorkFlowSpace,
    }
]

Vue.use(Router)

export default new Router({
    mode: 'hash',
    routes: constantRouterMap
})
