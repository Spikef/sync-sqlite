/**
 * Usage: 封装RecordSet对象
 * Author: Spikef < Spikef@Foxmail.com >
 * Copyright: Envirs Team < http://envirs.com >
 */

/**
 * 创建一个类似记录集的对象
 * @param {Object} data {fields: [], values: []}  字段名称列表, 值列表
 * @param sql
 * @constructor
 */
function RecordSet(data, sql) {
    Object.defineProperty(this, 'data', {
        get: function() {
            return data;
        }
    });

    Object.defineProperty(this, 'source', {
        enumerable: true,
        get: function() {
            return sql;
        }
    });

    Object.defineProperty(this, 'count', {
        enumerable: true,
        get: function() {
            return data.values.length;
        }
    });
}

RecordSet.prototype.forEach = function(callback) {
    if ( typeof callback !== 'function' ) return;

    for (var row=0, length=this.data.values.length; row<length; row++) {
        var json = {};
        for ( var col=0, count=this.data.fields.length; col<count; col++ ) {
            json[this.data.fields[col]] = this.data.values[row][col];
        }

        callback.call(callback, json, row);
    }
};

RecordSet.prototype.each = function(callback) {
    if ( typeof callback !== 'function' ) return;

    for (var row=0, length=this.data.values.length; row<length; row++) {
        for ( var col=0, count=this.data.fields.length; col<count; col++ ) {
            callback.call(callback, this.data.values[row][col], this.data.fields[col], row, col);
        }
    }
};

RecordSet.prototype.toJSON = function(index) {
    if (this.count === 0) return null;
    
    var arr = [], that = this;

    if ( typeof index === 'number' ) {
        var json = {};
        this.data.values[index].forEach(function(value, index) {
            if (typeof value.getTime === 'function') value = value.getTime();
            json[that.data.fields[index]] = value;
        });

        return json;
    } else{
        this.data.values.forEach(function(values) {
            var json = {};
            values.forEach(function(value, i) {
                if (typeof value.getTime === 'function') value = value.getTime();
                json[that.data.fields[i]] = value;
            });

            arr.push(json);
        });
        return arr;
    }
};

RecordSet.prototype.toArray = function(index) {
    if ( typeof index === 'number' ) {
        return this.data.values[index];
    } else {
        return this.data.values;
    }
};

module.exports = RecordSet;