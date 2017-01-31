"use strict";

var compile_1 = require("./fn/compile");
exports.compile = compile_1.default;
var sceg_1 = require("./sceg");
exports.optimize = sceg_1.optimize;
exports.render = sceg_1.render;