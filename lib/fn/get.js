"use strict";

var assignConfig_1 = require("./assignConfig");
var globElements_1 = require("./globElements");
var optimize_1 = require("./optimize");
var readElements_1 = require("./readElements");
function get(path) {
    var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var config = assignConfig_1.default(option, path);
    return globElements_1.default(config).then(readElements_1.default(config)).then(optimize_1.default());
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = get;