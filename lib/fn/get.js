"use strict";

var assignConfig_1 = require("./assignConfig");
var globElements_1 = require("./globElements");
var optimize_1 = require("./optimize");
var readElements_1 = require("./readElements");
function load(option) {
    var config = assignConfig_1.default(option);
    return globElements_1.default(config).then(readElements_1.default(config)).then(optimize_1.default());
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = load;