// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill';
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import router from './router'
import i18n from './locale';
import title from './utils/title';

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(title);

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	i18n,
	components: { App },
	template: '<App/>'
})
