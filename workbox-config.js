module.exports = {
	globDirectory: '.',
	globPatterns: [
		'**/*.{png,html,json,js,css}'
	],
	swDest: 'sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};