import {Sequelize} from 'sequelize';
import config from '../lib/config';

export const sequelize = new Sequelize({
	username: config.db.user,
	password: config.db.password,
	database: config.db.database,
	host: config.db.host,
	port: config.db.port,

	dialect: 'postgres'
});
