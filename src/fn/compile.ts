import * as fs from 'fs';
import * as path from 'path';

import { IScegElement } from '../IScegElement';

import compilePug from './compilePug';
import compileHtml from './compileHtml';

export default function compile (elementFilePath: string, index: number): Promise<IScegElement> {
	const extname = path.extname(elementFilePath);
	const filename = path.basename(elementFilePath, extname);
	const promise = new Promise<IScegElement>((resolve, reject) => {
		fs.readFile(
			elementFilePath,
			'utf-8',
			((index: number, filename: string, err: NodeJS.ErrnoException, sourceCode: string) => {
				if (err) {
					reject(err);
					throw err;
				}
				switch (extname.toLowerCase()) {
					case '.pug':
					case '.jade': {
						const el = compilePug(sourceCode, index, filename);
						resolve(el);
					}
					break;
					default: {
						const el = compileHtml(sourceCode, index, filename);
						resolve(el);
					}
				}
			}).bind(fs, index, filename)
		);
	});
	return promise;
}
