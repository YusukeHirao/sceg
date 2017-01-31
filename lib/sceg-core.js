"use strict";

var fsp = require("fs-promise");
var glob = require("glob");
var path = require("path");
var pug = require("pug");
var lex = require("pug-lexer");
var parse = require("pug-parser");
var walk = require("pug-walk");
function sceg(option) {
    var config = assignConfig(option);
    var globPath = path.resolve(process.cwd(), config.elementDir, config.elements);
    glob(globPath, function (err, elementFilePathes) {
        if (err) {
            throw err;
        }
        registElements(elementFilePathes);
    });
}
exports.sceg = sceg;
function registElements(elementFilePathes) {
    Promise.all(elementFilePathes.map(compile)).then(function (el) {
        console.log(el);
    });
}
function compile(elementFilePath) {
    var extname = path.extname(elementFilePath);
    var promise = new Promise(function (resolve, reject) {
        fsp.readFile(elementFilePath, 'utf-8').then(function (sourceCode) {
            switch (extname) {
                case '.pug':
                    {
                        var el = compilePug(sourceCode);
                        resolve(el);
                    }
                    break;
                default:
                    {
                        resolve({
                            html: sourceCode,
                            title: 'none',
                            comment: '',
                            category: null
                        });
                    }
            }
        });
    });
    return promise;
}
function compilePug(sourceCode) {
    var ast = parse(lex(sourceCode));
    var title = '';
    var comment = '';
    var category = '';
    walk(ast, function (node) {
        if (node.type === 'Comment' && !node.buffer) {
            var line = node.val;
            console.log(line);
        }
    });
    return {
        html: pug.render(sourceCode, { pretty: true }),
        title: title,
        comment: comment,
        category: category
    };
}
function assignConfig(option) {
    return Object.assign({
        indexDir: './',
        index: 'index.html',
        elementDir: './el/',
        elements: '**/*'
    }, option || {});
}