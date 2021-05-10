import Vue from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import router from './router'

Vue.config.productionTip = false

Vue.use(Antd)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
