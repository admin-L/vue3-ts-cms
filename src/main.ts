import { createApp } from 'vue'
import './service/axios_demo'
import App from './App.vue'
import router from './router'
import store from './store'
import { setupStore } from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'normalize.css'
import './assets/css/index.less'

import IRequest from '@/service'
import { globalRegister } from './global'

const app = createApp(App)

app.use(globalRegister)
app.use(store)
setupStore()

app.use(router)
app.use(ElementPlus)
app.mount('#app')

// IRequest.request({
//   url: '/home/multidata',
//   method: 'GET',
//   interceptors: {
//     requestInterceptor(config) {
//       console.log('单独请求成功拦截')
//       return config
//     },
//     responseInterceptor(res) {
//       console.log('单独响应成功拦截')
//       return res
//     },
//   },
// })

// IRequest.request({
//   url: '/home/multidata',
//   method: 'GET',
//   showLoading: false,
// })
