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
					<input :id='prefix + "-user-name"' type='text' v-model='userName' placeholder='请输入用户名' class='-inline -text-size-middle' v-enter-next='prefix + "-password"'/>
				</div>
				<div class='item password'>
					<input :id='prefix + "-password"' type='password' v-model='password' placeholder='请输入密码' class='-inline -text-size-middle'  v-on:keyup.enter='onClickLogin' v-enter-next='prefix + "-user-name"'/>
				</div>
				<div class='item login-button'>
					<div :id='prefix + "-login-button"' class='-inline -button-red -text-size-big -ef-click' @click='onClickLogin'>登录</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

export default {
	name: 'Login', 
	
	data() {
		return {
			prefix: 'login-dialog',
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
				this.$utils.message.error(this, '请输入账号');
				return;
			} else if (password === '') {
				this.$utils.message.error(this, '请输入密码');
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
					this.$utils.message.error(_this, '登录请求失败');
				}
			}).catch(function (error) {
				console.log('Login fail');
				console.log('error:' + JSON.stringify(error));

				this.$utils.message.error(_this, '登录请求失败');
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
