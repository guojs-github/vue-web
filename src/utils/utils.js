/*
	install utilities
*/
import common from './common/common';
import browser from './common/browser';
import storage from './common/storage';
import message from './interface/message';
import cache from './cache';
import server from './server';

const utils = {};
utils.install = function (Vue, options) {
	Vue.prototype.$utils = {};
	Vue.prototype.$utils.cache = cache;
	Vue.prototype.$utils.common = common;
	Vue.prototype.$utils.browser = browser;
	Vue.prototype.$utils.message = message;
	Vue.prototype.$utils.server = server;
	Vue.prototype.$utils.storage = storage;
};

export default utils;