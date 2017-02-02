import { IScegConfig, IScegContentData } from '../sceg';
export default function render(config: IScegConfig): (data: IScegContentData) => Promise<string>;
