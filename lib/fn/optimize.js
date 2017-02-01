"use strict";

var assignConfig_1 = require("./assignConfig");
var ID_PREFIX = 'sceg-cat-';
function optimize(config) {
    config = assignConfig_1.default(config);
    return function (elements) {
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
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = optimize;