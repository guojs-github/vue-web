/*
  cache object
*/
import storage from './common/storage';

const cache = {
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
	}
};

export default cache;
