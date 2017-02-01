import * as fs from 'fs';
import * as glob from 'glob';
import * as handlebars from 'handlebars';
import * as mkdirp from 'mkdirp';
import * as path from 'path';

import { IScegElement } from './IScegElement';

import assignConfig from './fn/assignConfig';
import compile from './fn/compile';

export interface IScegOption {
	indexDir?: string;
	index?: string;
	elementDir?: string;
	elements?: string;
	otherLabel?: string;
}

export interface IScegConfig {
	indexDir: string;
	index: string;
	elementDir: string;
	elements: string;
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

export function load (option?: IScegOption): Promise<string> {
	config = assignConfig(option);
	const globPath = `${config.elementDir}/${config.elements}`;
	return globElements(globPath)
		.then(readElements)
		.then(optimize)
		.then(render);
}

export function output (html: string, filePath: string): Promise<void> {
	return new Promise<void>((resolve, reject) => {
		mkdirp(path.dirname(filePath), (ioErr) => {
			if (ioErr) {
				reject(ioErr);
				throw ioErr;
			}
			fs.writeFile(filePath, html, (writeErr) => {
				if (writeErr) {
					reject(writeErr);
					throw writeErr;
				}
				resolve();
			});
		});
	});
}

function globElements (globPath: string): Promise<string[]> {
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

function readElements (elementFilePathes: string[]): Promise<IScegElement[]> {
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
					resolve(compile(sourceCode, _index, _elementFilePath));
				}).bind(fs, index, elementFilePath),
			);
		});
		return promise;
	}));
}

export function optimize (elements: IScegElement[]): IScegContentData {
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

export function render (data: IScegContentData): Promise<string> {
	return new Promise<string>((resolve, reject) => {
		config = assignConfig(config);
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
			},
		);
	});
}
