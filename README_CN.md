# sync-sqlite

基于`sql.js`模块封装的SQLite数据库操作模块。

## Install

```bash
$ npm install sync-sqlite
```

## Usage

```javascript
var options = {
    dbPath: './test.db',
    autoSave: true
};
var SQLite = require('sync-sqlite');
var db = new SQLite(options);
```

## Methods

### connect

连接并打开数据库，如果目标数据库不存在，将被自动创建。

### table(tables)

设置要操作的表格，返回this。便于多次操作的链式写法。

**tables:** 表名，如果是多个表则使用数组

### createTable(table, fields)

创建一张数据表。

**table:** 表名

**fields:** 字段列表(array)

### clearTable(table)

清除一张表中所有数据，并重置索引。该操作不可恢复，请慎用。

**table:** 表名

### deleteTable(table)

彻底删除一张表，不可恢复，请慎用。

**table:** 表名

### appendFields(table, fields)

添加字段。

**table:** 表名

**fields:** 字段列表(array)

### select(tables, fields, where, orders, limit)

查询记录，返回RecordSet对象。

**tables:** 表名，如果是多个表则使用数组

**fields:** 字段，如果是多个字段则使用数组

**where:** 可选，查询条件

**orders:** 可选，排序字段，如果是多个字段则使用数组

**limit:** 可选，查询记录条数

### sel(fields, where, orders, limit)

查询记录，返回RecordSet对象。

### insert(tables, fields)

插入记录，返回一个JSON对象。ar表示受影响的行数，id表示新记录的id值。

**tables:** 表名，如果是多个表则使用数组

**fields:** 字段，如果是多个字段则使用JSON

### ins(fields)

插入记录，返回一个JSON对象。ar表示受影响的行数，id表示新记录的id值。

### update(tables, fields, where)

更新记录，返回一个JSON对象。ar表示受影响的行数。

**tables:** 表名，如果是多个表则使用数组

**fields:** 字段，如果是多个字段则使用JSON

**where:** 可选，查询条件

### upd(fields, where)

更新记录，返回一个JSON对象。ar表示受影响的行数。

### remove(tables, fields, where, orders, limit)

删除记录，返回一个JSON对象。ar表示受影响的行数。

**tables:** 表名，如果是多个表则使用数组

**fields:** 字段，如果是多个字段则使用数组

**where:** 可选，查询条件

**orders:** 可选，排序字段，如果是多个字段则使用数组

**limit:** 可选，查询记录条数

### rem(fields, where, orders, limit)

删除记录，返回this，用于链式写法操作相同表格。后面可跟ar返回受影响的行数。

### runSQL(sql)

执行SQL语句，其返回值与上面的增、删、改、查一致。

### execute(sql)

执行SQL语句，其返回值情况如下：

如果不是查询语句，无返回值。

如果是查询语句，则返回一个包含查询结果的数组。

### page(sql, pageIndex, pageSize)

分页查询，可以是单表、多表连接或者包含子查询的复杂SQL查询语句。

**sql:** 要查询的sql语句
**pageIndex:** 页码索引，从1开始
**pageSize:** 每页记录条数，正整数

### getTables()

遍历数据库，返回所有表名及其中字段信息。

### getFields(table)

返回表中字段信息。

**table:** 表名，如果不指定则使用上一次操作的表格

### getVersion()

获取数据库的版本号，例如：`3.11.0`。

## RecordSet

查询语句将返回RecordSet对象，该对象有以下方法。

### toJSON(index)

将记录集结果转为JSON。如果给了index参数，则返回对应索引的JSON；如果未给定index参数，则返回数组；如果无结果，则返回null。

### toArray(index)

将记录集结果转为Array。如果给了index参数，则返回对应索引的数组；如果未给定index参数，则返回整个结果数组；如果没有查询到记录，则返回空数组。

### forEach(callback)

循环处理查询得到记录集。

## Examples

更多示例代码请查看examples目录。

## License

MIT