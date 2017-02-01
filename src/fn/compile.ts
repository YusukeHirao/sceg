import * as fs from 'fs';
import * as path from 'path';

import assignConfig from './assignConfig';
import { IScegConfig, IScegElement } from '../sceg';

import compileHtml from './compileHtml';
import compilePug from './compilePug';

export default function compile (sourceCode: string, index: number, filePath: string, config: IScegConfig): IScegElement {
	config = assignConfig(config);
	const extname = path.extname(filePath);
	const filename = path.basename(filePath, extname);
	switch (extname.toLowerCase()) {
		case '.pug':
		case '.jade': {
			return compilePug(sourceCode, index, filename, config);
		}
		default: {
			return compileHtml(sourceCode, index, filename, config);
		}
	}
}
