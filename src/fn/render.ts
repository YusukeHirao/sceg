import * as fs from 'fs';
import * as path from 'path';
import * as pug from 'pug';
import * as handlebars from 'handlebars';

import assignConfig from './assignConfig';
import { IScegElement, IScegConfig, IScegContentData, IScegCategory, IScegContents } from '../sceg';

export default function render (config: IScegConfig) {
	config = assignConfig(config);
	return (data: IScegContentData): Promise<string> => {
		return new Promise<string>((resolve, reject) => {
			fs.readFile(
				config.layout,
				'utf-8',
				(err, sourceCode) => {
					if (err) {
						reject(err);
						throw err;
					}
					const exname = path.extname(config.layout);
					switch (exname.toLowerCase()) {
						case '.pug':
						case '.jade': {
							resolve(renderPug(sourceCode, data));
						}
						break;
						default: {
							resolve(renderHbs(sourceCode, data));
						}
					}
				},
			);
		});
	};
}

function renderPug (sourceCode: string, data: IScegContentData) {
	return pug.compile(sourceCode, { pretty: true })(data);
}

function renderHbs (sourceCode: string, data: IScegContentData) {
	return handlebars.compile(sourceCode)(data);
}
