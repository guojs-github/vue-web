<template>
	<div class='grid'>
		<vxe-table
			stripe
			resizable
			highlight-hover-row
			max-height='400px'
			size='small'
			:data="tableData">
			<vxe-table-column title="基本信息">
				<vxe-table-column type="index" title="序号" width="60" fixed='left'></vxe-table-column>
				<vxe-table-column field="name" title="Name" width='200' fixed='left'></vxe-table-column>
				<vxe-table-column field="sex" title="Sex" width='100' fixed='left'></vxe-table-column>
			</vxe-table-column>
			<vxe-table-column title="补充信息">
				<vxe-table-column field="age" title="Age" width='1000'></vxe-table-column>
			</vxe-table-column>
			<vxe-table-column title="更多">
				<vxe-table-column field="address" title="Address" width='300' fixed='right' show-overflow></vxe-table-column>
			</vxe-table-column>
		</vxe-table>	
	</div>
</template>

<script>
export default {
	name: 'GridSample', 	

	props: ['param'],

	data() {
		return {
			tableData: []
		};
	},

	created() {
		console.log('Grid sample create');
		
		let testData = [];
		for (let i = 0; i < 1000; i++) {
			testData[testData.length] = {
				name: 'hello',
				age: '121213',
				sex: '女',
				address: '隔壁隔壁隔壁隔壁隔壁隔壁隔壁隔壁隔壁隔壁隔壁隔壁隔壁隔壁隔壁隔壁隔壁隔壁隔壁隔壁隔壁隔壁隔壁隔壁隔壁隔壁隔壁隔壁'
			}
		}
		this.tableData = testData;
	}
};
</script>

<style scoped src='./index.less' lang='less'/>
<style scoped>
</style>
