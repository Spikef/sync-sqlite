var path = require('path');
var dbPath = path.resolve(__dirname, './data.db');

var RecordSet = require('../lib/record');
var SQLite = require('../lib/sqlite');
var db = new SQLite({dbPath: dbPath});
db.connect();

var assert = require('chai').assert;

describe('SQLite Select', function () {
    describe('empty result', function () {
        it('should be null when no result', function () {
            var params = {
                action: "select",
                tables: "article",
                fields: ["id", "title", "posttime", "allow"],
                where: "user_id>5",
                orders: "id desc",
                limit: 5
            };

            var ret = db.select(params).toJSON();
            
            assert.equal(null, ret);
        });
    });

    describe('multiple sql', function () {
        it('should be RecordSet list', function () {
            var sql = [
                'select * from article where user_id=1',
                'select * from article where user_id=2'
            ];
            var ret = db.runsql(sql.join(';'));

            assert.equal(2, ret.length);
            assert.equal(true, ret[0] instanceof RecordSet);
            assert.equal(true, ret[1] instanceof RecordSet);
        });
    });
    
    describe('single table', function () {
        it('should be a array contains the query object', function () {
            var params = {
                action: "select",
                tables: "article",
                fields: ["id", "title", "posttime", "allow"],
                where: "user_id<3",
                orders: "id desc",
                limit: 5
            };

            var ret;
            var rs = db.select(params);
                
            ret = rs.toJSON();
            assert.equal(5, ret.length);
            assert.equal('number', typeof ret[0].id);
            assert.equal('string', typeof ret[0].title);
            assert.equal('number', typeof ret[0].posttime);
            assert.equal('boolean', typeof ret[0].allow);

            ret = rs.toArray();
            assert.equal(5, ret.length);
            assert.equal('number', typeof ret[0][0]);
            assert.equal('string', typeof ret[0][1]);
            assert.equal('object', typeof ret[0][2]);
            assert.equal('boolean', typeof ret[0][3]);
        });
    });

    describe('multiple table', function () {
        it('should be a array contains the query object', function () {
            var params = {
                action: "select",
                tables: ["article as A", "member"],
                fields: "A.id as A_id, A.title as A_title, member.*",
                where: "A.user_id=member.id",
                limit: 1
            };

            var ret;
            var rs = db.select(params);
            
            ret = rs.toJSON(0);
            assert.equal(1, ret['A_id']);
            assert.equal('将进酒', ret['A_title']);
            assert.equal(2, ret['id']);
            assert.equal('李白', ret['username']);
            assert.equal(true, !!ret['description']);

            ret = rs.toArray(0);
            assert.equal(1, ret[0]);
            assert.equal('将进酒', ret[1]);
            assert.equal(2, ret[2]);
            assert.equal('李白', ret[3]);
            assert.equal(true, !!ret[4]);
        });
    });
});