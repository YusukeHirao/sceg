import { IScegCategory, IScegContents, IScegContentData, IScegElement } from '../sceg';

const ID_PREFIX = 'sceg-cat-';

export default function optimize () {
	return (elements: IScegElement[]): IScegContentData => {
		const categories: IScegCategory[] = [];
		const contents: IScegContents = {};
		elements
			.sort((a, b) => a.index - b.index)
			.forEach((el) => {
				const category: IScegCategory = {
					name: el.category,
					id: ID_PREFIX + encodeURIComponent(el.category),
				};
				if (el.category && !(el.category in contents)) {
					categories.push(category);
					contents[el.category] = {
						category,
						el: [],
					};
				}
				contents[el.category].el.push(el);
			});
		return { categories, contents };
	};
}
