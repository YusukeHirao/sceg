import * as marked from 'marked';

import * as pug from 'pug';
import * as lex from 'pug-lexer';
import * as parse from 'pug-parser';
import * as walk from 'pug-walk';

import { IScegConfig, IScegElement } from '../sceg';

export default function compilePug (sourceCode: string, index: number, filename: string, config: IScegConfig): IScegElement {
	const ast = parse(lex(sourceCode));
	let title = filename;
	let category = config.otherLabel;
	let snippetPrefix = '';
	const comment: string[] = [];
	walk(ast, (node: { type: string, buffer: boolean, val: string }) => {
		// if pug comment (not html comment)
		if (node.type === 'Comment' && !node.buffer) {
			const line = node.val.trim();
			switch (line[0]) {
				case '#': title = line.substr(1).trim(); break;
				case '@': category = line.substr(1).trim(); break;
				case ':': snippetPrefix = line.substr(1).trim(); break;
				default: comment.push(line.trim());
			}
		}
	});
	return {
		index,
		html: pug.render(
			sourceCode,
			Object.assign<pug.Options, pug.Options>(
				{
					pretty: true,
					doctype: 'html',
				},
				config.pugOption,
			),
		).trim(),
		title,
		comment: marked(comment.join('\n')),
		category,
		snippetPrefix,
	};
}
