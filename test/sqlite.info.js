var fs = require('fs');
var path = require('path');

var dbPath = path.resolve(__dirname, './test.db');
if (fs.existsSync(dbPath)) fs.unlinkSync(dbPath);

var SQLite = require('../lib/sqlite');
var db = new SQLite({dbPath: dbPath});
var fields = [
    "id integer primary key autoincrement",
    "title varchar(255) null unique",
    "content text not null",
    "username varchar(10) default('Spikef')",
    "posttime datetime not null",
    "stars smallint not null default(0)",
    "allow boolean default 0"
];
db.connect();
db.createTable("article", fields);

var assert = require('chai').assert;

describe('SQLite information', function () {
    describe('version', function () {
        it('should be 3.x', function () {
            assert.equal(3, db.getVersion()[0]);
        });
    });
});