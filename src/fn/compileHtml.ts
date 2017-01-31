import * as parse from 'posthtml-parser';
import * as render from 'posthtml-render';

import { config } from '../sceg-core';
import { IScegElement } from '../IScegElement';

export default function compileHtml (sourceCode: string, index: number, filename: string): IScegElement {
	const ast: (string | Object)[] = parse(sourceCode);
	let title = filename;
	let category = config!.otherLabel;
	const comment: string[] = [];
	const newAst: (string | Object)[] = [];
	ast.forEach((node, i) => {
		if (typeof node === 'string') {
			const nodeVal = node.trim();
			if (/^<!--(?:.|\n|\r)+-->$/.test(nodeVal)) {
				const info = nodeVal
					.replace(/^<!--/, '')
					.replace(/-->$/, '')
					.split(/(?:\n|\r|\r\n)+/g);
				info.forEach((line) => {
					line = line.trim();
					if (!line) {
						return;
					}
					switch (line[0]) {
						case '#': title = line.substr(1).trim(); break;
						case '@': category = line.substr(1).trim(); break;
						default: comment.push(line.trim());
					}
				});
			} else if (!/^\n+$/.test(nodeVal)) {
				newAst.push(node);
			}
		} else {
			newAst.push(node);
		}
	});
	return {
		index,
		html: render(newAst),
		title,
		comment: comment.join('<br>'),
		category,
	};
}
