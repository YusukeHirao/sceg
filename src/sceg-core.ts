import * as fs from 'fs';
import * as glob from 'glob';
import * as path from 'path';
import * as handlebars from 'handlebars';
import * as mkdirp from 'mkdirp';

import { IScegElement } from './IScegElement';

import assignConfig from './fn/assignConfig';
import compile from './fn/compile';

export interface IScegOption {
	indexDir?: string;
	index?: string;
	elementDir?: string;
	elements?: string;
	outDir?: string | null;
	otherLabel?: string;
}

export interface IScegConfig {
	indexDir: string;
	index: string;
	elementDir: string;
	elements: string;
	outDir: string | null;
	otherLabel: string;
}

interface IScegContentData {
	categories: IScegCategory[];
	contents: IScegContents;
}

interface IScegCategory {
	name: string;
	id: string;
}

interface IScegContents {
	[ category: string ]: IScegContent;
}

interface IScegContent {
	category: IScegCategory;
	el: IScegElement[];
}

const ID_PREFIX = 'sceg-cat-';

export let config: IScegConfig;

export function sceg (option?: IScegOption): void {
	config = assignConfig(option);
	const globPath = `${config.elementDir}/${config.elements}`;
	const renderPromise = loadElements(globPath)
		.then(compileElements)
		.then(optimizeContent)
		.then(render);

	renderPromise.then((html) => {
		const file: string = config.outDir || '';
		if (file) {
			mkdirp(path.dirname(file), (err) => {
				fs.writeFile(file, html, (err) => {
					if (err) {
						throw err;
					}
				});
			});
		}
	});
}

function loadElements (globPath: string): Promise<string[]> {
	return new Promise<string[]>((resolve, reject) => {
		glob(globPath, (err, elementFilePathes) => {
			if (err) {
				reject(err);
				throw err;
			}
			resolve(elementFilePathes);
		});
	});
}

function compileElements (elementFilePathes: string[]): Promise<IScegElement[]> {
	return Promise.all(elementFilePathes.map(compile));
}

function optimizeContent (elements: IScegElement[]): IScegContentData {
	const categories: IScegCategory[] = [];
	const contents: IScegContents = {};
	elements
		.sort((a, b) => a.index - b.index)
		.forEach((el) => {
			const category: IScegCategory = {
				name: el.category,
				id: ID_PREFIX + encodeURIComponent(el.category),
			};
			if (el.category && !(el.category in contents)) {
				categories.push(category);
				contents[el.category] = {
					category,
					el: [],
				};
			}
			contents[el.category].el.push(el);
		});
	return { categories, contents };
}

function render (data: IScegContentData): Promise<string> {
	return new Promise<string>((resolve, reject) => {
		const index = `${config.indexDir}/${config.index}`;
		fs.readFile(
			index,
			'utf-8',
			(err, sourceCode) => {
				if (err) {
					reject(err);
					throw err;
				}
				const tmpl = handlebars.compile(sourceCode);
				const result = tmpl(data);
				resolve(result);
			}
		);
	});
}
