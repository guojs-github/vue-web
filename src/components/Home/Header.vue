<template>
	<div class='header -row'>
		<div class='-left left'>
			<div class='-left -image logo'>
				<img src='../../assets/images/logo.png'/>
			</div>
			<div class='-text-size-big -text-white -left title'>
				{{ $t('title') }}
			</div>
		</div>
		<div class='-right right'>
			<div class='-inline user'>
				<div class='-image icon'>
					<img :src='user.headPortrait'/>
				</div>
				<div class='-text-size-normal -text-white -inline text'>
					{{ user.name }}
				</div>
			</div>
			<div class='-image settings'>
				<img src='../../assets/images/settings.png'/>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Header', 
	
	data() {
		return {
			user: {
				name: '用户名',
				headPortrait: '../../static/images/head-portrait-default.png'
			}
		};
	}
};
</script>

<style scoped src='./Header.less' lang='less'/>
<style scoped>
</style>
