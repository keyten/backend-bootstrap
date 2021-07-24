import { Sequelize } from 'sequelize';
import config from '../lib/config';
import { databaseUrl } from '../lib/secret-config';

console.log({
	dialect: 'postgres',
	...config.sequelizeConfig
})

export const sequelize = new Sequelize(databaseUrl, {
	dialect: 'postgres',
	...config.sequelizeConfig
});

if (process.env.TESTING_MODE === 'TRUE') {
	sequelize.authenticate().then(() => {
		console.log('Sequelize is connected');
	}, console.error);
}