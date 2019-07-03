/*
	loading
*/
import { Loading } from 'element-ui';

const loading = {
	loadingInstance: null,
	show: () => {
		console.log('Show loading.');

		this.loadingInstance = Loading.service({
			fullscreen: true
		});
	},

	close: () => {
		console.log('Close loading.');

		if (this.loadingInstance != null) {
			this.loadingInstance.close();
		}
	}
};

export default loading;
