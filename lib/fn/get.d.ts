import { IScegContentData, IScegOption } from '../sceg';
/**
 * Create guide data from elements
 *
 * @param paths Paths of element files that glob pattern
 * @param option Optional configure
 * @return guide data object
 */
export default function get(path: string, option?: IScegOption): Promise<IScegContentData>;
