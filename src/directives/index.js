/*
	Customized user directives
*/
import enterNext from './enterNext';

const directives = {
	install: function() {
		console.log('Install directives');
		
		enterNext.install();
	}	
};

export default directives;
