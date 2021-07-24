import fs from 'fs';
import path from 'path';
import yaml from 'yaml';
import env from './env';

const configPath = path.join(__dirname, `../../config/${env}.yml`);
const configText = fs.readFileSync(configPath, {encoding: 'utf-8'});
const configValue = yaml.parse(configText);
export default configValue;

if (process.env.TESTING_MODE === 'TRUE') {
	console.log('Config installed:\n' + JSON.stringify(configValue));
}
