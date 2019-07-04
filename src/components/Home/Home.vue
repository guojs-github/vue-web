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
		this.$utils.common.title(this.$t('title'));
		this.checkLogin();
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
		checkLogin() {
			console.log('Check login');
			
			let user = this.$utils.cache.user();
			if ((typeof user === 'object')
				&& (typeof user.token === 'string')
				&& (user.token.trim().length > 0)) {
				return;
			}
			
			this.$router.push({
				path: '/',
				name: 'Login'
			});
		}
	}
};
</script>

<style scoped src='./Home.less' lang='less'/>
<style scoped>
</style>
