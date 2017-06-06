"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var compileHtml_1 = require("./compileHtml");
var compilePug_1 = require("./compilePug");
function compile(sourceCode, index, filePath, config) {
    var extname = path.extname(filePath);
    var filename = path.basename(filePath, extname);
    switch (extname.toLowerCase()) {
        case '.pug':
        case '.jade':
            return compilePug_1.default(sourceCode, index, filename, config);
        default:
            return compileHtml_1.default(sourceCode, index, filename, config);
    }
}
exports.default = compile;