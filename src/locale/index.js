/*
	i18n 多语言国际化
*/

import Vue from 'vue';
import VueI18n from 'vue-i18n';
import browser from '../utils/common/browser';

Vue.use(VueI18n);
const DEFAULT_LANG = 'zh';
const locales = {
	zh: require('./lang/zh.js'),
	en: require('./lang/en.js')
};

var language = DEFAULT_LANG;
if (browser.isChinese()) {
	language = 'zh'
} else {
	language = 'en'
}

const i18n = new VueI18n({
	locale: language,
	messages: locales
});

export default i18n;
