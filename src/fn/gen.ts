import assignConfig from './assignConfig';
import globElements from './globElements';
import optimize from './optimize';
import readElements from './readElements';
import render from './render';

import { IScegOption } from '../sceg';

/**
 * Generate guide page from elements
 *
 * @param paths Paths of element files that glob pattern
 * @param option Optional configure
 * @return rendered HTML string
 */
export default function gen (path: string, option: IScegOption = {}): Promise<string> {
	const config = assignConfig(option, path);
	return globElements(config)
		.then(readElements(config))
		.then(optimize())
		.then(render(config));
}
