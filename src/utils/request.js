/*
	communication utility
*/
import axios from 'axios';
import loading from './loading';

const request = {
	get: (url) => {
		console.log('Get request.');
		console.log('url:' + url);

		let p = new Promise(function (resolve, reject) {
			axios.get(url).then(function (response) {
				loading.close();				
				console.log('Get request success.');
				console.log('Response:' + JSON.stringify(response));
				
				resolve(response.data);
			}).catch(function (error) {
				loading.close();				
				console.log('Get request fail.');
				console.log('error:' + JSON.stringify(error));

				reject(error);
			});
		});
		return p;
	},
	
	post: (url, param) => {
		console.log('Post request.');
		console.log('url:' + url);
		console.log('param:' + JSON.stringify(param));
		
		loading.show();
		let p = new Promise(function (resolve, reject) {
			let xhr = new XMLHttpRequest();
			xhr.open('POST', url, true);
			
			// 添加http头，发送信息至服务器时内容编码类型
			xhr.setRequestHeader('Content-Type', 'application/json');  
			xhr.onreadystatechange = function() {
				loading.close();

				// 请求成功
				// 4：响应已完成;可以获取并使用服务器的响应了
				// 200: 交易完成
				// 304: 客户端已经执行了GET，但文件未变化
				if (xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 304)) {
					console.log('data received');
					console.log(xhr.responseText);
					resolve(xhr.responseText);
				} else {
					console.log('XMLHttpRequest Post fail');
				}
			};
			xhr.send(JSON.stringify(param));

			/*
			axios.post(
				url, 
				param,
				{
					headers: {'Content-Type': 'application/json'}
				}
			).then(function (response) {
				loading.close();				
				console.log('Get request success.');
				console.log('Response:' + JSON.stringify(response));
				
				resolve(response.data);
			}).catch(function(error) {
				loading.close();				
				console.log('Post request fail');
				console.log('Error:' + JSON.stringify(error));
				reject(error);
			});
			*/
		});
		return p;
	}
};

export default request;
