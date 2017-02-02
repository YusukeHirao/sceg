"use strict";

var fs = require("fs");
var handlebars = require("handlebars");
var path = require("path");
var pug = require("pug");
function render(config) {
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
                            resolve(renderPug(sourceCode, data, config.layout));
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
function renderPug(sourceCode, data, filename) {
    return pug.compile(sourceCode, { pretty: true, filename: filename })(data);
}
function renderHbs(sourceCode, data) {
    return handlebars.compile(sourceCode)(data);
}