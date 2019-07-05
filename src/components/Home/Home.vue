<template>
	<div class='-background -full-screen -min-view-size -flex-column home'>
		<div class='top'>
			<Header/>
		</div>
		<SideBar @lock='onLockSidebar'/>
	</div>
</template>

<script>
import Header from '@/components/Home/Header';
import SideBar from '@/components/Home/SideBar';

export default {
	name: 'Home', 
	
	components: {
		Header,
		SideBar
	},
	
	data() {
		return {
			contentStatus: 'expanded'
		};
	},

	created() {
		console.log('Home created');
		
		this.init();
	},
	
	methods: {		
		onLockSidebar(flag) {
			console.log('On lock sidebar');
			console.log('flag:' + flag);
			
			if (flag) {
				this.contentStatus = 'shrinked';
			} else {
				this.contentStatus = 'expanded';
			}
		},

		/*************************/
		init() {
			console.log('Initialize Home.');
			
			// title
			this.$utils.common.title(this.$t('title'));
			// Login ?
			this.checkLogin();
			// Call when page closed
			this.$utils.events.beforeunload(this.unInit);
		},
		
		unInit() {
			console.log('Uninitialize.');
			
			this.$utils.cache.clear();
		},
		
		checkLogin() {
			console.log('Check login');
			let _this = this;
			
			this.$utils.server.checkLogin().then(function(data) {
				console.log('Check Login request success');
				
				if (data.code !== 0) {
					_this.$router.push({
						path: '/',
						name: 'Login'
					});
				}
			}).catch(function (error) {
				console.log('Check login request fail.');

				_this.$router.push({
					path: '/',
					name: 'Login'
				});
			});
		} // checkLogin
	}
};
</script>

<style scoped src='./Home.less' lang='less'/>
<style scoped>
</style>
