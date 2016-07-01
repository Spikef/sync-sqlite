process.chdir(__dirname);

var fs = require('fs');
var ugly  = require('uglify-js');

var sqlite = fs.readFileSync('./lib/sqlite.js', 'utf8');
var helper = fs.readFileSync('./lib/helper.js', 'utf8');
var record = fs.readFileSync('./lib/record.js', 'utf8');

helper = helper.replace('module.exports = helper;', '');
record = record.replace('module.exports = RecordSet;', '');

sqlite = sqlite
            .replace("var helper = require('./helper');", helper)
            .replace("var RecordSet = require('./record');", record);

var result = ugly.minify(sqlite, {fromString: true});

fs.writeFileSync('./index.js', result.code);