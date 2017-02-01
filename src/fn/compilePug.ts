import * as marked from 'marked';

import * as pug from 'pug';
import * as lex from 'pug-lexer';
import * as parse from 'pug-parser';
import * as walk from 'pug-walk';

import { IScegElement } from '../IScegElement';
import { config, IScegOption } from '../sceg';

export default function compilePug (sourceCode: string, index: number, filename: string, option?: IScegOption): IScegElement {
	const ast = parse(lex(sourceCode));
	let title = filename;
	let category = (option ? option.otherLabel : false) || (config ? config.otherLabel : 'other');
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
		comment: marked(comment.join('\n')),
		category,
	};
}
