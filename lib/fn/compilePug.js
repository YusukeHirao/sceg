"use strict";

var marked = require("marked");
var pug = require("pug");
var lex = require("pug-lexer");
var parse = require("pug-parser");
var walk = require("pug-walk");
function compilePug(sourceCode, index, filename, config) {
    var ast = parse(lex(sourceCode));
    var title = filename;
    var category = config.otherLabel;
    var snippetPrefix = '';
    var comment = [];
    walk(ast, function (node) {
        // if pug comment (not html comment)
        if (node.type === 'Comment' && !node.buffer) {
            var line = node.val.trim();
            switch (line[0]) {
                case '#':
                    title = line.substr(1).trim();
                    break;
                case '@':
                    category = line.substr(1).trim();
                    break;
                case ':':
                    snippetPrefix = line.substr(1).trim();
                    break;
                default:
                    comment.push(line.trim());
            }
        }
    });
    return {
        index: index,
        html: pug.render(sourceCode, Object.assign({
            pretty: true,
            doctype: 'html'
        }, config.pugOption)).trim(),
        title: title,
        comment: marked(comment.join('\n')),
        category: category,
        snippetPrefix: snippetPrefix
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = compilePug;