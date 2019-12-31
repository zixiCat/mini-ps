const state = {
	//common
	// setActive:false
	//img event
	imgCenter: false,
	imgFullScreem: false,
	imgSet2top: false,
	imgSet2bottom: false,
	//font event
	fontCenter:false,
	fontWeight:false,
	fontLineThrough:false
}

const mutations = {
	RUN: (state, event) => {
		state[event] = true
	},
	STOP: (state, event) => {
		state[event] = false
	}
}

const actions = {
	// changeSetting({ commit }, data) {
	//   commit('CHANGE_SETTING', data)
	// }
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}
