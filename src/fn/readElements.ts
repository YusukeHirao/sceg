import * as fs from 'fs';

import compile from './compile';

import { IScegElement, IScegOption } from '../sceg';
import assignConfig from './assignConfig';

export default function readElements (option?: IScegOption) {
	const config = assignConfig(option);
	return (elementFilePathes: string[]): Promise<IScegElement[]> => {
		return Promise.all(elementFilePathes.map((elementFilePath: string, index: number): Promise<IScegElement> => {
			const promise = new Promise<IScegElement>((resolve, reject) => {
				fs.readFile(
					elementFilePath,
					'utf-8',
					((_index: number, _elementFilePath: string, err: NodeJS.ErrnoException, sourceCode: string) => {
						if (err) {
							reject(err);
							throw err;
						}
						resolve(compile(sourceCode, _index, _elementFilePath, config));
					}).bind(fs, index, elementFilePath),
				);
			});
			return promise;
		}));
	};
}
