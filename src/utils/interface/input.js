/*
	input control
*/
import string from '../common/string';

const input = {
	focus: (selector) => {
		console.log('Focus input control.');
		console.log('Selector:' + selector);
		
		// Check
		if (!string.isValid(selector)) {
			console.log('Invalid selector');
			return;
		}

		// Do it
		let target = document.querySelector(selector);			
		if (target === null) { // Invalid target element
			return;
		}
		if (typeof target.focus === 'function') {
			target.focus();
		}
		if (typeof target.select === 'function') {
			target.select();
		}				
	}
};

export default input;
