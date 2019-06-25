/*
  Sever business interface
*/
import config from './config';
import request from './request';

const server = {
	getSample: () => {
		console.log('Get request sample.');
		
		let p = new Promise(function (resolve, reject) {
			request.get(config.server + '/static/get.txt').then(function(response) {
				console.log('Get request sample success.');
				resolve(response);				
			});
		});
		return p;
	},

	// 验证码
	idCode: (uuid) => {
		console.log('Get id code image');
		let p = new Promise(function(resolve, reject) {
			request.get(
				config.server + '/api-sys/captcha.jpg?uuid=' + uuid
			).then(function(response) {
				console.log('login request success');
				resolve(config.server + '/api-sys/captcha.jpg?uuid=' + uuid);
			});
		});
		return p;
	},

	// 登录
	login: (accounts, password) => {
		console.log('login request');

		let p = new Promise(function(resolve, reject) {
			request.post(config.server + '/api-sys/sys/login', {accounts: accounts, password: password}).then(function(response) {
				console.log('login request success');
				resolve(response);
			}).catch(function (error) {
				console.log('login request fail.');
				reject(error);
			});
		});
		return p;
	},
	
	// 获取菜单权限
	menu: (token) => {
		console.log('get request menu');
		let p = new Promise(function(resolve, reject) {
			request.get('http://localhost:8080/static/tree.txt').then(function(response) {
				console.log('Get request menu success');
				resolve(response);
			});
		});
		return p;
	},

	airportList: () => {
		console.log('server select request get');
		let p = new Promise(function(resolve, reject) {
			request.get('http://localhost:8080/static/Dictionary.txt').then(function(response) {
				console.log('get request AirportList success');
				resolve(response);
			});
		});
		return p;
	},

	airPortDetail: (id) => {
		console.log('Get request airPortDetail');
		console.log('server airPortDetail id:' + id);
		let air;
		if (id === '' || id === '1') {
			air = new Promise(function(resolve, reject) {
				request.get('http://localhost:8080/static/airportMainNumberTest1.txt').then(function(response) {
					console.log('Get request airPortDetail success');
					resolve(response);
				});
			});
		} else if (id === '2') {
			air = new Promise(function(resolve, reject) {
				request.get('http://localhost:8080/static/airportMainNumberTest2.txt').then(function(response) {
					console.log('Get request airPortDetail success');
					resolve(response);
				});
			});
		} else if (id === '3') {
			air = new Promise(function(resolve, reject) {
				request.get('http://localhost:8080/static/airportMainNumberTest3.txt').then(function(response) {
					console.log('Get request airPortDetail success');
					resolve(response);
				});
			});
		}
		
		return air;
	}
};

export default server;
