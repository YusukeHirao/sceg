import * as fs from 'fs';
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
					const tmpl = handlebars.compile(sourceCode);
					const result = tmpl(data);
					resolve(result);
				},
			);
		});
	};
}
