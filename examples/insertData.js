var authors = [
    {
        username: "苏轼",
        description: "苏轼（1037年1月8日—1101年8月24日），字子瞻，又字和仲，号东坡居士，世称苏东坡、苏仙。汉族，北宋眉州眉山（今属四川省眉山市）人，祖籍河北栾城，北宋著名文学家、书法家、画家。"
    },
    {
        username: "李白",
        description: "李白（701年－762年），字太白，号青莲居士，又号“谪仙人”，是唐代伟大的浪漫主义诗人，被后人誉为“诗仙”。"
    },
    {
        username: "杜甫",
        description: "杜甫（公元712年－公元770年），字子美，河南巩县（今河南巩义）人，自号少陵野老，唐代伟大的现实主义诗人，与李白合称“李杜”。"
    },
    {
        username: "辛弃疾",
        description: "辛弃疾（1140年5月28日－1207年10月3日），字幼安，号稼轩，山东东路济南府历城县（今济南市历城区遥墙镇四凤闸村）人，中国南宋豪放派词人，人称词中之龙，与苏轼合称“苏辛”，与李清照并称“济南二安”。"
    }
];

var articles = [
    {
        title: "将进酒",
        user_id: 2,
        posttime: new Date(),
        stars: 2000,
        allow: true,
        content: "君不见，黄河之水天上来，奔流到海不复回。君不见，高堂明镜悲白发，朝如青丝暮成雪！人生得意须尽欢，莫使金樽空对月。天生我材必有用，千金散尽还复来。烹羊宰牛且为乐，会须一饮三百杯。岑夫子，丹丘生，将进酒，杯莫停。与君歌一曲，请君为我倾耳听。钟鼓馔玉不足贵，但愿长醉不复醒。古来圣贤皆寂寞，惟有饮者留其名。陈王昔时宴平乐，斗酒十千恣欢谑。主人何为言少钱，径须沽取对君酌。五花马、千金裘，呼儿将出换美酒，与尔同销万古愁！"
    },
    {
        title: "水调歌头",
        user_id: 1,
        posttime: new Date(),
        stars: 1493,
        allow: true,
        content: "明月几时有？把酒问青天。不知天上宫阙、今夕是何年？我欲乘风归去，惟恐琼楼玉宇，高处不胜寒．起舞弄清影，何似在人间？  转朱阁，低绮户，照无眠。不应有恨、何事长向别时圆？人有悲欢离合，月有阴晴圆缺，此事古难全。但愿人长久，千里共蝉娟。"
    },
    {
        title: "菩萨蛮",
        user_id: 2,
        posttime: new Date(),
        stars: 125,
        allow: false,
        content: "平林漠漠烟如织，寒山一带伤心碧。暝色入高楼，有人楼上愁。玉阶空伫立，宿鸟归飞急。何处是归程，长亭更短亭。"
    },
    {
        title: "寒食",
        user_id: 3,
        posttime: new Date(),
        stars: 3232,
        allow: true,
        content: "寒食江村路，风花高下飞。汀烟轻冉冉，竹日静晖晖。田父要皆去，邻家闹不违。地偏相识尽，鸡犬亦忘归。"
    },
    {
        title: "春日忆李白",
        user_id: 3,
        posttime: new Date(),
        stars: 2133,
        allow: true,
        content: "白也诗无敌，飘然思不群。清新庾开府，俊逸鲍参军。渭北春天树，江东日暮云。何时一樽酒，重与细论文。"
    },
    {
        title: "登白马潭",
        user_id: 3,
        posttime: new Date(),
        stars: 1234,
        allow: true,
        content: "水生春缆没，日出野船开。宿鸟行犹去，丛花笑不来。人人伤白首，处处接金杯。莫道新知要，南征且未回。"
    },
    {
        title: "江城子 乙卯正月二十日夜记梦",
        user_id: 1,
        posttime: new Date(),
        stars: 10212,
        allow: true,
        content: "十年生死两茫茫。\n不思量，自难忘。\n千里孤坟，无处话凄凉。\n纵使相逢应不识，尘满面，鬓如霜。\n夜来幽梦忽还乡。\n小轩窗，正梳妆。\n相顾无言，惟有泪千行。\n料得年年肠断处，明月夜，短松冈。"
    },
    {
        title: "江城子 密州出猎",
        user_id: 1,
        posttime: new Date(),
        stars: 9023,
        allow: true,
        content: "老夫聊发少年狂，左牵黄，右擎苍。\n锦帽貂裘，千骑卷平冈。\n欲报倾城随太守，亲射虎，看孙郎。\n酒酣胸胆尚开张，鬓微霜，又何妨！\n持节云中，何日遣冯唐？\n会挽雕弓如满月，西北望，射天狼。"
    },
    {
        title: "永遇乐·京口北固亭怀古",
        user_id: 4,
        posttime: new Date(),
        stars: 11239,
        allow: true,
        content: "千古江山，英雄无觅，孙仲谋处。舞榭歌台，风流总被，雨打风吹去。斜阳草树，寻常巷陌，人道寄奴曾住。想当年，金戈铁马，气吞万里如虎。\n元嘉草草，封狼居胥，赢得仓皇北顾。四十三年，望中犹记，烽火扬州路。可堪回首，佛狸祠下，一片神鸦社鼓。凭谁问，廉颇老矣，尚能饭否？"
    },
    {
        title: "虞美人 有美堂赠述古",
        user_id: 1,
        posttime: new Date(),
        stars: 3992,
        allow: true,
        content: "湖山信是东南美，一望弥千里。\n使君能得几回来？便使尊前醉倒且徘徊。\n沙河塘里灯初上，水调谁家唱。\n夜阑风静欲归时，惟有一江明月碧琉璃。\n"
    },
    {
        title: "蜀道难 ",
        user_id: 2,
        posttime: new Date(),
        stars: 1504,
        allow: true,
        content: "噫吁戏，危乎高哉！\n蜀道之难，难于上青天！\n蚕丛及鱼凫，开国何茫然。\n尔来四万八千岁，不与秦塞通人烟。\n西当太白有鸟道，可以横绝峨眉巅。\n地崩山摧壮士死，然后天梯石栈相钩连。\n上有六龙回日之高标，下有冲波逆折之回川。\n黄鹤之飞尚不得过，猿猱欲度愁攀援。\n青泥何盘盘，百步九折萦岩峦。\n扪参历井仰胁息，以手抚膺坐长叹。\n问君西游何时还，畏途躔岩不可攀。\n但见悲鸟号古木，雄飞雌从绕林间。\n又闻子规啼夜月，愁空山，蜀道之难，难于上青天！\n使人听此凋朱颜。\n连峰去天不盈尺，枯松倒挂倚绝壁。\n飞湍瀑流争喧虺，砰崖转石万壑雷。\n其险也如此，嗟尔远道之人胡为乎哉！\n剑阁峥嵘而崔嵬，一夫当关，万夫莫开。\n所守或匪亲，化为狼与豺。\n朝避猛虎，夕避长蛇，磨牙吮血，杀人如麻。\n锦城虽云乐，不如早还家。\n蜀道之难，难于上青天！侧身西望长咨嗟。"
    },
    {
        title: "鹧鸪天",
        user_id: 1,
        posttime: new Date(),
        stars: 2129,
        allow: true,
        content: "林断山明竹隐墙，乱蝉衰草小池塘。\n翻空白鸟时时见，照水红蕖细细香。\n村舍外，古城旁，杖藜徐步转斜阳。\n殷勤昨夜三更雨，又得浮生一日凉。"
    },
    {
        title: "春夜喜雨",
        user_id: 3,
        posttime: new Date(),
        stars: 3040,
        allow: true,
        content: "好雨知时节，当春乃发生。\n随风潜入夜，润物细无声。\n野径云俱黑，江船火独明。\n晓看红湿处，花重锦官城。"
    },
    {
        title: "赠花卿",
        user_id: 3,
        posttime: new Date(),
        stars: 3424,
        allow: true,
        content: "锦城丝管日纷纷，半入江风半入云。此曲只应天上有，人间能得几回闻。"
    },
    {
        title: "定风波",
        user_id: 1,
        posttime: new Date(),
        stars: 3022,
        allow: true,
        content: "三月七日沙湖道中遇雨。\n雨具先去，同行皆狼狈，余独不觉。\n已而遂晴，故作此词。\n莫听穿林打叶声，何妨吟啸且徐行。\n竹杖芒鞋轻胜马，谁怕？\n一蓑烟雨任平生。\n料峭春风吹酒醒，微冷，山头斜照却相迎。\n回首向来萧瑟处，归去，也无风雨也无晴。\n"
    },
    {
        title: "武侯庙",
        user_id: 3,
        posttime: new Date(),
        stars: 2000,
        allow: true,
        content: "遗庙丹青落，空山草木长。犹闻辞后主，不复卧南阳。"
    },
    {
        title: "念奴娇 赤壁怀古",
        user_id: 1,
        posttime: new Date(),
        stars: 21921,
        allow: true,
        content: "大江东去，浪淘尽，千古风流人物。\n故垒西边，人道是、三国周郎赤壁。\n乱石穿空，惊涛拍岸，卷起千堆雪。\n江山如画，一时多少豪杰。\n遥想公谨当年，小乔初嫁了，雄姿英发。\n羽扇纶巾，谈笑间、强虏灰飞烟灭。\n故国神游，多情应笑我，早生华发。\n人间如梦，一尊还酹江月。"
    },
    {
        title: "八阵图",
        user_id: 3,
        posttime: new Date(),
        stars: 342,
        allow: true,
        content: "功盖三分国，名成八阵图。江流石不转，遗恨失吞吴。"
    },
    {
        title: "规雁",
        user_id: 3,
        posttime: new Date(),
        stars: 3234,
        allow: true,
        content: "东来千里客，乱定几年归。肠断江城雁，高高正北飞。"
    },
    {
        title: "望庐山瀑布",
        user_id: 2,
        posttime: new Date(),
        stars: 1998,
        allow: true,
        content: "日照香炉生紫烟，遥看瀑布挂前川。飞流直下三千尺，疑是银河落九天。"
    },
    {
        title: "登高",
        user_id: 3,
        posttime: new Date(),
        stars: 8574,
        allow: true,
        content: "风急天高猿啸哀，渚清沙白鸟飞回。无边落木萧萧下，不尽长江衮衮来。万里悲秋常作客，百年多病独登台。艰难苦恨繁霜鬓，潦倒新停浊酒杯。"
    },
    {
        title: "渌水曲",
        user_id: 2,
        posttime: new Date(),
        stars: 155,
        allow: true,
        content: "渌水明秋日，南湖采白苹。荷花娇欲语，愁杀荡舟人。"
    },
    {
        title: "破阵子·为陈同甫赋壮词以寄之",
        user_id: 4,
        posttime: new Date(),
        stars: 8545,
        allow: true,
        content: "醉里挑灯看剑，梦回吹角连营。八百里分麾下炙，五十弦翻塞外声。沙场秋点兵。\n马作的卢飞快，弓如霹雳弦惊。了却君王天下事，赢得生前身后名。可怜白发生。"
    },
    {
        title: "望岳",
        user_id: 3,
        posttime: new Date(),
        stars: 4032,
        allow: true,
        content: "岱宗夫如何，齐鲁青未了。造化钟神秀，阴阳割昏晓。荡胸生曾云，决眦入归鸟。会当凌绝顶，一览众山小。"
    },
    {
        title: "登岳阳楼",
        user_id: 3,
        posttime: new Date(),
        stars: 6373,
        allow: true,
        content: "昔闻洞庭水，今上岳阳楼。吴楚东南坼，乾坤日夜浮。亲朋无一字，老病有孤舟。戎马关山北，凭轩涕泗流。"
    },
    {
        title: "客至",
        user_id: 3,
        posttime: new Date(),
        stars: 2331,
        allow: true,
        content: "舍南舍北皆春水，但见群鸥日日来。花径不曾缘客扫，蓬门今始为君开。盘飧市远无兼味，樽酒家贫只旧醅。肯与邻翁相对饮，隔篱呼取尽余杯。"
    },
    {
        title: "昭君怨",
        user_id: 1,
        posttime: new Date(),
        stars: 1443,
        allow: true,
        content: "谁作桓伊三弄，惊破绿窗幽梦。\n新月与愁烟，满江天。\n欲去又还不去，明日落花飞絮。\n飞絮送行舟，水东流。\n减字木兰花 春月 春庭月午，摇荡香醪光欲舞。\n步转回廊，半落梅花婉娩香。\n轻云薄雾，总是少年行乐处。\n不似秋光，只与离人照断肠。\n"
    },
    {
        title: "春夜洛城闻笛",
        user_id: 2,
        posttime: new Date(),
        stars: 873,
        allow: true,
        content: "谁家玉笛暗飞声，散入春风满洛城。此夜曲中闻折柳，何人不起故园情。"
    },
    {
        title: "浣溪沙",
        user_id: 1,
        posttime: new Date(),
        stars: 6543,
        allow: true,
        content: "游蕲水清泉寺，寺临兰溪，溪水西流。\n山下兰芽短浸溪，松间沙路净无泥。\n萧萧暮雨子规啼。谁道人生无再少？\n门前流水尚能西！休将白发唱黄鸡。"
    },
    {
        title: "客中行",
        user_id: 2,
        posttime: new Date(),
        stars: 234,
        allow: true,
        content: "兰陵美酒郁金香，玉碗盛来琥珀光。但使主人能醉客，不知何处是他乡。"
    },
    {
        title: "独坐敬亭山",
        user_id: 2,
        posttime: new Date(),
        stars: 1232,
        allow: true,
        content: "众鸟高飞尽，孤云独去闲。相看两不厌，只有敬亭山。"
    },
    {
        title: "卜算子",
        user_id: 1,
        posttime: new Date(),
        stars: 8372,
        allow: true,
        content: "黄州定惠院寓居作 缺月挂疏桐，漏断人初静。\n时见幽人独往来，缥缈孤鸿影。\n惊起却回头，有恨无人省。\n拣尽寒枝不肯栖，寂寞沙洲冷。"
    },
    {
        title: "行路难",
        user_id: 2,
        posttime: new Date(),
        stars: 2310,
        allow: true,
        content: "金樽清酒斗十千，玉盘珍羞直万钱。\n停杯投箸不能食，拔剑四顾心茫然。\n欲渡黄河冰塞川，将登太行雪满山。\n闲来垂钓碧溪上，忽复乘舟梦日边。\n行路难！行路难！多歧路，今安在？\n长风破浪会有时，直挂云帆济沧海。"
    },
    {
        title: "静夜思",
        user_id: 2,
        posttime: new Date(),
        stars: 1754,
        allow: true,
        content: "床前明月光，疑是地上霜。举头望明月，低头思故乡。"
    },
    {
        title: "望天门山",
        user_id: 2,
        posttime: new Date(),
        stars: 2819,
        allow: true,
        content: "天门中断楚江开，碧水东流至此回。两岸青山相对出，孤帆一片日边来。"
    },
    {
        title: "旅夜书怀",
        user_id: 3,
        posttime: new Date(),
        stars: 3726,
        allow: true,
        content: "细草微风岸，危樯独夜舟。星垂平野阔，月涌大江流。名岂文章着，官因老病休。飘飘何所似，天地一沙鸥。"
    },
    {
        title: "闻官军收河南河北",
        user_id: 3,
        posttime: new Date(),
        stars: 2180,
        allow: true,
        content: "剑外忽传收蓟北，初闻涕泪满衣裳\n却看妻子愁何在，漫卷诗书喜欲狂。\n白日放歌须纵酒，青春作伴好还乡。\n即从巴峡穿巫峡，便下襄阳向洛阳。"
    },
    {
        title: "夜宿山寺",
        user_id: 2,
        posttime: new Date(),
        stars: 1820,
        allow: true,
        content: "危楼高百尺，手可摘星辰。不敢高声语，恐惊天上人。"
    },
    {
        title: "江南逢李龟年",
        user_id: 3,
        posttime: new Date(),
        stars: 622,
        allow: true,
        content: "岐王宅里寻常见，崔九堂前几度闻。正是江南好风景，落花时节又逢君。"
    },
    {
        title: "送孟浩然之广陵",
        user_id: 2,
        posttime: new Date(),
        stars: 2000,
        allow: true,
        content: "故人西辞黄鹤楼，烟花三月下扬州。孤帆远影碧空尽，唯见长江天际流。"
    },
    {
        title: "江畔独步寻花",
        user_id: 3,
        posttime: new Date(),
        stars: 2050,
        allow: true,
        content: "黄四娘家花满蹊，千朵万朵压枝低。留连戏蝶时时舞，自在娇莺恰恰啼。"
    },
    {
        title: "赠汪伦",
        user_id: 2,
        posttime: new Date(),
        stars: 12200,
        allow: true,
        content: "李白乘舟将欲行，忽闻岸上踏歌声。桃花潭水深千尺，不及汪伦送我情。"
    },
    {
        title: "月夜忆舍弟",
        user_id: 3,
        posttime: new Date(),
        stars: 954,
        allow: true,
        content: "戍鼓断人行，秋边一雁声。露从今夜白，月是故乡明。有弟皆分散，无家问死生。寄书长不避，况乃未休兵。"
    },
    {
        title: "绝句",
        user_id: 3,
        posttime: new Date(),
        stars: 7008,
        allow: true,
        content: "两个黄鹂鸣翠柳，一行白鹭上青天。窗含西岭千秋雪，门泊东吴万里船。"
    },
    {
        title: "早发白帝城",
        user_id: 2,
        posttime: new Date(),
        stars: 3203,
        allow: true,
        content: "朝辞白帝彩云间，千里江陵一日还。两岸猿声啼不尽，轻舟已过万重山。"
    }
];


var path = require('path');
var dbPath = path.resolve(__dirname, '../test/data.db');
var SQLite = require('../index');
var db = new SQLite({dbPath: dbPath});

db.connect();

authors.forEach(function (user) {
    db.insert("member", user);
});

articles.forEach(function (art) {
    db.insert("article", art);
});

db.close();