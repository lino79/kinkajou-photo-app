(function() {
	'use strict';

	var fake = { getAttribute: function() {} };
	var v = (document.querySelector('[name="version"]') || fake).getAttribute('content');
	window.__DEV__ = (document.querySelector('[name="DEV"]') || fake).getAttribute('content') === 'true';

	requirejs.config({
		paths: {
			'@kinkajou': './node_modules/@kinkajou',
			'@material': './node_modules/@material',
			'@demo': './build',
			'@css': './css',
			'@images': './images',
		},
		urlArgs: function(id, url) {
			return v ? (url.indexOf('?') === -1 ? '?' : '&') + 'v=' + v : '';
		},
	});

})();