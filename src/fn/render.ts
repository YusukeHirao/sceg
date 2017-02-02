import * as fs from 'fs';
import * as handlebars from 'handlebars';
import * as path from 'path';
import * as pug from 'pug';

import { IScegContentData, IScegOption } from '../sceg';
import assignConfig from './assignConfig';

export default function render (option?: IScegOption) {
	const config = assignConfig(option);
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
							resolve(renderPug(sourceCode, data, config.layout));
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

function renderPug (sourceCode: string, data: IScegContentData, filename: string) {
	return pug.compile(sourceCode, { pretty: true, filename })(data);
}

function renderHbs (sourceCode: string, data: IScegContentData) {
	return handlebars.compile(sourceCode)(data);
}
