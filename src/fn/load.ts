import assignConfig from './assignConfig';
import globElements from './globElements';
import readElements from './readElements';
import optimize from './optimize';
import render from './render';

import { IScegOption } from '../sceg';

export default function load (option?: IScegOption): Promise<string> {
	const config = assignConfig(option);
	const globPath = `${config.elementDir}/${config.elements}`;
	return globElements(globPath, config)
		.then(readElements(config))
		.then(optimize(config))
		.then(render(config));
}