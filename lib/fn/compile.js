"use strict";

var fs = require("fs");
var path = require("path");
var compilePug_1 = require("./compilePug");
var compileHtml_1 = require("./compileHtml");
function compile(elementFilePath, index) {
    var extname = path.extname(elementFilePath);
    var filename = path.basename(elementFilePath, extname);
    var promise = new Promise(function (resolve, reject) {
        fs.readFile(elementFilePath, 'utf-8', function (index, filename, err, sourceCode) {
            if (err) {
                reject(err);
                throw err;
            }
            switch (extname.toLowerCase()) {
                case '.pug':
                case '.jade':
                    {
                        var el = compilePug_1.default(sourceCode, index, filename);
                        resolve(el);
                    }
                    break;
                default:
                    {
                        var _el = compileHtml_1.default(sourceCode, index, filename);
                        resolve(_el);
                    }
            }
        }.bind(fs, index, filename));
    });
    return promise;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = compile;