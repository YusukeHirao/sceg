import * as fs from 'fs';
import * as mkdirp from 'mkdirp';
import * as path from 'path';

export default function output (html: string, filePath: string): Promise<void> {
	return new Promise<void>((resolve, reject) => {
		mkdirp(path.dirname(filePath), (ioErr) => {
			if (ioErr) {
				reject(ioErr);
				throw ioErr;
			}
			fs.writeFile(filePath, html, (writeErr) => {
				if (writeErr) {
					reject(writeErr);
					throw writeErr;
				}
				resolve();
			});
		});
	});
}
