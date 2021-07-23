import {Pool} from 'pg';
import knexClient from 'knex';
import config from './config';

export const knex = knexClient({ client: 'pg' });

export const pool = new Pool({
	connectionString: config.db.url,
	ssl: {
		rejectUnauthorized: false
	}
});

export default async function(query: string) {
	return new Promise((resolve, reject) => {
		pool.connect((err, client) => {
			if (err) {
				console.error(`PostgreSQL connect error: ${err}`);
				reject(err);
			}

			client.query(query).then((value) => {
				console.log(query, '->', value.rows);
				resolve(value);
			}, (err) => {
				console.error(`PostgreSQL query error: ${err}`);
				reject(err);
			}).finally(() => {
				client.release();
			})
		});
	});
}
