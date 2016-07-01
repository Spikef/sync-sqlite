var fs = require('fs');
var path = require('path');

var dbPath = path.resolve(__dirname, '../test/data.db');
if (fs.existsSync(dbPath)) fs.unlinkSync(dbPath);

var SQLite = require('../index');
var db = new SQLite({dbPath: dbPath});

db.connect();

var tables = {
    "article": [
        "id integer primary key autoincrement",
        "title varchar(255) null unique",
        "content text not null",
        "user_id int not null",
        "posttime datetime not null",
        "stars smallint not null default(0)",
        "allow boolean default 0"
    ],
    "member": [
        "id integer primary key autoincrement",
        "username varchar(255) null unique",
        "description text not null"
    ]
};

db.connect();

Object.keys(tables).forEach(function(name) {
    db.createTable(name, tables[name]);
});

db.close();