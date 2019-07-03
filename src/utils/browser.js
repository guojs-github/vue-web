/*
	Browser related routines.
	2018.8.24 GuoJS
	
	Add BROWSER_TYPE, type, isIE, availHeight 
	2018.11.22 GuoJS
	
	2019.7.3 import into vue project
*/

const browser = {
	BROWSER_TYPE: {
		UNKNOWN: 'Unknown',
		OPERA: 'Opera',
		FIREFOX: 'Firefox',
		CHROME: 'Chrome',
		SAFARI: 'Safari',
		EDGE: 'Edge',
		WEIXIN: 'Weixin',
		IE: 'IE'
	},
	
	type: function() { // Return the type of browser
		console.log("Browser type");
		
		var userAgent = navigator.userAgent; //ȡ���������userAgent�ַ���  
		var isOpera = userAgent.indexOf("Opera") > -1; //�ж��Ƿ�Opera�����  
		var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //�ж��Ƿ�IE�����  
		var isIE11 = -1 < userAgent.indexOf("Trident") &&  -1 < userAgent.indexOf("rv") > -1 && !isIE;
		var isEdge = userAgent.indexOf("Edge") > -1 && !isIE11; //�ж��Ƿ�IE��Edge�����  
		var isWeixin = userAgent.toLowerCase().indexOf("micromessenger") > -1; // �ж��Ƿ�΢�������
		var isFF = userAgent.indexOf("Firefox") > -1; //�ж��Ƿ�Firefox�����  
		var isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1 && !isWeixin; //�ж��Ƿ�Safari�����  
		var isChrome = userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1 && !isWeixin;; //�ж�Chrome�����  
		var reIE = null;
		var fIEVersion = null;
		
		try {
			if (isIE) { // IE
				 reIE = new RegExp("MSIE (\\d+\\.\\d+);");
				 reIE.test(userAgent);
				 fIEVersion = parseFloat(RegExp["$1"]);
				 if ((7 <= fIEVersion) && ( 11 >= fIEVersion)) return this.BROWSER_TYPE.IE + fIEVersion;
				 else return this.BROWSER_TYPE.IE;
			} else if (isIE11)
				return this.BROWSER_TYPE.IE + "11";			
			else if (isEdge) 
				return this.BROWSER_TYPE.EDGE;			
			else if (isOpera) 
				return this.BROWSER_TYPE.OPERA;			
			else if (isFF) 
				return this.BROWSER_TYPE.FIREFOX;			
			else if (isSafari) 
				return this.BROWSER_TYPE.SAFARI;			
			else if (isChrome) 
				return this.BROWSER_TYPE.CHROME;		
			else if (isWeixin)
				return this.BROWSER_TYPE.WEIXIN;		
			else
				return this.BROWSER_TYPE.UNKNOWN;				
		} catch(ex) {
			throw ex;
		} finally {
			userAgent = null;  
			isOpera = null;  
			isIE = null;
			isEdge = null;
			isFF = null;
			isSafari = null; 
			isChrome = null;
			reIE = null;
			fIEVersion = null;
		}		
	},
	
	isIE: function() { 
		console.log("Is ie browser?");
		var type = this.type();
		
		try {
			if (-1 < type.indexOf(this.BROWSER_TYPE.IE))
				return true;
			else
				return false;
		} catch(ex) {
			throw ex;
			return false;
		} finally {
			type = null
		}
	},
	
	availHeight: function() { // ���㵱ǰ������������¿��ø߶�,�������������
		var type = '';
		var height = 0;
		var taskBarHeight = 40; // �������߶�
		var screenTop = 0;
		
		try {
			type = this.type();				
			// alert(type);
			// alert(this.isIE());
			if (this.isIE()) { // IE
				screenTop = 108; /* IE, window toolbar+ window menu�߶�*/
				return screen.availHeight/*��Ļ�ֱ��ʣ�ȥ����������ȥ����ǰ���ڱ������߶�*/ - screenTop/* Chrome caption+toolbar+menu�߶�*/;
			} else if (this.BROWSER_TYPE.CHROME == type) { // Chrome
				screenTop = 90; /* Chrome, window caption+ window menu + window menu�߶�*/
				return screen.availHeight/*��Ļ�ֱ���*/ - taskBarHeight - screenTop;
			} else { // Other
				screenTop = 90; /* Chrome, window caption+ window menu + window menu�߶�*/
				return screen.availHeight/*��Ļ�ֱ���*/ - taskBarHeight - screenTop;
			}
		} catch(e) {
			throw e;
		} finally {
			type = null;
			height = null;
			taskBarHeight = null;
			screenTop = null;
		}
	},
	
	language: function() {
		console.log('Get browser language');
		var type = this.type();
		var DEFAULT_LANGUAGE = 'en';
		var result = DEFAULT_LANGUAGE;
		
		try {
			if (-1 < type.indexOf(this.BROWSER_TYPE.IE)) {
				result = window.navigator.userLanguage.toLowerCase();
			}
			else {
				result = window.navigator.language.toLowerCase();
			}
			
			return result;
		} catch(ex) {
			result = DEFAULT_LANGUAGE;
			return result;
		} finally {
			type = null;
			DEFAULT_LANGUAGE = null;
			result = null;
		}
	},
	
	isChinese: function() {
		console.log('The language is chinese?');
		
		if (this.language() == 'zh-cn')
			return true;
		else
			return false;
	}
};

export default browser;
