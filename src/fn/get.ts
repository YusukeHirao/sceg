import assignConfig from './assignConfig';
import globElements from './globElements';
import optimize from './optimize';
import readElements from './readElements';

import { IScegContentData, IScegOption } from '../sceg';

export default function load (option?: IScegOption): Promise<IScegContentData> {
	const config = assignConfig(option);
	return globElements(config)
		.then(readElements(config))
		.then(optimize());
}
