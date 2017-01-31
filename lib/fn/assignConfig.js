"use strict";

var path = require("path");
function assignConfig(option) {
    return {
        indexDir: option && option.indexDir ? path.resolve(process.cwd(), option.indexDir) : path.resolve(__dirname, '../../default/layout/'),
        index: option && option.index ? option.index : 'index.hbs',
        elementDir: option && option.elementDir ? path.resolve(process.cwd(), option.elementDir) : path.resolve(__dirname, '../../default/el/'),
        elements: option && option.elements ? option.elements : '**/*',
        outDir: option && option.outDir ? option.outDir : null,
        otherLabel: option && option.otherLabel ? option.otherLabel : 'others'
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = assignConfig;