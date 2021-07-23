import {Sequelize} from 'sequelize';
import config from '../lib/config';

export const sequelize = new Sequelize(config.db.url, {
	dialect: 'postgres',
	ssl: false,
	dialectOptions: {
		ssl: {
			require: false,
			rejectUnauthorized: false
		}
	},
});
/* {
	username: config.db.user,
	password: config.db.password,
	database: config.db.database,
	host: config.db.host,
	port: config.db.port,

	dialect: 'postgres'
} */

if (process.env.TESTING_MODE === 'TRUE') {
	sequelize.authenticate().then(() => {
		console.log('Sequelize is connected');
	}, console.error);
}