/*
	Directive enter next
*/
import Vue from 'vue';
import string from '../utils/common/string';
import object from '../utils/common/object';

const enterNext = {
	install: function() {
		console.log('Install directive enter next');

		Vue.directive('enter-next',{
			inserted: function(el, binding) {
				console.log('Enter next handler inserted.');
				let id = el.id; console.log('ID:' + id);
				let tagName = el.tagName; console.log('Tag name:' + tagName);
				let expression = binding.expression; console.log('Binding expression:' + expression); // 命令绑定的原始表达式
				let value = binding.value; console.log('Binding value:' + JSON.stringify(binding.value)); // 命令绑定的原始表达式的运行值
				let target = null;
				
				// Check
				if (tagName.trim().toLowerCase() !== 'input') {
					return;
				}
				if (!object.isValid(value)) {
					return null;
				}
				if (!string.isValid(value.next)) {
					return null;
				}
				target = document.querySelector(value.next);			
				if (target === null) { // Invalid target element
					return;
				}
			
				// add listener
				el.addEventListener('keyup', (ev) => {
					if (ev.keyCode === 13) {
						console.log('press enter on element.id:' + id);
						
						if (typeof target.focus === 'function') {
							target.focus();
						}
						if (typeof target.select === 'function') {
							target.select();
						}
					}
				});
			} // inserted
		}); // directive
	} // instal
};

export default enterNext;
