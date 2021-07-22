/**
 * promiseSequence<number>([
 *     (value, index) => Promise.resolve(1),
 *     (value, index) => Promise.resolve(value + 1)
 * ]); -> 2
 */
 export async function promiseReduce<T>(promises: Array<(value: T | undefined, index: number) => Promise<T>>) {
	let value;
	for(var i = 0; i < promises.length; i++) {
		value = await promises[i](value, i);
	}
	return value;
}
