"use strict";

var parse = require("posthtml-parser");
var render = require("posthtml-render");
var sceg_1 = require("../sceg");
function compileHtml(sourceCode, index, filename, option) {
    var ast = parse(sourceCode);
    var title = filename;
    var category = (option ? option.otherLabel : false) || (sceg_1.config ? sceg_1.config.otherLabel : 'other');
    var comment = [];
    var newAst = [];
    ast.forEach(function (node, i) {
        if (typeof node === 'string') {
            var nodeVal = node.trim();
            if (/^<!--(?:.|\n|\r)+-->$/.test(nodeVal)) {
                var info = nodeVal.replace(/^<!--/, '').replace(/-->$/, '').split(/(?:\n|\r|\r\n)+/g);
                info.forEach(function (line) {
                    line = line.trim();
                    if (!line) {
                        return;
                    }
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
        comment: comment.join('<br>'),
        category: category
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = compileHtml;