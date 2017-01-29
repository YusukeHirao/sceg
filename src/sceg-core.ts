import * as fsp from 'fs-promise';
import * as glob from 'glob';
import * as path from 'path';

import * as pug from 'pug';

export interface ScegOption {
	indexDir?: string;
	index?: string;
	elementDir?: string;
	elements?: string;
}

interface ScegElement {
	html: string;
	title: string;
	comment: string;
	category: string | null;
}

export function sceg (option?: ScegOption): void {
	const config = assignConfig(option);
	const globPath = path.resolve(process.cwd(), config.elementDir, config.elements);
	glob(globPath, (err, elementFilePathes) => {
		if (err) {
			throw err;
		}
		registElements(elementFilePathes);
	});
}

function registElements (elementFilePathes: string[]): void {
	Promise.all(elementFilePathes.map(compile)).then((el) => {
		console.log(el);
	});
}

function compile (elementFilePath: string): Promise<ScegElement> {
	const extname = path.extname(elementFilePath);
	const promise = new Promise<ScegElement>((resolve, reject) => {
		fsp.readFile(elementFilePath, 'utf-8').then((sourceCode) => {
			switch (extname) {
				case '.pug': {
					const el = compilePug(sourceCode);
					resolve(el);
				}
				break;
				default: {
					resolve({
						html: sourceCode,
						title: 'none',
						comment: '',
						category: null,
					});
				}
			}
		});
	});
	return promise;
}

function compilePug (sourceCode: string): ScegElement {
	const title = '';
	const comment = '';
	const category = '';
	return {
		html: pug.render(sourceCode, { pretty: true }),
		title,
		comment,
		category,
	};
}

function assignConfig (option?: ScegOption): ScegOption {
	return Object.assign<ScegOption, ScegOption>(
		{
			indexDir: './',
			index: 'index.html',
			elementDir: './el/',
			elements: '**/*',
		},
		option || {},
	);
}
