import fsp from 'fs/promises';

interface MigrationInfo {
	number: number;
	name: string;
	path: string;
}

async function getMigrationsList() {
	const scripts = await fsp.readdir(__dirname);
	const list: Record<string, MigrationInfo> = {};
	for (let i = 0; i < scripts.length; i++) {
		const scriptNumber = Number(scripts[i].split('-')[0]);
		if (isNaN(scriptNumber)) {
			continue;
		}
		list[scriptNumber] = {
			number: scriptNumber,
			name: scripts[i].split('-').slice(1).join('-').split('.ts')[0],
			path: scripts[i]
		};
	}
	return list;
}

const getAvailableMigrationsMessage = (scripts: Record<string, MigrationInfo>) => {
	return Object.values(scripts).map(({ number, name }) => `\t${number} - ${name}`).join('\n');
}

async function migrate() {
	const scripts = await getMigrationsList();
	const migrationNumber = Number(process.argv[3]);
	if (isNaN(migrationNumber)) {
		console.log(`You must pass the migration number:
	npm run migrate 1

Available migrations:
${getAvailableMigrationsMessage(scripts)}\n`);
		throw new Error(`No migration number`);
	}

	const script = scripts[migrationNumber];
	if (!script) {
		console.log(`There's no migration ${migrationNumber}.

Available migrations:
${getAvailableMigrationsMessage(scripts)}\n`);
		throw new Error(`No migration ${migrationNumber}`);
	}

	const migration = require(`./${script.path}`);
	return migration.default();
}

migrate().then(() => {
	console.log('Migration is completed.');
}, console.error);