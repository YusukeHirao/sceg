"use strict";

var fs = require("fs");
var glob = require("glob");
var path = require("path");
var handlebars = require("handlebars");
var mkdirp = require("mkdirp");
var assignConfig_1 = require("./fn/assignConfig");
var compile_1 = require("./fn/compile");
var ID_PREFIX = 'sceg-cat-';
function sceg(option) {
    exports.config = assignConfig_1.default(option);
    var globPath = exports.config.elementDir + "/" + exports.config.elements;
    var renderPromise = loadElements(globPath).then(compileElements).then(optimizeContent).then(render);
    renderPromise.then(function (html) {
        var file = exports.config.outDir || '';
        if (file) {
            mkdirp(path.dirname(file), function (err) {
                fs.writeFile(file, html, function (err) {
                    if (err) {
                        throw err;
                    }
                });
            });
        }
    });
}
exports.sceg = sceg;
function loadElements(globPath) {
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
function compileElements(elementFilePathes) {
    return Promise.all(elementFilePathes.map(compile_1.default));
}
function optimizeContent(elements) {
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
function render(data) {
    return new Promise(function (resolve, reject) {
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