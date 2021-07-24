export const databaseUrl = process.env.DATABASE_URL!;
export const sessionSecret = process.env.SESSION_SECRET!;
export const googleCredentials = collectGoogleCredentials()!;

function collectGoogleCredentials() {
	const clientID = process.env.GOOGLE_CLIENT_ID;
	const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
	const callbackURL = process.env.GOOGLE_CALLBACK_URL;
	return clientID && clientSecret && callbackURL ? {
		clientID,
		clientSecret,
		callbackURL
	} : null;
}

if (process.env.TESTING_MODE === 'TRUE') {
	[
		[databaseUrl, 'DATABASE_URL'],
		[sessionSecret, 'SESSION_SECRET'],
		[googleCredentials, 'GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET / GOOGLE_CALLBACK_URL']
	].forEach(([value, envName]) => {
		if (value) {
			console.log(`Env variable ${envName} = ${value}`);
		} else {
			console.log(`No ${envName} in env variables.`);
		}
	});	
}
