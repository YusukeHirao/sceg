import { IScegConfig, IScegElement } from '../sceg';
export default function readElements(config: IScegConfig): (elementFilePathes: string[]) => Promise<IScegElement[]>;
