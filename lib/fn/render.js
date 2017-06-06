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
                            resolve(renderPug(sourceCode, data, config, config.data));
                        break;
                        }
                    default:
                        {
                            resolve(renderHbs(sourceCode, data, config.data));
                        }
                }
            });
        });
    };
}
exports.default = render;
function renderPug(sourceCode, data, config) {
    var customData = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

    return pug.compile(sourceCode, Object.assign({
        filename: config.layout,
        pretty: true,
        doctype: 'html'
    }, config.pugOption))(Object.assign(customData, data));
}
function renderHbs(sourceCode, data) {
    var customData = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    return handlebars.compile(sourceCode)(Object.assign(customData, data));
}