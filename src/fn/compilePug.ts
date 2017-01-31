import * as pug from 'pug';
import * as lex from 'pug-lexer';
import * as parse from 'pug-parser';
import * as walk from 'pug-walk';

import { config } from '../sceg-core';
import { IScegElement } from '../IScegElement';

export default function compilePug (sourceCode: string, index: number, filename: string): IScegElement {
	const ast = parse(lex(sourceCode));
	let title = filename;
	let category = config!.otherLabel;
	const comment: string[] = [];
	walk(ast, (node: { type: string, buffer: boolean, val: string }) => {
		// if pug comment (not html comment)
		if (node.type === 'Comment' && !node.buffer) {
			const line = node.val.trim();
			switch (line[0]) {
				case '#': title = line.substr(1).trim(); break;
				case '@': category = line.substr(1).trim(); break;
				default: comment.push(line.trim());
			}
		}
	});
	return {
		index,
		html: pug.render(sourceCode, { pretty: true }),
		title,
		comment: comment.join('<br>'),
		category,
	};
}
