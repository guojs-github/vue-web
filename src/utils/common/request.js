/*
	communication utility
*/
import axios from 'axios';
import loading from '../interface/loading';

const request = {
	timeout: 3000,
	
	get: function(url, timeout) {
		console.log('Get request.');
		console.log('url:' + url);

		loading.show();
		let _this = this;
		let p = new Promise(function (resolve, reject) {
			// timeout setting
			let t = _this.timeout;
			if (typeof timeout === 'number') {
				t = timeout;
			}

			// request
			let instance = axios.create();
			instance.get(url, {
				timeout: t
			}).then(function (response) {
				loading.close();				
				console.log('Get request success.');
				console.log('Response:' + JSON.stringify(response));
				
				resolve(response.data);
			}).catch(function (error) {
				loading.close();				
				console.log('Get request fail.');
				console.log('error:' + JSON.stringify(error));

				reject('Get request fail');
			});
		});
		return p;
	},
	
	post: function(url, param, timeout) {
		console.log('Post request.');
		console.log('url:' + url);
		console.log('param:' + JSON.stringify(param));
		
		loading.show();
		let _this = this;
		let p = new Promise(function (resolve, reject) {
			let request = new XMLHttpRequest();
			
			let t = _this.timeout;
			if (typeof timeout === 'number') {
				t = timeout;
			}
			let timer = setTimeout( function() {
				request.abort();//请求中止
			}, t);
			
			request.open('POST', url, true);			
			// 添加http头，发送信息至服务器时内容编码类型
			request.setRequestHeader('Content-Type', 'application/json');  
			request.onreadystatechange = function() {
				loading.close();
				clearTimeout(timer);

				// 请求成功
				// 4：响应已完成;可以获取并使用服务器的响应了
				// 200: 交易完成
				// 304: 客户端已经执行了GET，但文件未变化
				if (request.readyState === 4 && (request.status === 200 || request.status === 304)) {
					console.log('data received');
					console.log(request.responseText);
					
					resolve(request.responseText);
				} else {
					console.log('Post fail');
					
					reject('Post fail');
				}
			};
			request.send(JSON.stringify(param));
		});
		return p;
	}
};

export default request;
