import assignConfig from './assignConfig';
import globElements from './globElements';
import optimize from './optimize';
import readElements from './readElements';
import render from './render';

import { IScegOption } from '../sceg';

export default function load (option?: IScegOption): Promise<string> {
	const config = assignConfig(option);
	return globElements(config)
		.then(readElements(config))
		.then(optimize())
		.then(render(config));
}
