import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible'


// 消除 click 移动浏览器300ms延迟
import attachFastClick from 'fastclick'
attachFastClick.attach(document.body)

Vue.config.productionTip = false

// 如果是非线上环境，加载 VConsole（移动端适用）
if (process.env.NODE_ENV !== 'production') {
    var VConsole = require('vconsole');
    var vConsole = new VConsole();
}

Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
