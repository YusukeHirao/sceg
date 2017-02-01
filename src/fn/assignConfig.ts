import * as path from 'path';

import { IScegConfig, IScegOption } from '../sceg';

export default function assignConfig (option?: IScegOption): IScegConfig {
	return {
		indexDir: option && option.indexDir ? path.resolve(process.cwd(), option.indexDir) : path.resolve(__dirname, '../../default/layout/'),
		index: option && option.index ? option.index : 'index.hbs',
		elementDir: option && option.elementDir ? path.resolve(process.cwd(), option.elementDir) : path.resolve(__dirname, '../../default/el/'),
		elements: option && option.elements ? option.elements : '**/*',
		otherLabel: option && option.otherLabel ? option.otherLabel : 'others',
	};
}
