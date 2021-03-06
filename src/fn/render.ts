import * as fs from 'fs';
import * as handlebars from 'handlebars';
import * as path from 'path';
import * as pug from 'pug';

import { IScegConfig, IScegContentData } from '../sceg';

export default function render (config: IScegConfig) {
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
							resolve(renderPug(sourceCode, data, config, config.data));
							break;
						}
						default: {
							resolve(renderHbs(sourceCode, data, config.data));
						}
					}
				},
			);
		});
	};
}

function renderPug (sourceCode: string, data: IScegContentData, config: IScegConfig, customData: {} = {}) {
	return pug.compile(
		sourceCode,
		Object.assign<pug.Options, pug.Options>(
			{
				filename: config.layout,
				pretty: true,
				doctype: 'html',
			},
			config.pugOption,
		),
	)(Object.assign(customData, data));
}

function renderHbs (sourceCode: string, data: IScegContentData, customData: {} = {}) {
	return handlebars.compile(sourceCode)(Object.assign(customData, data));
}
