"use strict";

var glob = require("glob");
function globElements(config) {
    return new Promise(function (resolve, reject) {
        glob(config.path, function (err, elementFilePathes) {
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