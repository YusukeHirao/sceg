"use strict";

var fs = require("fs");
var compile_1 = require("./compile");
var assignConfig_1 = require("./assignConfig");
function readElements(config) {
    config = assignConfig_1.default(config);
    return function (elementFilePathes) {
        return Promise.all(elementFilePathes.map(function (elementFilePath, index) {
            var promise = new Promise(function (resolve, reject) {
                fs.readFile(elementFilePath, 'utf-8', function (_index, _elementFilePath, err, sourceCode) {
                    if (err) {
                        reject(err);
                        throw err;
                    }
                    resolve(compile_1.default(sourceCode, _index, _elementFilePath, config));
                }.bind(fs, index, elementFilePath));
            });
            return promise;
        }));
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = readElements;