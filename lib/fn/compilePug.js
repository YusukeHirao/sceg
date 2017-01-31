"use strict";

var pug = require("pug");
var lex = require("pug-lexer");
var parse = require("pug-parser");
var walk = require("pug-walk");
var sceg_core_1 = require("../sceg-core");
function compilePug(sourceCode, index, filename) {
    var ast = parse(lex(sourceCode));
    var title = filename;
    var category = sceg_core_1.config.otherLabel;
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
                default:
                    comment.push(line.trim());
            }
        }
    });
    return {
        index: index,
        html: pug.render(sourceCode, { pretty: true }),
        title: title,
        comment: comment.join('<br>'),
        category: category
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = compilePug;