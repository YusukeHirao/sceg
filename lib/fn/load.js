"use strict";

var assignConfig_1 = require("./assignConfig");
var globElements_1 = require("./globElements");
var readElements_1 = require("./readElements");
var optimize_1 = require("./optimize");
var render_1 = require("./render");
function load(option) {
    var config = assignConfig_1.default(option);
    var globPath = config.elementDir + "/" + config.elements;
    return globElements_1.default(globPath, config).then(readElements_1.default(config)).then(optimize_1.default(config)).then(render_1.default(config));
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = load;