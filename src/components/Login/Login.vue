<template>
	<div class='-background -full-screen -min-view-size -section login'> 
		<div class='-row middle'>
			<div class='-image logo'> 
				<img src='../../assets/images/logo.png'/>
			</div>
			<div class='-inline sep-v'/> 
			<div class='-inline title'> 
				{{ $t('title') }}
			</div>
			
			<div class='-section dialog'> 
				<div class='-text-size-big title'>用户登录</div>
				<div class='item user-name'>
					<input type='text' v-model='userName' placeholder='请输入用户名' class='-inline -text-size-middle'/>
				</div>
				<div class='item password'>
					<input type='password' v-model='password' placeholder='请输入密码' class='-inline -text-size-middle'/>
				</div>
				<div class='item login-button'>
					<div class='-inline -button-red -text-size-big -ef-click' @click='onClickLogin' >登录</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import server from '../../utils/server';
import message from '../../utils/message';

export default {
	name: 'Login', 
	
	data() {
		return {
			userName: '',
			password: ''
		};
	},

	created() {
		console.log('login created');
		this.$utils.common.title(this.$t('loginTitle'));
	},

	methods: {
		onClickLogin: function (e) {
			console.log('On click login button.');
			let _this = this;
			let userName = this.userName;
			let password = this.password;
			
			// 验证账号密码非空
			if (userName === '') {
				message.error(this, '请输入账号');
				return;
			} else if (password === '') {
				message.error(this, '请输入密码');
				return;
			}

			// 登录
			server.login(this.userName, this.password).then(function(data) {
				console.log('Login success');

				if (data.code === 0) {
					// token
					// localStorage.setItem('token', data.token);

					_this.$router.push({
						path: '/Home',
						name: 'Home'
					});
				} else {
					message.error(_this, '登录请求失败');
				}
			}).catch(function (error) {
				console.log('Login fail');
				console.log('error:' + JSON.stringify(error));

				message.error(_this, '登录请求失败');
			});		
		}
	}
};
</script>

<style scoped src='./Login.less' lang='less'/>
<style scoped>
</style>
