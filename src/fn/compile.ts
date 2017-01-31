import * as fs from 'fs';
import * as path from 'path';

import { IScegElement } from '../IScegElement';

import compileHtml from './compileHtml';
import compilePug from './compilePug';

export default function compile (sourceCode: string, index: number, filePath: string): IScegElement {
	const extname = path.extname(filePath);
	const filename = path.basename(filePath, extname);
	switch (extname.toLowerCase()) {
		case '.pug':
		case '.jade': {
			return compilePug(sourceCode, index, filename);
		}
		default: {
			return compileHtml(sourceCode, index, filename);
		}
	}
}
