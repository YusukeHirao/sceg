import * as path from 'path';

import { IScegConfig, IScegOption } from '../sceg';

export default function assignConfig (option: IScegOption, globPattern: string): IScegConfig {
	return {
		path: globPattern,
		layout: option && option.layout ? path.resolve(process.cwd(), option.layout) : path.resolve(__dirname, '../../default/layout/index.hbs'),
		otherLabel: option && option.otherLabel ? option.otherLabel : 'others',
		data: option.data,
	};
}
