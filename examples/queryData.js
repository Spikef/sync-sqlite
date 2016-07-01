var path = require('path');
var dbPath = path.resolve(__dirname, '../test/data.db');

var SQLite = require('../lib/sqlite');
var db = new SQLite({dbPath: dbPath});
db.connect();

var params, ret;

params = {
    action: "select",
    tables: "article",
    fields: ["id", "title", "posttime", "allow"],
    where: "user_id<3",
    orders: "id desc",
    limit: 5
};

ret = db.select(params).toJSON();
console.log(ret);

db.close();