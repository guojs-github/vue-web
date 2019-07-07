/*
	object routines
*/
const object = {
	isValid: function(value) {
		console.log('If the specified value is a valid object.');
		console.log('value:' + JSON.stringify(value));
		
		if ((typeof value === 'object') && (value !== null)) {
			return true;
		} else {
			return false;
		}		
	} // isValid
};

export default object;