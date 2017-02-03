import assignConfig from './assignConfig';
import globElements from './globElements';
import optimize from './optimize';
import readElements from './readElements';

import { IScegContentData, IScegOption } from '../sceg';

/**
 * Create guide data from elements
 *
 * @param path Paths of element files that glob pattern
 * @param option Optional configure
 * @return guide data object
 */
export default function get (path: string, option: IScegOption = {}): Promise<IScegContentData> {
	const config = assignConfig(option, path);
	return globElements(config)
		.then(readElements(config))
		.then(optimize());
}
