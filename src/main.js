import Vue from 'vue'
import App from './App.vue'
import router from './router'

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'

Vue.config.productionTip = false

Vue.use(Antd)
Vue.use(VXETable)

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
