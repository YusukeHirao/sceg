"use strict";

var fs = require("fs");
var mkdirp = require("mkdirp");
var path = require("path");
function output(html, filePath) {
    return new Promise(function (resolve, reject) {
        mkdirp(path.dirname(filePath), function (ioErr) {
            if (ioErr) {
                reject(ioErr);
                throw ioErr;
            }
            fs.writeFile(filePath, html, function (writeErr) {
                if (writeErr) {
                    reject(writeErr);
                    throw writeErr;
                }
                resolve();
            });
        });
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = output;