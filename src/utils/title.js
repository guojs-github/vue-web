/*
	title
*/
const title = {};
title.install = function (Vue, options) {
	Vue.prototype.$title = function (value) {
		console.log('Set new title');
		console.log('value:' + value);
		
		if ((typeof value === 'string') && (value.trim().length > 0)) {
			document.title = value;
		};
	};
};

export default title;
