"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var assignConfig_1 = require("./assignConfig");
var globElements_1 = require("./globElements");
var optimize_1 = require("./optimize");
var readElements_1 = require("./readElements");
var render_1 = require("./render");
/**
 * Generate guide page from elements
 *
 * @param path Paths of element files that glob pattern
 * @param option Optional configure
 * @return rendered HTML string
 */
function gen(path) {
  var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var config = assignConfig_1.default(option, path);
  return globElements_1.default(config).then(readElements_1.default(config)).then(optimize_1.default()).then(render_1.default(config));
}
exports.default = gen;