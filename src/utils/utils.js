/*
	install utilities
*/
import common from './common';
import browser from './browser';

const utils = {};
utils.install = function (Vue, options) {
	Vue.prototype.$utils = {};
	Vue.prototype.$utils.common = common;
	Vue.prototype.$utils.browser = browser;
};

export default utils;
