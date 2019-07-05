/*
  Sever business interface
*/
import request from './common/request';
import config from './config';
import cache from './cache';

const server = {
	// 样例接口
	login: function(user, password) {
		console.log('login request');

		let p = new Promise(function(resolve, reject) {
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
			request.get(url).then( function(data) {
				console.log('login request success');
				resolve(data);
			}).catch(function (error) {
				console.log('login request fail.');

				reject(error);
			});			
		});
		return p;
	},
	
	checkLogin: function() {
		console.log('Check login request');

		let p = new Promise( function(resolve, reject) {
			let token = cache.token();
			if (!((typeof token === 'string') && (token.trim().length > 0))) {
				console.log('Empty token');
				reject(new Error('Empty token'));
			}
						
			let url = config.server + '/static/CheckLogin.txt?token=' + token;
			console.log(url);

			request.get(url).then(function(data) {
				console.log('Check Login request success');
				resolve(data);
			}).catch(function (error) {
				console.log('Check login request fail.');

				reject(error);
			});			
		});
		return p;		
	},
	
	menu: function() {
		console.log('menu request');

		let p = new Promise( function(resolve, reject) {
			let token = cache.token();
			let url = config.server + '/static/Menu.txt?token=' + token;
			console.log(url);

			request.get(url).then(function(data) {
				console.log('Menu request success');
				resolve(data);
			}).catch(function (error) {
				console.log('Menu request fail.');

				reject(error);
			});			
		});
		return p;
	}
};

export default server;
