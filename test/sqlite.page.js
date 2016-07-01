var path = require('path');
var dbPath = path.resolve(__dirname, './data.db');

var SQLite = require('../lib/sqlite');
var db = new SQLite({dbPath: dbPath});
db.connect();

var assert = require('chai').assert;

describe('SQLite Page', function () {
    describe('single table', function () {
        it('should be a object contains the query object', function () {
            var sql = "select * from article order by id";
            var ret = db.page(sql, 5, 10);

            assert.equal(41, ret.minRow);
            assert.equal(45, ret.maxRow);
            assert.equal(5, ret.pageSize);
            assert.equal(5, ret.pageIndex);
            assert.equal(5, ret.pageTotal);
            assert.equal(45, ret.rowsTotal);
        });
    });
    
    describe('normal query', function () {
        it('should be a object contains the query object', function () {
            var sql = "select A.id as Aid, A.title as Atitle, M.id as Mid, M.username from article as A, member as M where A.user_id=M.id order by A.id, M.id";
            var ret = db.page(sql, 5, 10);

            assert.equal(41, ret.minRow);
            assert.equal(45, ret.maxRow);
            assert.equal(5, ret.pageSize);
            assert.equal(5, ret.pageIndex);
            assert.equal(5, ret.pageTotal);
            assert.equal(45, ret.rowsTotal);
        });
    });

    describe('query with star', function () {
        it('should be a object contains the query object', function () {
            var sql = "select * from article as A, member as M where A.user_id=M.id order by A.id, M.id";
            var ret = db.page(sql, 5, 10);

            assert.equal(41, ret.minRow);
            assert.equal(45, ret.maxRow);
            assert.equal(5, ret.pageSize);
            assert.equal(5, ret.pageIndex);
            assert.equal(5, ret.pageTotal);
            assert.equal(45, ret.rowsTotal);
        });
    });
});