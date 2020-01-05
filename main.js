import Vue from 'vue'
import App from './App'

App.mpType = 'app'

const app = new Vue({
	...App,
})
app.$mount()
