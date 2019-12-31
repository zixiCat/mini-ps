const state = {
	editType: null,
	container: {
		w: null,
		h: null,
	},
	inputContent:'',
	font: {
		lineHeight: 14,
		size: 14,
		weight: false,
		lineThrough: false,
		color: '#000',
	},
	img: {
		r: 0,
		degrees: 0
	},
	canvas: {
		color: '#000',
		lineWidth: 2,
	},
}

const mutations = {
	SET_EDITTYPE:(state, val) => {
		state.editType = val
	},
	SET_CONTAINERW: (state, val) => {
		state.container.w = val
	},
	SET_CONTAINERH: (state, val) => {
		state.container.h = val
	},
	CHANGE_INPUTCONTENT:(state,val)=>{
		state.inputContent = val
		console.log(val,233)
	},
	GET_FONTINFO:(state,item)=>{
		state.font = item
	},
	GET_IMGINFO:(state,item)=>{
		state.img  = item
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
