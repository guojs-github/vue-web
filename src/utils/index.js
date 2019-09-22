/*
	install utilities
*/
import cache from './cache';
import eventBus from './common/event-bus';
import browser from './common/browser';
import common from './common/common';
import events from './common/events';
import object from './common/object';
import pinyin from './common/pinyin';
import storage from './common/storage';
import string from './common/string';
import message from './interface/message';
import input from './interface/input';
import server from './server';

const utils = {};
utils.install = function (Vue, options) {
	Vue.prototype.$utils = {};
	Vue.prototype.$utils.browser = browser;
	Vue.prototype.$utils.cache = cache;
	Vue.prototype.$utils.common = common;
	Vue.prototype.$utils.events = events;
	Vue.prototype.$utils.eventBus = eventBus;
	Vue.prototype.$utils.object = object;
	Vue.prototype.$utils.pinyin = pinyin;
	Vue.prototype.$utils.server = server;
	Vue.prototype.$utils.storage = storage;
	Vue.prototype.$utils.string = string;
	Vue.prototype.$utils.interface = {};
	Vue.prototype.$utils.interface.message = message;
	Vue.prototype.$utils.interface.input = input;
};

export default utils;
