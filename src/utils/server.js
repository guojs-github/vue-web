/*
  Sever business interface
*/
import request from './common/request';
import config from './config';

const server = {
	// 样例接口
	login: (user, password) => {
		console.log('login request');

		let p = new Promise( function(resolve, reject) {
			/*
			// 必定失败post测试
			request.post(
				config.server + '/api-sys/sys/login', 
				{
					user: user, 
					password: password
				},
				10000
			).then( function(response) {
				console.log('login request success');
				
				resolve(response);
			}).catch(function (error) {
				console.log('login request fail.');

				reject(error);
			});
			*/
			
			let url = config.server + '/static/Login.txt?user=' + user + '&password=' + password;
			console.log(url);
			request.get(url, 10000).then( function(data) {
				console.log('login request success');
				resolve(data);
			}).catch(function (error) {
				console.log('login request fail.');

				reject(error);
			});			
		});
		return p;
	}
};

export default server;
