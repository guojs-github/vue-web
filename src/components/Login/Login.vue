<template>
	<div id='login' class='-background -full-screen -min-view-size -section login'> 
		<div class='-row middle'>
			<div class='-image logo'> 
				<img src='../../assets/images/logo.png'/>
			</div>
			<div class='-inline sep-v'/> 
			<div class='-inline title'> 
				{{ $t('title') }}
			</div>
			
			<div id='login-dialog' class='-section dialog'> 
				<div class='-text-size-big title'>用户登录</div>
				<div class='item user-name'>
					<heel-input 
						v-model ='userName'
						mode='edit'
						placeholder='请输入用户名'
						:maxlength='10' />
					<!--
					<input id='user-name' type='text' v-model='userName' placeholder='请输入用户名' class='-inline -text-size-middle' v-enter-next='{next: "div#login-dialog input#password"}' autofocus='autofocus'/>
					-->
				</div>
				<div class='item password'>
					<input id='password' type='password' v-model='password' placeholder='请输入密码' class='-inline -text-size-middle'  v-on:keyup.enter='onClickLogin'/>
				</div>
				<div class='item login-button'>
					<div id='login-button' class='-inline -button-red -text-size-big -ef-click' @click='onClickLogin'>登录</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import HeelInput from '@/components/Common/HeelInput/HeelInput';

export default {
	name: 'Login', 
	
	components: {
		HeelInput
	},
	
	data() {
		return {
			userName: '',
			password: ''
		};
	},

	created() {
		console.log('login created');
		
		this.init();
	},

	methods: {
		onClickLogin: function (e) {
			console.log('On click login button.');
			let _this = this;
			let userName = this.userName;
			let password = this.password;
			
			// 验证账号密码非空
			if (userName === '') {
				this.$utils.interface.message.error(this, '请输入账号');
				this.$utils.interface.input.focus('div#login-dialog input#user-name');
				return;
			} else if (password === '') {
				this.$utils.interface.message.error(this, '请输入密码');
				this.$utils.interface.input.focus('div#login-dialog input#password');
				return;
			}

			// 登录
			this.$utils.server.login(this.userName, this.password).then(function(data) {
				console.log('Login success');

				if (data.code === 0) {
					// token
					let userInfo = {
						name: data.name,
						role: data.role,
						token: data.token
					};
					_this.$utils.cache.user(userInfo);

					_this.$router.push({
						path: '/Home',
						name: 'Home'
					});
				} else {
					this.$utils.interface.message.error(_this, '登录请求失败');
				}
			}).catch(function (error) {
				console.log('Login fail');
				console.log('error:' + JSON.stringify(error));

				this.$utils.interface.message.error(_this, '登录请求失败');
			});		
		}, // onClickLogin
		
		/*****************************/
		init: function() {
			console.log('Initialize the Login component');
			
			this.$utils.common.title(this.$t('loginTitle'));						
		} // init
	}
};
</script>

<style scoped src='./Login.less' lang='less'/>
<style scoped>
</style>
