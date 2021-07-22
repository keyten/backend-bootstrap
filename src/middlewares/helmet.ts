import helmet from 'helmet';

export default helmet({
	contentSecurityPolicy: {
		directives: {
			"default-src": ["'self'"],
			"base-uri": ["'self'"],
			"block-all-mixed-content": [],
			"font-src": ["'self'", "https:", "data:"],
			"frame-ancestors": ["'self'"],
			"frame-src": ["'self'", "https://accounts.google.com/"],
			"img-src": ["'self'", "data:"],
			"object-src": ["'none'"],
			"script-src": [
				"'self'",
				"'unsafe-inline'",
				"https://apis.google.com"
			],
			"script-src-attr": ["'none'"],
			"style-src": ["'self'", "https:", "'unsafe-inline'"],
			"upgrade-insecure-requests": [],
		}
	}
});
