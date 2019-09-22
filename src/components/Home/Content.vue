<template>
	<div id='main-content' class='content' :class='status + " " + headerStatus'>
		<el-tabs v-model="currentTab" type="border-card" closable @tab-remove="onCloseTab" class='tabs' v-if='tabs.length > 0'>
			<el-tab-pane
				v-for="(item) in tabs"
				:key="item.name"
				:label="item.title"
				:name="item.name">
				<component v-bind:is="item.component" v-bind:param='item.param' @closeTabs="onCloseTab"></component>
			</el-tab-pane>	
		</el-tabs>
	</div>
</template>

<script>
export default {
	name: 'Content', 
	
	props: {
	},
	
	data() {
		return {
			currentTab: '', // 当前选中tab的name
			tabs: [], // tab页面清单
			status: 'expand',
			headerStatus: 'header-expand'
		};
	},
	
	created() {
		console.log('Content created.');
		
		this.init();
	},

	methods: {
		onCloseTab(targetName) {
			console.log('Close tab ' + targetName);
			
			this.closeTab(targetName);
		},

		onHeaderStatusChange(status) {
			console.log('On header bar status change.');
			console.log('Status:' + status);
			
			this.headerStatus = 'header-' + status;
		},
		
		onSidebarStatusChange(status) {
			console.log('On side bar status change.');
			console.log('Status:' + status);
			
			if (status === 'shrink') {
				this.status = 'expand';
			} else {
				this.status = 'shrink';
			}
		},

		onOpenMenu(menu) {
			console.log('On open menu.');
			console.log('menu:' + JSON.stringify(menu));

			let name = menu.key;
			let param = {};
			if (typeof menu.param === 'object') {
				param = menu.param;
				
				if (typeof menu.param.id !== 'undefined') {
					name += menu.param.id;
				}
			}

			this.openTab({
				title: menu.label,
				name: name,
				component: this.loadComponent(menu.key),
				param: param
			});
			
		},
		
		/*************************/
		init() {
			console.log('Initialize component content of Home');

			/*
			// 自动打开首页
			this.openTab({
				title: '首页',
				name: 'home-page',
				component: this.loadComponent('/HomePage/HomePage')
			});
			*/
			
			this.events();
		},
		
		events() {
			console.log('bind handler 4 events');

			this.$utils.eventBus.$on('header-status-change', this.onHeaderStatusChange);			
			this.$utils.eventBus.$on('sidebar-status-change', this.onSidebarStatusChange);			
			this.$utils.eventBus.$on('open-menu', this.onOpenMenu);			
		},
		
		loadComponent(name) {
			console.log('Load component:' + name);
			
			return () => import('@/components' + name + '.vue');
		},
		
		isExists(name) {
			console.log('tab exist?');
			console.log('name:' + name);
			let tabs = this.tabs;
			let ret = false;
			
			tabs.forEach((tab, index) => {
				if (tab.name === name) {
					ret = true;
					return true;
				}
			});
			
			return ret;
		},
		
		openTab(tab) {
			console.log('Open tab');
			console.log(JSON.stringify(tab));
			
			if (!this.isExists(tab.name)) {
				this.tabs.push(tab);
			}
			this.currentTab = tab.name;
		},
		
		closeTab(targetName) {
			let tabs = this.tabs;
			let activeName = this.currentTab;
			if (activeName === targetName) { // 切换当前tab
				tabs.forEach((tab, index) => {
					if (tab.name === targetName) {
						let nextTab = tabs[index + 1] || tabs[index - 1];
						if (nextTab) {
							activeName = nextTab.name;
						}
					}
				});
			}

			this.currentTab = activeName;
			this.tabs = tabs.filter(tab => tab.name !== targetName);
		}
		
	}	
};
</script>

<style scoped src='./Content.less' lang='less'/>
<style scoped>
</style>
