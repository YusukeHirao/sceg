import * as glob from 'glob';

import assignConfig from './assignConfig';
import { IScegConfig } from '../sceg';

export default function globElements (globPath: string, config: IScegConfig): Promise<string[]> {
	config = assignConfig(config);
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
