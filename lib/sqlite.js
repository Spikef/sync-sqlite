/**
 * Usage: SQLite数据库操作模块
 * Author: Spikef < Spikef@Foxmail.com >
 * Copyright: Envirs Team < http://envirs.com >
 */

var fs = require('fs');
var path = require('path');
var driver = require('sql.js');
var helper = require('./helper');
var RecordSet = require('./record');

/**
 * 创建新对象
 * @param options: 数据库连接参数
 * @type {module.exports}
 */
var SQLite = module.exports = function(options) {
    this._options = options || {};
    this.autoSave = !!this._options.autoSave;

    if (this._options.dbPath) {
        this._options.dbPath = path.resolve(this._options.dbPath);
    }
};

/**
 * 连接并打开数据库
 * @returns {exports|*}
 */
SQLite.prototype.connect = function() {
    try{
        if (!this._state) {
            if (this._options.dbPath && fs.existsSync(this._options.dbPath)) {
                var buffer = fs.readFileSync(this._options.dbPath);
                this.engine = new driver.Database(buffer);

                getSchemas(this.engine, this._options.dbPath);
            } else {
                this.engine = new driver.Database();
            }

            this._state = 1;
        }

        return this;
    }catch (e){
        throw new Error('Failed to connect database:' + e.message);
    }
};

/**
 * 设置要操作的表格，返回this。便于多次操作的链式写法。
 * @param tables: 表名，如果是多个表则使用数组
 * @returns {SQLite}
 */
SQLite.prototype.table = function(tables) {
    if ( !tables ) {
        throw new Error('You should specify the table.');
    }

    if (typeof tables === 'string') tables = [tables];

    this.tables = tables;
    return this;
};

/**
 * 查询记录，返回this。后面可跟toJSON()以JSON返回，或者rs返回原始记录集对象。
 * @param tables: 表名，如果是多个表则使用数组
 * @param fields: 字段，如果是多个字段则使用数组
 * @param where: 可选，查询条件
 * @param orders: 可选，排序字段，如果是多个字段则使用数组
 * @param limit: 可选，查询记录条数
 * @returns {RecordSet|[RecordSet]}
 */
SQLite.prototype.select = function(tables, fields, where, orders, limit) {
    var sql = this.produceSQL("select", tables, fields, where, orders, limit);
    return this._exec(sql, 1);
};

/**
 * 查询记录，返回this，用于链式写法操作相同表格。后面可跟toJSON()以JSON返回，或者rs返回原始记录集对象。
 * @param fields: 字段，如果是多个字段则使用数组
 * @param where: 可选，查询条件
 * @param orders: 可选，排序字段，如果是多个字段则使用数组
 * @param limit: 可选，查询记录条数
 * @returns {RecordSet|[RecordSet]}
 */
SQLite.prototype.sel = function(fields, where, orders, limit) {
    return this.select(this.tables, fields, where, orders, limit);
};

/**
 * 插入记录，返回this。后面可跟ar返回受影响的行数。
 * @param tables: 表名，如果是多个表则使用数组
 * @param fields: 字段，如果是多个字段则使用数组
 * @returns {{id, ar}}
 */
SQLite.prototype.insert = function(tables, fields) {
    var sql = this.produceSQL("insert", tables, fields);
    return this._exec(sql, 0);
};

/**
 * 插入记录，返回this，用于链式写法操作相同表格。后面可跟ar返回受影响的行数。
 * @param fields: 字段，如果是多个字段则使用数组
 * @returns {{id, ar}}
 */
SQLite.prototype.ins = function(fields) {
    return this.insert(this.tables, fields);
};

/**
 * 更新记录，返回this。后面可跟ar返回受影响的行数。
 * @param tables: 表名，如果是多个表则使用数组
 * @param fields: 字段，如果是多个字段则使用数组
 * @param where: 可选，查询条件
 * @returns {{ar}}
 */
SQLite.prototype.update = function(tables, fields, where) {
    var sql = this.produceSQL("update", tables, fields, where);
    return this._exec(sql, 2);
};

/**
 * 更新记录，返回this，用于链式写法操作相同表格。后面可跟ar返回受影响的行数。
 * @param fields: 字段，如果是多个字段则使用数组
 * @param where: 可选，查询条件
 * @returns {{ar}}
 */
SQLite.prototype.upd = function(fields, where) {
    return this.update(this.tables, fields, where);
};

/**
 * 删除记录，返回this。后面可跟ar返回受影响的行数。
 * @param tables: 表名，如果是多个表则使用数组
 * @param fields: 字段，如果是多个字段则使用数组
 * @param where: 可选，查询条件
 * @param orders: 可选，排序字段，如果是多个字段则使用数组
 * @param top: 可选，查询记录条数
 * @returns {{ar}}
 */
SQLite.prototype.remove = function(tables, fields, where, orders, top) {
    var sql = this.produceSQL("delete", tables, fields, where, orders, top);
    return this._exec(sql, 2);
};

/**
 * 删除记录，返回this，用于链式写法操作相同表格。后面可跟ar返回受影响的行数。
 * @param fields: 字段，如果是多个字段则使用数组
 * @param where: 可选，查询条件
 * @param orders: 可选，排序字段，如果是多个字段则使用数组
 * @param top: 可选，查询记录条数
 * @returns {{ar}}
 */
SQLite.prototype.rem = function(fields, where, orders, top) {
    return this.remove(this.tables, fields, where, orders, top);
};

/**
 * 执行SQL语句，返回记录集(this.rs)或受影响的行数(this.ar)。
 * @param sql: 要执行的sql语句，sql语句中的字符串全部需要使用'包围。
 * @returns {{id, ar}|RecordSet|[RecordSet]}
 */
SQLite.prototype.runsql = SQLite.prototype.runSQL = function(sql) {
    // 构造toString();
    this.toString = function() { return sql };
    
    // 判断是否是查询语句
    if ( /^(insert|select into)\s/i.test(sql) ) {
        return this._exec(sql, 0);
    } else if ( /^(select|call|exec)\s/i.test(sql) ) {
        return this._exec(sql, 1);
    } else {
        return this._exec(sql, 2);
    }
};

/**
 * 执行一条sq语句, 并返回执行结果(查询)
 * @param sql: 要执行的sql语句
 * @returns {Array}
 */
SQLite.prototype.execute = function(sql) {
    // 如果是查询语句
    if ( /^(select|call|exec)\s/i.test(sql) ) {
        var ret = this.engine.exec(sql)[0];
        var len = ret.values.length;
        
        if (len === 0) {
            return [];
        } else if (len === 1) {
            return ret.values[0];
        } else {
            return ret.values;
        }
    } else {
        this.engine.run(sql);
        this.autoSave && this.save();
    }
};

/**
 * 执行sql语句原型方法
 * @param sql: 要执行的sql语句
 * @param type: 执行方式(insert: 0, select: 1, update/remove: 2)
 * @returns {{id, ar}|RecordSet|[RecordSet]}
 * @private
 */
SQLite.prototype._exec = function(sql, type) {
    try{
        var extra, ret, rs;
        if (type === 0) {
            this.engine.run(sql);
            extra = 'select last_insert_rowid() as id, changes() as ar;';
            ret = this.engine.exec(extra);
            this.autoSave && this.save();
            return {
                id: ret[0].values[0][0],
                ar: ret[0].values[0][1]
            }
        } else if (type === 1) {
            ret = this.engine.exec(sql);
            rs = resultToRecord(ret, sql, this._options.dbPath);
            return rs;
        } else if (type === 2) {
            this.engine.run(sql);
            extra = 'select changes() as ar;';
            ret = this.engine.exec(extra);
            this.autoSave && this.save();
            return {
                ar: ret[0].values[0][0]
            }
        }
    } catch (e) {
        throw new Error('Error while exec sql: [' + sql + '] ' + e.message);
    }
};

/**
 * 分页查询，可以是单表、多表连接或者包含子查询的复杂SQL查询语句。
 * 为了兼容所有数据库，查询语句必须满足以下条件：
 *     1、联表查询时，如果不同表中有同名字段，必须指定别名
 *     2、所有参与排序的字段必须在Select出的字段中包含
 *     3、Order By语句中不能出现括号
 *     4、Order By字段的值必需唯一，否则top查询的数目不准确
 * @param sql(access语法)
 * @param pageIndex: 页码索引，从1开始
 * @param pageSize: 每页记录条数，正整数
 * @returns {{minRow: number, maxRow: number, pageSize: number, pageIndex: number, pageTotal: number, rowsTotal: number, result: boolean|{}}}
 */
SQLite.prototype.page = function(sql, pageIndex, pageSize) {
    this._checkStatus();

    // 定义临时变量
    var that = this;
    var tmp = {};
    // 返回结果
    var pages = {
        minRow: 0,
        maxRow: 0,
        pageSize: 0,
        pageIndex: 0,
        pageTotal: 0,
        rowsTotal: 0,
        result: false
    };
    // 处理参数
    tmp.pageIndex = Number(pageIndex) || 1;
    tmp.pageSize = Number(pageSize) || 1;
    // 取排序字段
    tmp.str = sql.substring(sql.lastIndexOf(")") + 1);
    // 取主键名
    tmp.isPrimaryKey = !/order by/i.test(tmp.str);
    // 取所有待查表的全部字段
    if (tmp.isPrimaryKey) {
        tmp.tables = [];
        tmp.sqlTable = sql.substring(sql.search(/ from /i) + 6, sql.search(/\s(where|having|order|group|for|limit|offset|union)\s|$/i));
        tmp.sqlTable.split(',').forEach(function(table) {
            table = table.split(/ as /i);
            var name = table[0].trim();
            var alias = table[1] ? table[1].trim() : name;
            var fields = Object.keys(that.getFields(name));
            tmp.tables.push({
                name: name,
                alias: alias,
                fields: fields
            });
        });

        tmp.primaryKey = [];
        tmp.tables.forEach(function(table) {
            var key = table.fields[0];
            if ( tmp.tables.length === 1 ) {
                tmp.primaryKey.push(key);
            } else {
                tmp.primaryKey.push(table.alias + '.' + key);
            }
        });
    }
    // 取不包含排序的sql语句
    if (/order by/i.test(tmp.str)) {
        tmp.order = tmp.str.match(/order by.+$/i)[0];
        tmp.sqlNoOrder = sql.substring(0, sql.length - tmp.order.length).trim();
    } else {
        tmp.sqlNoOrder = sql;
        if (tmp.isPrimaryKey && tmp.primaryKey.length) {
            tmp.orderFields = [];
            tmp.primaryKey.forEach(function(key) {
                tmp.orderFields.push(key + " asc");
            });

            tmp.order = "order by " + tmp.orderFields.join(',');
            sql = sql + " " + tmp.order;
        }
    }
    // 取总记录数
    tmp.sqlCount = tmp.sqlNoOrder.replace(/(select).+?(?= from)/i, '$1 count(*)');
    tmp.rs = this.execute(tmp.sqlCount);
    tmp.recordTotal = Number(tmp.rs[0]);
    // 查询结果
    if (tmp.recordTotal>0) {
        // 计算总页数
        tmp.pageTotal = Math.ceil(tmp.recordTotal / tmp.pageSize);
        // 修正页码范围
        tmp.pageIndex = Math.min(tmp.pageIndex, tmp.pageTotal);
        // 计算记录行号
        tmp.minRow = tmp.pageSize * (tmp.pageIndex - 1) + 1;
        tmp.maxRow = Math.min(tmp.pageSize * tmp.pageIndex, tmp.recordTotal);
        // 修正每页数量
        tmp.pageSize = tmp.maxRow - tmp.minRow + 1;
        // 计算偏移量
        tmp.offset = tmp.minRow - 1;
        // 处理分页
        tmp.sqlSelect = sql + " limit " + tmp.offset + ", " + tmp.pageSize;

        // 执行sql语句，获取最终结果
        pages = {
            minRow: tmp.minRow,
            maxRow: tmp.maxRow,
            pageSize: tmp.pageSize,
            pageIndex: tmp.pageIndex,
            pageTotal: tmp.pageTotal,
            rowsTotal: tmp.recordTotal,
            result: this._exec(tmp.sqlSelect, 1).toJSON()
        }
    }

    return pages;
};

/**
 * 创建一张数据表
 * @param table: 表名
 * @param fields: 字段列表，第一个字段自动作为主键
 * @returns {boolean}
 */
SQLite.prototype.createTable = function(table, fields) {
    this._checkStatus();

    if ( Array.isArray(table) ) {
        fields = table;
        table = this.tables[0];
    }

    var sql = "create table " + table + "(" + fields.join() + ")";

    try {
        this.execute(sql);
        
        getSchemas(this.engine, this._options.dbPath, true);
    } catch(e) {
        throw new Error('Failed to create table [' + table + ']: ' + e.message);
    }
};

/**
 * 清除一张表中所有数据，并重置索引。该操作不可恢复，请慎用。
 * @param table：表名
 */
SQLite.prototype.clearTable = function(table) {
    this._checkStatus();

    table = table || this.tables[0];

    // 清空数据
    this.execute("delete from [" + table + "]");
    // 重置索引
    this.execute("update sqlite_sequence set seq = 0 where name ='" + table + "'");

    getSchemas(this.engine, this._options.dbPath, true);
};

/**
 * 彻底删除一张表，不可恢复，请慎用。
 * @param table：表名
 */
SQLite.prototype.deleteTable = function(table) {
    this._checkStatus();

    table = table || this.tables[0];

    this.execute("drop table [" + table + "]");

    getSchemas(this.engine, this._options.dbPath, true);
};

/**
 * 添加字段。SQLite不支持更新和删除字段。
 * @param table：表名
 * @param fields：字段列表，Array
 */
SQLite.prototype.appendFields = function(table, fields) {
    this._checkStatus();

    if ( Array.isArray(table) ) {
        fields = table;
        table = this.tables[0];
    }

    var sql = [];
    fields.forEach(function(field) {
        sql.push("alter table [" + table + "] add column " + field);
    });

    sql.length && this.execute(sql.join(';'));

    getSchemas(this.engine, this._options.dbPath, true);
};

/**
 * 根据当前连接的数据库类型，生成SQL语句。该方法对于复杂的SQL语句无力，请直接使用execute方法。
 * @param action: 执行方法，[select, update, delete, insert]
 * @param tables: 表名，如果是多个表则使用数组
 * @param fields: 字段，如果是多个字段则使用数组
 * @param where: 可选，查询条件
 * @param orders: 可选，排序字段，如果是多个字段则使用数组
 * @param limit: 可选，查询记录条数
 * @returns {string}
 */
SQLite.prototype.produceSQL = function(action, tables, fields, where, orders, limit) {
    var sql = "", s=", ", type;

    // 以JSON传入参数
    if (Object.prototype.toString.call(tables) === '[object Object]') {
        limit = tables.limit;
        orders = tables.orders;
        where = tables.where;
        fields = tables.fields;
        tables = tables.tables;
    }

    // 处理参数
    if (typeof tables === 'string' && tables.length>0) tables = [tables];
    if (typeof fields === 'string' && fields.length>0) fields = [fields];
    if (typeof orders === 'string' && orders.length>0) orders = [orders];

    // 保存表格
    this.tables = tables;

    switch (action)
    {
        case "select":
        case "delete":
            // 处理SQLite删除不兼容*
            if ( action === "delete" && fields[0] === "*" ) fields = [];

            // 原始语句
            sql = action + " " + fields.join(s) + " from " + tables.join(s);

            // 处理where
            if (where) {
                sql += " where " + where;
            }

            // 处理order by
            if (orders) {
                sql += " order by " + orders.join(s).replace(/\+/g, "asc").replace(/\-/g, "desc");
            }

            // 处理limit查询
            if (typeof limit === 'number') {
                sql = sql + " limit " + limit;
            }

            break;
        case "insert":
            // 处理fields
            var keys = [], values = [];
            for (var i in fields) {
                if (!fields.hasOwnProperty(i)) continue;

                keys.push(i);

                // 处理不同字段类型
                type = helper.getType(fields[i]);
                if (type === "number") {
                    values.push(fields[i]);
                } else if (type === "date") {
                    values.push("'" + helper.convertDateTime(fields[i]) + "'");
                } else if (type === 'boolean') {
                    values.push(fields[i] ? 1 : 0);
                } else if (type === 'string') {
                    values.push("'" + fields[i].replace(/'/g, "''") + "'");
                } else {
                    values.push("'" + fields[i] + "'");
                }
            }

            // 原始语句
            sql = "insert into " + tables.join(s);
            sql += " (" + keys.join(s) + ") values (" + values.join(s) + ")";

            break;
        case "update":
            // 处理fields
            var pairs = [];
            for (var i in fields) {
                if (!fields.hasOwnProperty(i)) continue;

                // 处理不同字段类型
                type = helper.getType(fields[i]);
                if (type === "number") {
                    pairs.push(i + "=" + fields[i]);
                } else if (type === "date") {
                    pairs.push(i + "='" + helper.convertDateTime(fields[i]) + "'");
                } else if (type === 'boolean') {
                    pairs.push(i + "=" + (fields[i] ? 1 : 0));
                } else if (type === 'string') {
                    pairs.push(i + "='" + fields[i].replace(/'/g, "''") + "'");
                } else {
                    pairs.push(i + "='" + "'" + fields[i] + "'");
                }
            }

            // 原始语句
            sql = "update " + tables.join(s) + " set ";
            sql += pairs.join(s);

            // 处理where
            if (where) {
                sql += " where " + where;
            }

            break;
    }

    // 删除多余的空格
    sql = sql.replace(/\s+/g, ' ');

    // 构造toString();
    this.toString = function() { return sql };

    return sql;
};

/**
 * 遍历数据库，返回所有表名及其中字段信息
 * @param [onlyTable]: 是否只返回表名
 * @returns {*}
 */
SQLite.prototype.getTables = function(onlyTable) {
    var schemas = getSchemas(this.engine, this._options.dbPath);
    return onlyTable ? Object.keys(schemas) : schemas;
};

/**
 * 返回表中字段信息
 * @param table: 表名，如果不指定则使用上一次操作的表格
 * @returns {{}}
 */
SQLite.prototype.getFields = function(table) {
    table = table || this.tables[0];

    var schemas = getSchemas(this.engine, this._options.dbPath);
    return schemas[table] || {};
};

/**
 * 获取数据库的版本号
 * @returns {string}
 * @thanks: @codestone(easyasp)
 */
SQLite.prototype.getVersion = function() {
    this._checkStatus();

    var ret = this.execute('select sqlite_version(*) as version');

    return ret[0];
};

/**
 * 检测数据库是否已连接
 * @private
 */
SQLite.prototype._checkStatus = function() {
    if (!this._state) throw new Error('You should connect database first!');
};

/**
 * 保存数据库文件
 */
SQLite.prototype.save = function() {
    var data = this.engine.export();
    var buffer = new Buffer(data);
    fs.writeFileSync(this._options.dbPath, buffer);
};

/**
 * 关闭数据库连接
 */
SQLite.prototype.close = function() {
    this.save();
    this._state = 0;     // 标识数据库已经关闭
    this.engine.close();
};

function resultToRecord(result, sql, dbPath) {
    var record = [];
    
    if ( !result.length ) {
        result = [{columns: [], values: []}];
    }

    result.forEach(function(ret) {
        var rs = {
            fields: ret.columns,
            values: ret.values
        };
        
        formatValues(rs, sql, dbPath);
        
        record.push(new RecordSet(rs, sql));
    });

    return record.length === 1 ? record[0] : record;
}

function getSchemas(engine, dbPath, force) {
    var crypto = require('crypto');
    var sha1 = crypto.createHash('sha1');
    sha1.update(dbPath);
    var schemaKey = sha1.digest('hex');

    if (schemaCache[schemaKey] && !force) return schemaCache[schemaKey];

    var ret, sql, tables = [], schema = {}, fields;

    // 先查所有的表名
    sql = "select name from sqlite_master where type='table'";
    ret = engine.exec(sql)[0];
    ret.values.forEach(function(value) {
        if (value[0] !== 'sqlite_sequence') {
            tables.push(value[0]);
        }
    });

    // 依次查每个表中对应的字段类型
    tables.forEach(function(table) {
        fields = {};
        sql = "PRAGMA table_info([" + table + "])";
        ret = engine.exec(sql)[0];
        ret.values.forEach(function(value) {
            var func = null;   // 转换函数
            var name = value[1];
            var type = value[2].replace(/\s.*$/, '').toLowerCase();

            switch (type) {
                case "bit":
                case "boolean":
                    // 写成字符串完全是为了防止 istanbul 在这给我捣乱
                    func = 'function(value) {\n\treturn value === 1;\n}';
                    break;
                case "date":
                case "datetime":
                    // 写成字符串完全是为了防止 istanbul 在这给我捣乱
                    func = 'function(value) {\n\treturn new Date(value);\n}';
                    break;
            }

            fields[name] = {
                name: name,
                type: type,
                parse: func
            };
        });

        schema[table] = fields;
    });

    schemaCache[schemaKey] = schema;
    return schemaCache[schemaKey];
}

function formatValues(result, sql, dbPath) {
    var crypto = require('crypto');
    var sha1 = crypto.createHash('sha1');
    sha1.update(dbPath);
    var schemaKey = sha1.digest('hex');
    sha1 = crypto.createHash('sha1');
    sha1.update(dbPath + sql);
    var formatKey = sha1.digest('hex');

    if (!result.values.length || !sql || !dbPath || !schemaCache[schemaKey]) return;

    var schema = schemaCache[schemaKey];
    var format = formatCache[formatKey];

    if (format) {
        format(result.values);
        return;
    }

    // 解析sql语句
    sql = sql.substring(0, sql.search(/\s(where|having|order|group|for|limit|offset|union)\s|$/i));
    sql = sql.replace(/select\s(top\s\d+\s)?/i, '');

    var tables = sql.split(/\sfrom\s/i)[1].split(',');  // 查询的表格
    var fields = sql.split(/\sfrom\s/i)[0].split(',');  // 查询的字段

    // 找出所有表的名称和别名
    var alias = {};
    tables.forEach(function(table, i) {
        table = table.trim().replace(/\[|]|`/g, '');
        if (!!~table.indexOf(' ')) {
            // 有别名的情况
            table = table.split(/\s+/);
            tables[i] = table[0];
            alias[table.slice(-1)[0]] = table[0];
        } else {
            // 无别名的情况
            tables[i] = table;
        }
    });

    // 找出所有的查询字段
    var formats = [];
    fields.forEach(function(field) {
        // 跳过查询函数
        if (!!~field.indexOf('(')) {
            formats.push(null);
            return;
        }

        field = field.trim().replace(/\[|]|`/g, '');
        field = field.split(/\s+/);
        field = field[0];

        if (!!~field.indexOf('.')) {
            var piece = field.split('.');
            var table = piece[0];
            if (tables.indexOf(table) === -1) {
                table = alias[table];
            }
            if (!!~field.indexOf('*')) {
                Object.keys(schema[table]).forEach(function(field) {
                    formats.push({
                        table: table,
                        field: field
                    });
                });
            } else {
                formats.push({
                    table: table,
                    field: piece[1]
                });
            }
        } else {
            if (!!~field.indexOf('*')) {
                tables.forEach(function(table) {
                    Object.keys(schema[table]).forEach(function(field) {
                        formats.push({
                            table: table,
                            field: field
                        });
                    });
                })
            } else {
                formats.push({
                    table: tables[0],
                    field: field
                });
            }
        }
    });

    if (formats.length !== result.fields.length) {
        format = function() {};
    } else {
        var index = {}, length = 0;
        formats.forEach(function(f, i) {
            if (f && schema[f.table]) {
                var field = schema[f.table][f.field];
                if (field && field.parse) {
                    length++;
                    index[i] = field.parse;
                }
            }
        });

        if ( !length ) {
            format = function() {};
        } else {
            var code = [];

            code.push('var index = {};');

            for (var i in index) {
                code.push(
                    'index[' + i + '] = ' + String(index[i]).replace(/ {20}/g, '') + ';'
                )
            }

            code.push('values.forEach(function(array) {');
            code.push('    for (var i in index) {');
            code.push('        array[i] = index[i](array[i]);');
            code.push('    }');
            code.push('});');

            code = code.join('\n');

            format = new Function('values', code);
        }
    }

    format(result.values);

    formatCache[formatKey] = format;
}

var schemaCache = {};   // 缓存表结构信息
var formatCache = {};   // 缓存格式化方法