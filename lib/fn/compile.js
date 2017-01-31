"use strict";

var path = require("path");
var compileHtml_1 = require("./compileHtml");
var compilePug_1 = require("./compilePug");
function compile(sourceCode, index, filePath) {
    var extname = path.extname(filePath);
    var filename = path.basename(filePath, extname);
    switch (extname.toLowerCase()) {
        case '.pug':
        case '.jade':
            {
                return compilePug_1.default(sourceCode, index, filename);
            }
        default:
            {
                return compileHtml_1.default(sourceCode, index, filename);
            }
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = compile;