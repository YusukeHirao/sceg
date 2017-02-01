"use strict";

var fs = require("fs");
var path = require("path");
var pug = require("pug");
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
                var exname = path.extname(config.layout);
                switch (exname.toLowerCase()) {
                    case '.pug':
                    case '.jade':
                        {
                            resolve(renderPug(sourceCode, data));
                        }
                        break;
                    default:
                        {
                            resolve(renderHbs(sourceCode, data));
                        }
                }
            });
        });
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = render;
function renderPug(sourceCode, data) {
    return pug.compile(sourceCode, { pretty: true })(data);
}
function renderHbs(sourceCode, data) {
    return handlebars.compile(sourceCode)(data);
}