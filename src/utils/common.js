/*
	common routines
*/
const common = {
	title: function(value) {
		console.log('update browser title');
		console.log('value:' + value);
		
		if ((typeof value === 'string') && (value.trim().length > 0)) {
			document.title = value;
		};
	}
};

export default common;
