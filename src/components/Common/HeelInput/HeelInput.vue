<!--HeelInput控件-->
<template> 
	<div class='heel-input'>
		<template>
			<!-- 只读状态 -->
			<div class='view' :title='displayValue' v-if='mode === "view"'>
				{{displayValue}}
			</div>
			<!-- 编辑状态 -->
			<div class='edit' v-else>
				<input
					v-model='inputValue' 
					type='text'
					:placeholder='placeholder'
					:maxlength='maxlength'/>
				<!-- v-enter-next='{next: "div#login-dialog input#password"}'   autofocus='autofocus' -->
				<!-- 输入框
                <el-input
					ref="el-input"
					v-model='newValue' 					 
					:disabled = 'disabled' 
					size = 'small'
					:placeholder = 'placeholder' 
					:maxlength = 'maxlength'
					:show-word-limit = 'maxlength != Infinity'
					clearable
					@change='onChange'
					@keydown.enter.native='onEnter'
					@focus='onFocus($event)'/>
				-->
			</div>
		</template>
	</div>
</template>

<script>
export default {
	name: 'HeelInput',

	props: {
		mode: { // 显示状态
			type: String,
			default: 'view'
		},

		value: { // 值
			type: String,
			default: ''
		},

		placeholder: { // 输入提示信息
			type: String,
			default: ''
		},
		
		/*
		disabled: {
			type: Boolean,
			default: false
		},
		*/

		maxlength: { // 最大长度限制
			type: Number
		}
	},

	data() {
		return {
		};
	},
	
	computed: {
		inputValue: { // 实际值
			get() {
				return this.value;
			},
			
			set(value) {
				this.$emit('input', value); // 添加了这个可以自动更新绑定的value属性，传递更新值到父组件
			}
		},
		
		displayValue() { // 显示值
			return this.value;
		}
	},
	
	methods: {
		/*
		onFocus(event) { // Focus event
			if (this.autoSelect) {
				event.currentTarget.select();		
			}
		},
		onChange(val) { // 控件值发生变化			
			console.log('BkInput value changed.');
			
			if ((this.type === 'input') || ((this.type === 'string'))) { // 字符串前后不需要空格 
				this.newValue = val = val.trim();
			}

			this.$emit('change', val);
		},

		onEnter(val) { // Press 'ENTER'
			console.log(`BkInput Press 'ENTER'`);

			this.$emit('enter');
		},
		*/

		/*********************/
		/*
		focus() {
			console.log('BkInput set focus');

			this.$refs['el-input'] && this.$refs['el-input'].focus();
			this.$refs['el-input'] && this.$refs['el-input'].select();
		}
		*/
	}
};
</script>

<style src='./HeelInput.less' lang='less'/>
