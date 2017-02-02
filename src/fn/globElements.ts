import * as glob from 'glob';

import { IScegOption } from '../sceg';
import assignConfig from './assignConfig';

export default function globElements (option?: IScegOption): Promise<string[]> {
	const config = assignConfig(option);
	const globPath = `${config.elementDir}/${config.elements}`;
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
