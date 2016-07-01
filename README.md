# sync-sqlite

[![Build Status](https://travis-ci.org/Spikef/sync-sqlite.svg?branch=master)](https://travis-ci.org/Spikef/sync-sqlite)
[![Coverage Status](https://coveralls.io/repos/github/Spikef/sync-sqlite/badge.svg)](https://coveralls.io/github/Spikef/sync-sqlite)
[![NPM Version](http://img.shields.io/npm/v/sync-sqlite.svg?style=flat)](https://www.npmjs.org/package/sync-sqlite)
[![NPM Downloads](https://img.shields.io/npm/dm/sync-sqlite.svg?style=flat)](https://www.npmjs.org/package/sync-sqlite)

[点此阅读中文文档](https://github.com/Spikef/sync-sqlite/blob/master/README_CN.md)

SQLite operation based on `sql.js`.

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

Connect and open database. If the target dbPath doesn't exist, it will be created automatically.

### table(tables)

Set what table you want to operate.

**tables:** Table name, one table use string, more than one use array

### createTable(table, fields)

Create a new data table in current database.

**table:** Table name

**fields:** Fields list(array)

### clearTable(table)

Clear all data in the table and reset index.

**table:** Table name

### deleteTable(table)

Delete the table.

**table:** Table name

### appendFields(table, fields)

Append fields to the table.

**table:** Table name

**fields:** Fields list(array)

### select(tables, fields, where, orders, limit)

Query data, return a RecordSet object.

**tables:** Table name, string or array(more than one table)

**fields:** Fields, string or array

**where:** Optional, query condition

**orders:** Optional, order by

**limit:** Optional, query count

### sel(fields, where, orders, limit)

Query data, return a RecordSet object.

### insert(tables, fields)

Insert data, return a JSON object. `ar` means the affected rows, `id` means the inserted id.

**tables:** Table name, string or array(more than one table)

**fields:** Fields, json object(key is field name, value is field value).

### ins(fields)

Insert data, return a JSON object. `ar` means the affected rows, `id` means the inserted id.

### update(tables, fields, where)

Update data, return a JSON object. `ar` means the affected rows.

**tables:** Table name, string or array(more than one table)

**fields:** Fields, json object(key is field name, value is field value).

**where:** Optional, query condition

### upd(fields, where)

Update data, return a JSON object. `ar` means the affected rows.

### remove(tables, fields, where, orders, limit)

Remove data, return a JSON object. `ar` means the affected rows.

**tables:** Table name, string or array(more than one table)

**fields:** Fields, string or array

**where:** Optional, query condition

**orders:** Optional, order by

**limit:** Optional, query count

### rem(fields, where, orders, limit)

Remove data, return a JSON object. `ar` means the affected rows.

### runSQL(sql)

Execute sql string, the return values are the same as above.

### execute(sql)

Execute sql string, the return values are:

If not query, return undefined.

If query, return an array contains the query result.

### page(sql, pageIndex, pageSize)

Pagination query.

**sql:** The query sql string
**pageIndex:** Page index, start from 1
**pageSize:** Record count per page

### getTables()

Get all table and fields information.

### getFields(table)

Get all fields information.

**table:** Table name

### getVersion()

Get sqlite database version, such as `3.11.0`。

## RecordSet

The query operation will return RecordSet object.

### toJSON(index)

Convert query result to JSON. If you specify the index, it will return a json at the index, otherwise return the whole array, if no data, return null.

### toArray(index)

Convert query result to Array. If you specify the index, it will return a array at the index, otherwise return the whole array, if no data, return empty array.

### forEach(callback)

Loop the query result.

### each(callback)

Loop the query result.

## Examples

Please check the examples directory to get more idea.

## License

MIT