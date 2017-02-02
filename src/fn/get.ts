import assignConfig from './assignConfig';
import globElements from './globElements';
import optimize from './optimize';
import readElements from './readElements';

import { IScegContentData, IScegOption } from '../sceg';

export default function get (path: string, option: IScegOption = {}): Promise<IScegContentData> {
	const config = assignConfig(option, path);
	return globElements(config)
		.then(readElements(config))
		.then(optimize());
}
