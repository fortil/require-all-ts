"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require('fs');
var DEFAULT_EXCLUDE_DIR = /^\./;
var DEFAULT_FILTER = /^([^\.].*)\.(j|t)s(on)?$/;
var DEFAULT_RECURSIVE = true;
function requireAll(options) {
    var dirname = typeof options === 'string' ? options : options.dirname;
    var excludeDirs = options.excludeDirs === undefined ? DEFAULT_EXCLUDE_DIR : options.excludeDirs;
    var filter = options.filter === undefined ? DEFAULT_FILTER : options.filter;
    var modules = {};
    var recursive = options.recursive === undefined ? DEFAULT_RECURSIVE : options.recursive;
    var resolve = options.resolve || identity;
    var map = options.map || identity;
    function excludeDirectory(dirname) {
        return !recursive ||
            (excludeDirs && dirname.match(excludeDirs));
    }
    function filterFile(filename) {
        if (typeof filter === 'function') {
            return filter(filename);
        }
        var match = filename.match(filter);
        if (!match)
            return;
        return match[1] || match[0];
    }
    var files = fs.readdirSync(dirname);
    files.forEach(function (file) {
        var filepath = dirname + '/' + file;
        if (fs.statSync(filepath).isDirectory()) {
            if (excludeDirectory(file))
                return;
            var subModules = requireAll({
                dirname: filepath,
                filter: filter,
                excludeDirs: excludeDirs,
                map: map,
                resolve: resolve
            });
            if (Object.keys(subModules).length === 0)
                return;
            modules[map(file, filepath)] = subModules;
        }
        else {
            var name_1 = filterFile(file);
            if (!name_1)
                return;
            modules[map(name_1, filepath)] = resolve(require(filepath));
        }
    });
    return modules;
}
;
function identity(val) {
    return val;
}
exports.default = requireAll;
//# sourceMappingURL=index.js.map