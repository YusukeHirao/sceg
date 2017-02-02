import * as glob from 'glob';

import { IScegConfig } from '../sceg';

export default function globElements (config: IScegConfig): Promise<string[]> {
	return new Promise<string[]>((resolve, reject) => {
		glob(config.path, (err, elementFilePathes) => {
			if (err) {
				reject(err);
				throw err;
			}
			resolve(elementFilePathes);
		});
	});
}
