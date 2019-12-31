exports.install = function(Vue, options) {
	Vue.prototype.delayFn = function() {
		if (!this.$store.state.delay) {
			this.$store.state.delay = true
			setTimeout(() => {
				this.$store.state.delay = false
			}, 500)
			return false
		} else {
			return true
		}

	};
};
