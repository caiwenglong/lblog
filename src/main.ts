import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from '@/lang'
import { tools } from '@/utils/tools'
/*
*  style
* */
import '@/styles/index.scss'

/*
*   plugins
* */
import ElementUI from 'element-ui'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(ElementUI, {
  i18n: (key: string, value: string) => i18n.t(key, value)
})
Vue.prototype._tools = tools

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
