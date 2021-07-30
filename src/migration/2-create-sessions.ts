import query from '../lib/db';
import { promiseReduce } from '../lib/utils';

// https://github.com/voxpelli/node-connect-pg-simple/blob/HEAD/table.sql
export default () => promiseReduce<any>([
	() => query(`CREATE TABLE "session" (
		"sid" varchar NOT NULL COLLATE "default",
		"sess" json NOT NULL,
		"expire" timestamp(6) NOT NULL
	) WITH (OIDS=FALSE);`),
	() => query(`ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;`),
	() => query(`CREATE INDEX "IDX_session_expire" ON "session" ("expire");`)
]);