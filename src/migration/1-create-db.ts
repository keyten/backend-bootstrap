import {
	User
} from '../models';
import { promiseReduce } from '../lib/utils';

export default () => promiseReduce<any>([
	() => User.sync({ force: true }),
]);
/* .then(() => {
	console.log('Migration is completed');
}, console.error); */
