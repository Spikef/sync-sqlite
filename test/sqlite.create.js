var fs = require('fs');
var path = require('path');

var dbPath = path.resolve(__dirname, './test.db');
if (fs.existsSync(dbPath)) fs.unlinkSync(dbPath);

var SQLite = require('../lib/sqlite');
var db = new SQLite({dbPath: dbPath});

var assert = require('chai').assert;

describe('SQLite Create', function () {
    describe('create table', function () {
        it('should contain table [article] after create table', function () {
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
            
            fields = ['id', 'title', 'content', 'username', 'posttime', 'stars', 'allow'].toString();

            assert.equal('article', db.getTables(true).toString());
            assert.equal(fields, Object.keys(db.getFields('article')).toString());
        });
    });

    describe('append field', function () {
        it('should contain fields [test1, test2] after append fields', function () {
            var fields = [
                "test1 text null",
                "test2 text null"
            ];
            db.appendFields("article", fields);

            fields = Object.keys(db.getFields('article')).toString();

            assert.equal(false, !~fields.indexOf('test1'));
            assert.equal(false, !~fields.indexOf('test2'));
        });
    });

    describe('insert', function () {
        it('should return id and ar after insert', function () {
            var data = [
                {
                    title: "将进酒",
                    username: "李白",
                    content: "君不见，黄河之水天上来，奔流到海不复回。君不见，高堂明镜悲白发，朝如青丝暮成雪！人生得意须尽欢，莫使金樽空对月。天生我材必有用，千金散尽还复来。烹羊宰牛且为乐，会须一饮三百杯。岑夫子，丹丘生，将进酒，杯莫停。与君歌一曲，请君为我倾耳听。钟鼓馔玉不足贵，但愿长醉不复醒。古来圣贤皆寂寞，惟有饮者留其名。陈王昔时宴平乐，斗酒十千恣欢谑。主人何为言少钱，径须沽取对君酌。五花马、千金裘，呼儿将出换美酒，与尔同销万古愁！",
                    posttime: new Date(),
                    stars: 200,
                    allow: true
                },
                {
                    title: "水调歌头",
                    username: "苏轼",
                    content: "明月几时有？把酒问青天。不知天上宫阙、今夕是何年？我欲乘风归去，惟恐琼楼玉宇，高处不胜寒．起舞弄清影，何似在人间？  转朱阁，低绮户，照无眠。不应有恨、何事长向别时圆？人有悲欢离合，月有阴晴圆缺，此事古难全。但愿人长久，千里共蝉娟。",
                    posttime: new Date(),
                    stars: 365,
                    allow: false
                }
            ];

            var ret;

            ret = db.table("article").ins(data[0]);

            assert.equal(1, ret.id);
            assert.equal(1, ret.ar);

            ret = db.table("article").ins(data[1]);
            assert.equal(2, ret.id);
            assert.equal(1, ret.ar);
            
            ret = db.execute("Select * From article");
            assert.equal(2, ret.length);
        });
    });

    describe('update', function () {
        it('should return ar after update', function () {
            var ar;
            
            ar = db.update("article", {stars: 100, posttime: new Date()}, "id=1").ar;
            assert.equal(1, ar);

            ar = db.upd({stars: 100, posttime: new Date()}, "id=3").ar;
            assert.equal(0, ar);
        });
    });
    
    describe('remove', function () {
        it('should return ar after remove', function () {
            var ret;
            
            ret = db.remove("article", "*", "id=1");
            assert.equal(1, ret.ar);

            ret = db.execute("Select * From article");
            assert.equal(2, ret[0]);
        });
    });
    
    describe('clear Table', function () {
        it('should be empty after clear table', function () {
            db.clearTable("article");

            var fields = {
                title: "将进酒",
                username: "李白",
                content: "君不见，黄河之水天上来，奔流到海不复回。君不见，高堂明镜悲白发，朝如青丝暮成雪！人生得意须尽欢，莫使金樽空对月。天生我材必有用，千金散尽还复来。烹羊宰牛且为乐，会须一饮三百杯。岑夫子，丹丘生，将进酒，杯莫停。与君歌一曲，请君为我倾耳听。钟鼓馔玉不足贵，但愿长醉不复醒。古来圣贤皆寂寞，惟有饮者留其名。陈王昔时宴平乐，斗酒十千恣欢谑。主人何为言少钱，径须沽取对君酌。五花马、千金裘，呼儿将出换美酒，与尔同销万古愁！",
                posttime: new Date(),
                stars: 200,
                allow: true
            };

            assert.equal(1, db.ins(fields).id);
        });
    });

    describe('delete Table', function () {
        it('should not contain table [article] after delete', function () {
            db.deleteTable("article");
            
            var tables = db.getTables(true);
            assert.equal(true, !~tables.indexOf("article"));
        });
    });
});