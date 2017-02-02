import * as fs from 'fs';
import * as mkdirp from 'mkdirp';
import * as path from 'path';

/**
 * Output file by source code string
 *
 * @param sourceCode Source code string
 * @param filePath Destination path and file name
 */
export default function output (sourceCode: string, filePath: string): Promise<void> {
	return new Promise<void>((resolve, reject) => {
		mkdirp(path.dirname(filePath), (ioErr) => {
			if (ioErr) {
				reject(ioErr);
				throw ioErr;
			}
			fs.writeFile(filePath, sourceCode, (writeErr) => {
				if (writeErr) {
					reject(writeErr);
					throw writeErr;
				}
				resolve();
			});
		});
	});
}
