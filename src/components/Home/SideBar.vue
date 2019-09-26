<template>
	<div class='-border-right side-bar' :class='status' @mouseenter='onMouseEnter' @mouseleave='onMouseLeave'>
		<SearchMenu :options='menuList4Search' @select='onClickMenu' v-show='status === "expanded"'/>
		<div class='-image -inline search-icon' v-if='status === "shrinked"'>
			<img src='../../assets/images/magnifier.png'/>
		</div>
		
		<el-tree class='-scroll-y menu' :data='menuList' @node-click='onClickMenu' v-if='status === "expanded"'>
		</el-tree>

		<div class='bottom'>
			<div class='-image -left lockSidebar' @click='onClickLockSidebar' v-if='!locked'>
				<img class='-ef-click' src='../../assets/images/arrow-right.png'/>
			</div>
			<div class='-image -right unlockSidebar' @click='onClickUnlockSidebar' v-else>
				<img class='-ef-click' src='../../assets/images/arrow-left.png'/>
			</div>
		</div>
	</div>
</template>

<script>
import SearchMenu from './SearchMenu';
// import { OPEN_MENU } from '../../store/mutation-types';

export default {
	name: 'SideBar', 

	components: {SearchMenu},

	data() {
		return {
			status: 'shrinked',
			locked: false, // 是否锁定工具栏
			search: '',
			menuList: [],
			menuList4Search: []
		};
	},
	
	watch: {
		menuList(val, oldVal) {
			console.log('Generate menu list 4 search.');
			
			this.menuList4Search = [];
			this.generateMenuList4Search(this.menuList);
			console.log(JSON.stringify(this.menuList4Search));
		}
	},

	created() {
		console.log('side bar created');
		
		this.loadMenu();		
	},
	
	methods: {
		onMouseEnter: function(e) {
			console.log('On mouse enter side bar.');
			
			if (!this.locked) {
				this.status = 'expanded';
			}
		},

		onMouseLeave: function(e) {
			console.log('On mouse leave side bar.');

			if (!this.locked) {
				this.status = 'shrinked';
			}
		},
			
		onClickMenu: function(e) {
			console.log('On click menu.');
			console.log(JSON.stringify(e));
			
			if ((typeof e.key === 'string') && (e.key.trim().length > 0)) {
				console.log('Try to open menu');
				let menu = {
					label: e.label,
					key: e.key,
					param: e.param
				};

				this.$utils.eventBus.$emit('open-menu', menu);
			} 
		},
		
		onClickLockSidebar: function(e) {
			console.log('On click lock sidebar');
			
			this.locked = true;
			this.status = 'expanded';
			
			this.$emit('lock', this.locked);
			this.$utils.eventBus.$emit('sidebar-status-change', 'expand');
		},

		onClickUnlockSidebar: function(e) {
			console.log('On click unlock sidebar');
			
			this.locked = false;

			this.$emit('lock', this.locked);
			this.$utils.eventBus.$emit('sidebar-status-change', 'shrink');
		},
		
		/********************************/
		loadMenu() {
			console.log('Load menu');

			let _this = this;
			this.$utils.server.menu().then(function(data){
				console.log('Menu data received');
				
				if (data.code === 0) {
					_this.menuList = data.menu;
				}
			});
		},
		
		generateMenuList4Search(list, path) {
			// Check
			let currentPath = ''; 
			if (path) {
				currentPath = path;
			}
			
			// search list
			for (let i = 0; i < list.length; i++) {
				if (list[i].children) {
					let childrenPath = currentPath + '\\' + list[i].label;
					this.generateMenuList4Search(list[i].children, childrenPath);
				} else {
					this.menuList4Search.push({
						label: list[i].label,
						key: list[i].key,
						param: list[i].param ? list[i].param : {},
						path: currentPath === '' ? '\\' : currentPath
					});
				}
			}
		} // generateMenuList4Search
	}	
};
</script>

<style scoped src='./SideBar.less' lang='less'/>
<style scoped>
</style>
