import { Sequelize } from 'sequelize';
import config from '../lib/config';
import { databaseUrl } from '../lib/secret-config';

export const sequelize = new Sequelize(databaseUrl, {
	dialect: 'postgres',
	ssl: false,
	dialectOptions: {
		ssl: {
			require: false,
			rejectUnauthorized: false
		}
	},
});

if (process.env.TESTING_MODE === 'TRUE') {
	sequelize.authenticate().then(() => {
		console.log('Sequelize is connected');
	}, console.error);
}