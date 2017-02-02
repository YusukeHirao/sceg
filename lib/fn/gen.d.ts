import { IScegOption } from '../sceg';
/**
 * Generate guide page from elements
 *
 * @param paths Paths of element files that glob pattern
 * @param option Optional configure
 * @return rendered HTML string
 */
export default function gen(path: string, option?: IScegOption): Promise<string>;
