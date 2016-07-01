var RecordSet = require('../lib/record');

var sql = "select * from myTable";
var data = {
    fields: ['id', 'title'],
    values: [
        [1, '君不见黄河之水天上，奔流到海不复回。'],
        [2, '君不见高堂明镜悲白发，朝如青丝暮成雪。'],
        [3, '人生得意须尽欢，莫使金樽空对月。'],
        [4, '天生我材必有用，千金散尽还复来。']
    ]
};

var rs = new RecordSet(data, sql);

var assert = require('chai').assert;

describe('RecordSet', function () {
    describe('source', function () {
        it('should be str when get source', function () {
            assert.equal(sql, rs.source);
        });
    });

    describe('count', function () {
        it('should be values.length when get count', function () {
            assert.equal(data.values.length, rs.count);
        });
    });
    
    describe('toArray', function () {
        it('should be values[index] when index !== undefined', function () {
            var array = rs.toArray(0);
            assert.equal(2, array.length);
            assert.equal(1, array[0]);
            assert.equal('君不见黄河之水天上，奔流到海不复回。', array[1]);
        });

        it('should be values when index === undefined', function () {
            var array = rs.toArray();
            assert.equal(4, array.length);
            assert.equal(1, array[0][0]);
            assert.equal('君不见黄河之水天上，奔流到海不复回。', array[0][1]);
        });
    });

    describe('toJSON', function () {
        it('should be values[index] when index !== undefined', function () {
            var json = rs.toJSON(0);
            assert.equal(1, json.id);
            assert.equal('君不见黄河之水天上，奔流到海不复回。', json.title);
        });

        it('should be values when index === undefined', function () {
            var array = rs.toJSON();
            assert.equal(4, array.length);
            assert.equal(1, array[0].id);
            assert.equal('君不见黄河之水天上，奔流到海不复回。', array[0].title);
        });
    });

    describe('forEach', function () {
        it('should be json, row each line', function () {
            var index = 0;
            rs.forEach(function(json, row) {
                assert.equal(json.id - 1, row);
                index++;
            });

            assert.equal(4, index);
        });
    });

    describe('each', function () {
        it('should be value, key, row, col each item', function () {
            rs.each(function(value, key, row, col) {
                if (col === 0) assert.equal('id', key);
                if (col === 1) assert.equal('title', key);
            });
        });
    });
});