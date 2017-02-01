"use strict";

var fs = require("fs");
var handlebars = require("handlebars");
var assignConfig_1 = require("./assignConfig");
function render(config) {
    config = assignConfig_1.default(config);
    return function (data) {
        return new Promise(function (resolve, reject) {
            fs.readFile(config.layout, 'utf-8', function (err, sourceCode) {
                if (err) {
                    reject(err);
                    throw err;
                }
                var tmpl = handlebars.compile(sourceCode);
                var result = tmpl(data);
                resolve(result);
            });
        });
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = render;