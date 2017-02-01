"use strict";

var path = require("path");
function assignConfig(option) {
    return {
        layout: option && option.layout ? path.resolve(process.cwd(), option.layout) : path.resolve(__dirname, '../../default/layout/index.hbs'),
        elementDir: option && option.elementDir ? path.resolve(process.cwd(), option.elementDir) : path.resolve(__dirname, '../../default/el/'),
        elements: option && option.elements ? option.elements : '**/*',
        otherLabel: option && option.otherLabel ? option.otherLabel : 'others'
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = assignConfig;