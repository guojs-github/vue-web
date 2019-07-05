/*
  cache object
*/
import storage from './common/storage';

const cache = {
	clear: function() {
		console.log('Clear cached data.');

		storage.clear();
	},

	user: function(value) {
		console.log('Cache user information');
		console.log('value:' + JSON.stringify(value));
		let key = 'eims-user';
		
		if (typeof value === 'object') {
			storage.setItem(key, JSON.stringify(value));
		} else {
			let retValue = storage.getItem(key);
			if (retValue === "") {
				retValue = "{}";
			}
				
			return JSON.parse(retValue);			
		}
	},
	
	token: function() {
		console.log('Read token');
		let key = 'eims-user';

		try {			
			let value = JSON.parse(storage.getItem(key));

			console.log('token:' + value.token);
			return value.token;
		} catch (error) {
			console.log('Cached token is invalid');
			return '';
		}
	}
};

export default cache;
