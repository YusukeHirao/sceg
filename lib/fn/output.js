"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var mkdirp = require("mkdirp");
var path = require("path");
/**
 * Output file by source code string
 *
 * @param sourceCode Source code string
 * @param filePath Destination path and file name
 */
function output(sourceCode, filePath) {
    return new Promise(function (resolve, reject) {
        mkdirp(path.dirname(filePath), function (ioErr) {
            if (ioErr) {
                reject(ioErr);
                throw ioErr;
            }
            fs.writeFile(filePath, sourceCode, function (writeErr) {
                if (writeErr) {
                    reject(writeErr);
                    throw writeErr;
                }
                resolve();
            });
        });
    });
}
exports.default = output;