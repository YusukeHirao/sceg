"use strict";

var glob = require("glob");
var assignConfig_1 = require("./assignConfig");
function globElements(option) {
    var config = assignConfig_1.default(option);
    var globPath = config.elementDir + "/" + config.elements;
    return new Promise(function (resolve, reject) {
        glob(globPath, function (err, elementFilePathes) {
            if (err) {
                reject(err);
                throw err;
            }
            resolve(elementFilePathes);
        });
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = globElements;