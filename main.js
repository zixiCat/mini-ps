import Vue from 'vue'
import App from './App'
import store from '@/store/index'
// import delayFn from './util/delay/index.js'

Vue.config.productionTip = false;

// Vue.use(delayFn)

App.mpType = 'app'

const app = new Vue({
	...App,
	store
})
app.$mount()
