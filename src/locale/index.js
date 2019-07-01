/*
	i18n 多语言国际化
*/

import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);
const DEFAULT_LANG = 'zh';
const locales = {
	zh: require('./lang/zh.js'),
	en: require('./lang/en.js')
};

const i18n = new VueI18n({
	locale: DEFAULT_LANG,
	messages: locales
});

export default i18n;
