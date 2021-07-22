import fs from 'fs';
import path from 'path';
import yaml from 'yaml';
import env from './env';

const configPath = path.join(__dirname, `../../config/${env}.yml`);
const configText = fs.readFileSync(configPath, {encoding: 'utf-8'});
export default yaml.parse(configText);
