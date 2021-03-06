"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
function assignConfig(option, globPattern) {
    return {
        path: globPattern,
        layout: option && option.layout ? path.resolve(process.cwd(), option.layout) : path.resolve(__dirname, '../../default/layout/index.hbs'),
        otherLabel: option && option.otherLabel ? option.otherLabel : 'others',
        pugOption: option && option.pugOption ? option.pugOption : {},
        data: option.data
    };
}
exports.default = assignConfig;