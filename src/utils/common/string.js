/*
	string routines
*/
const string = {
	isValid: function(value) {
		console.log('If the specified value is a valid string.');
		console.log('value:' + value);
		
		if ((typeof value === 'string') && (value.trim().length > 0)) {
			return true;
		} else {
			return false;
		}		
	} // isValid
};

export default string;