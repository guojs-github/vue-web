<template>
	<div class='-background -full-screen -min-view-size -flex-column home'>
		<div class='top'>
			<Header/>
		</div>
	</div>
</template>

<script>
import Header from '@/components/Home/Header';
export default {
	name: 'Home', 
	
	components: {
		Header
	},
	
	data() {
		return {
			contentStatus: 'expanded'
		};
	},

	created() {
		console.log('Home created');
		// this.$title('海航控股精益供应链管理系统');
	},
	
	methods: {		
		/*************************/
	}
};
</script>

<style scoped src='./Home.less' lang='less'/>
<style scoped>
</style>
