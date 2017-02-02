import * as glob from 'glob';

import { IScegConfig } from '../sceg';
import assignConfig from './assignConfig';

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
