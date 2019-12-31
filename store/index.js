import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
//import modules which you mainly use
import transfer  from './modules/transfer.js'
import fn  from './modules/fn.js'

Vue.use(Vuex);


const store = new Vuex.Store({
    // state: {
    // 	/* 延时数据 */
    // 	delay: false,//于/util/delay调用
    //
    //
    // },
    // mutations: {
    // 	delay(state, param) {
    // 		state.delay = param
    // 	}
    // },
    // actions: {
    //
    // },
    // getters: {
    //
    // }
    modules: {
		transfer,
		fn
    },
    getters
})

export default store

