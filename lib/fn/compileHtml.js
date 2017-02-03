"use strict";

var marked = require("marked");
var parse = require("posthtml-parser");
var render = require("posthtml-render");
function compileHtml(sourceCode, index, filename, config) {
    var ast = parse(sourceCode);
    var title = filename;
    var category = config.otherLabel;
    var snippetPrefix = '';
    var comment = [];
    var newAst = [];
    ast.forEach(function (node, i) {
        if (typeof node === 'string') {
            var nodeVal = node.trim();
            if (/^<!--(?:.|\n|\r)+-->$/.test(nodeVal)) {
                var info = nodeVal.replace(/^<!--/, '').replace(/-->$/, '').split(/(?:\n|\r|\r\n)+/g);
                info.forEach(function (line) {
                    line = line.trim();
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
                });
            } else if (!/^\n+$/.test(nodeVal)) {
                newAst.push(node);
            }
        } else {
            newAst.push(node);
        }
    });
    return {
        index: index,
        html: render(newAst),
        title: title,
        comment: marked(comment.join('\n')),
        category: category,
        snippetPrefix: snippetPrefix
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = compileHtml;