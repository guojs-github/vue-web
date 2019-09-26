<template>
	<div class="search menu-search">
		<el-select
			v-model='keywords'
			clearable
			filterable
			:filter-method='onFilter'
			reserve-keyword
			placeholder='请输入关键词'
			@change='onChange'
			@focus='onFocus'>
			<el-option
				class='menu-dropdown-list'				
				:key="item.value"
				:label="item.label"
				:value="item.value"
				v-for="item in filterOptions">
				<div class='menu-dropdown-list-item'>
					<div class='-text-size-small -text-light path'> {{item.path}} </div>
					<div class='-text-size-normal label'> {{item.label}} </div>
				</div>
			</el-option>
		</el-select>
	</div>
</template>

<script>

export default {
	name: 'SearchMenu', 
	
	components: {
	},
	
	props: {
		options: {
			type: Array,
			default: function() {
				return [];
			}
		}
	},
	
	data() {
		return {
			keywords: '',
			allOptions: [],
			filterOptions: []
		};
	},

	mounted() {
		console.log('Menu search found.');
		this.updateOptions();
	},
	
	watch: {
		options(val, oldVal) {
			console.log('options changed.');
			this.updateOptions();
		}
	},

	methods: {
		onFilter(val) {
			console.log('keywords:' + val);
			
			this.doFilterOptions(val);
		},
		
		onChange(val) {
			console.log('value:' + val);

			let data = this.getData(val);
			if (data !== null) {
				this.$emit('select', data);
			}
		},
		
		onFocus() {
			console.log('On focus');
			
			this.keywords = '';
			this.onFilter(this.keywords);
		},
				
		/**************************/
		updateOptions() {
			console.log('update options');
			
			this.allOptions = [];
			for (let i = 0; i < this.options.length; i++) {
				let allOption = this.options[i];
				allOption.name = allOption.label.toLowerCase(); 
				allOption.full = this.$utils.pinyin.getFullChars(allOption.label).toLowerCase(); 
				allOption.camel = this.$utils.pinyin.getCamelChars(allOption.label).toLowerCase(); 
				allOption.value = i;
				this.allOptions[this.allOptions.length] = allOption;
			}
			console.log(JSON.stringify(this.allOptions));			

			this.doFilterOptions(this.keywords);
		},
		
		doFilterOptions(keywords) {
			console.log('do filter options');
			let val = keywords.toLowerCase();
			
			if (val) {
				this.filterOptions = this.allOptions.filter((item) => {
					if (item.name.indexOf(val) >= 0) { // 名称
						return true;
					}
					if (item.full.indexOf(val) >= 0) { // 全拼音
						return true;
					}
					if (item.camel.indexOf(val) >= 0) { // 首字母
						return true;
					}					
				});
			} else {
				this.filterOptions = this.allOptions;
			}
		},
		
		getData(val) {
			console.log('Get data by value.');
			console.log('value:' + val);
			
			for (let i = 0; i < this.allOptions.length; i++) {
				if (val === this.allOptions[i].value) {
					return this.allOptions[i];
				}
			}
			
			return null;
		}
	}	
};
</script>

<style scoped src='./SearchMenu.less' lang='less'/>
<style scoped>
</style>
