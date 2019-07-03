/*
	messages
*/
const message = {
	alert: (_this, info) => {
		console.log('Show alert.');
		console.log('info:' + info); 
              
		if ((typeof info !== 'string') || (info.trim().length <= 0)) {
			console.log('Invalid alert information');
			return;
		};

		_this.$alert(info, '警告', {
			confirmButtonText: '确定',
			type: 'warning'
		});
	},

	error: (_this, info) => {
		console.log('Show error.');
		console.log('info:' + info); 
              
		if ((typeof info !== 'string') || (info.trim().length <= 0)) {
			console.log('Invalid error information');
			return;
		};

		_this.$message.error(info);
	}
};

export default message;
