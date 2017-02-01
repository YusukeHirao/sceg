"use strict";

var fs = require("fs");
var glob = require("glob");
var handlebars = require("handlebars");
var mkdirp = require("mkdirp");
var path = require("path");
var assignConfig_1 = require("./fn/assignConfig");
var compile_1 = require("./fn/compile");
var ID_PREFIX = 'sceg-cat-';
function sceg(option) {
    exports.config = assignConfig_1.default(option);
    var globPath = exports.config.elementDir + "/" + exports.config.elements;
    return globElements(globPath).then(readElements).then(optimize).then(render);
}
exports.sceg = sceg;
function output(html, filePath) {
    return new Promise(function (resolve, reject) {
        mkdirp(path.dirname(filePath), function (ioErr) {
            if (ioErr) {
                reject(ioErr);
                throw ioErr;
            }
            fs.writeFile(filePath, html, function (writeErr) {
                if (writeErr) {
                    reject(writeErr);
                    throw writeErr;
                }
                resolve();
            });
        });
    });
}
exports.output = output;
function globElements(globPath) {
    return new Promise(function (resolve, reject) {
        glob(globPath, function (err, elementFilePathes) {
            if (err) {
                reject(err);
                throw err;
            }
            resolve(elementFilePathes);
        });
    });
}
function readElements(elementFilePathes) {
    return Promise.all(elementFilePathes.map(function (elementFilePath, index) {
        var promise = new Promise(function (resolve, reject) {
            fs.readFile(elementFilePath, 'utf-8', function (_index, _elementFilePath, err, sourceCode) {
                if (err) {
                    reject(err);
                    throw err;
                }
                resolve(compile_1.default(sourceCode, _index, _elementFilePath));
            }.bind(fs, index, elementFilePath));
        });
        return promise;
    }));
}
function optimize(elements) {
    var categories = [];
    var contents = {};
    elements.sort(function (a, b) {
        return a.index - b.index;
    }).forEach(function (el) {
        var category = {
            name: el.category,
            id: ID_PREFIX + encodeURIComponent(el.category)
        };
        if (el.category && !(el.category in contents)) {
            categories.push(category);
            contents[el.category] = {
                category: category,
                el: []
            };
        }
        contents[el.category].el.push(el);
    });
    return { categories: categories, contents: contents };
}
exports.optimize = optimize;
function render(data) {
    return new Promise(function (resolve, reject) {
        exports.config = assignConfig_1.default(exports.config);
        var index = exports.config.indexDir + "/" + exports.config.index;
        fs.readFile(index, 'utf-8', function (err, sourceCode) {
            if (err) {
                reject(err);
                throw err;
            }
            var tmpl = handlebars.compile(sourceCode);
            var result = tmpl(data);
            resolve(result);
        });
    });
}
exports.render = render;