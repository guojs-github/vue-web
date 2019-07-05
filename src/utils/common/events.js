/*
	System events Browser related routines.
	2019.7.5 GuoJS
*/

const events = (new function() {
	this.beforeunload = function(callback) {
		console.log('Add beforeunload event handler');
		
		// Check
		if (typeof callback !== 'function') {
			return;
		}
		
		// Add
		window.addEventListener('beforeunload', e => callback(e));
	};

	this.unload = function(callback) {
		console.log('Add unload event handler');
		
		// Check
		if (typeof callback !== 'function') {
			return;
		}
		
		// Add
		window.addEventListener('unload', e => callback(e));
	};
}());

export default events;
