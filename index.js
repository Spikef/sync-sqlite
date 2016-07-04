function RecordSet(e,t){Object.defineProperty(this,"data",{get:function(){return e}}),Object.defineProperty(this,"source",{enumerable:!0,get:function(){return t}}),Object.defineProperty(this,"count",{enumerable:!0,get:function(){return e.values.length}})}function resultToRecord(e,t,r){var i=[];return e.length||(e=[{columns:[],values:[]}]),e.forEach(function(e){var s={fields:e.columns,values:e.values};formatValues(s,t,r),i.push(new RecordSet(s,t))}),1===i.length?i[0]:i}function getSchemas(e,t,r){var i=require("crypto"),s=i.createHash("sha1");s.update(t);var a=s.digest("hex");if(schemaCache[a]&&!r)return schemaCache[a];var n,o,c,h=[],u={};return o="select name from sqlite_master where type='table'",n=e.exec(o)[0],n.values.forEach(function(e){"sqlite_sequence"!==e[0]&&h.push(e[0])}),h.forEach(function(t){c={},o="PRAGMA table_info(["+t+"])",n=e.exec(o)[0],n.values.forEach(function(e){var t=null,r=e[1],i=e[2].replace(/\s.*$/,"").toLowerCase();switch(i){case"bit":case"boolean":t="function(value) {\n\treturn value === 1;\n}";break;case"date":case"datetime":t="function(value) {\n\treturn new Date(value);\n}"}c[r]={name:r,type:i,parse:t}}),u[t]=c}),schemaCache[a]=u,schemaCache[a]}function formatValues(e,t,r){var i=require("crypto"),s=i.createHash("sha1");s.update(r);var a=s.digest("hex");s=i.createHash("sha1"),s.update(r+t);var n=s.digest("hex");if(e.values.length&&t&&r&&schemaCache[a]){var o=schemaCache[a],c=formatCache[n];if(c)return void c(e.values);t=t.substring(0,t.search(/\s(where|having|order|group|for|limit|offset|union)\s|$/i)),t=t.replace(/select\s(top\s\d+\s)?/i,"");var h=t.split(/\sfrom\s/i)[1].split(","),u=t.split(/\sfrom\s/i)[0].split(","),l={};h.forEach(function(e,t){e=e.trim().replace(/\[|]|`/g,""),~e.indexOf(" ")?(e=e.split(/\s+/),h[t]=e[0],l[e.slice(-1)[0]]=e[0]):h[t]=e});var p=[];if(u.forEach(function(e){if(~e.indexOf("("))return void p.push(null);if(e=e.trim().replace(/\[|]|`/g,""),e=e.split(/\s+/),e=e[0],~e.indexOf(".")){var t=e.split("."),r=t[0];h.indexOf(r)===-1&&(r=l[r]),~e.indexOf("*")?Object.keys(o[r]).forEach(function(e){p.push({table:r,field:e})}):p.push({table:r,field:t[1]})}else~e.indexOf("*")?h.forEach(function(e){Object.keys(o[e]).forEach(function(t){p.push({table:e,field:t})})}):p.push({table:h[0],field:e})}),p.length!==e.fields.length)c=function(){};else{var f={},d=0;if(p.forEach(function(e,t){if(e&&o[e.table]){var r=o[e.table][e.field];r&&r.parse&&(d++,f[t]=r.parse)}}),d){var g=[];g.push("var index = {};");for(var v in f)g.push("index["+v+"] = "+String(f[v]).replace(/ {20}/g,"")+";");g.push("values.forEach(function(array) {"),g.push("    for (var i in index) {"),g.push("        array[i] = index[i](array[i]);"),g.push("    }"),g.push("});"),g=g.join("\n"),c=new Function("values",g)}else c=function(){}}c(e.values),formatCache[n]=c}}var fs=require("fs"),path=require("path"),driver=require("sql.js"),helper={};helper.getType=function(e){var t=null===e?"null":typeof e;return"object"===t&&(t=Object.prototype.toString.call(e),t=t.replace(/(\[object )|]/g,"").toLowerCase()),t},helper.convertDateTime=function(e){var t;return t=e.getFullYear()+"-"+("00"+(e.getMonth()+1)).slice(-2)+"-"+("00"+e.getDate()).slice(-2)+" "+("00"+e.getHours()).slice(-2)+":"+("00"+e.getMinutes()).slice(-2)+":"+("00"+e.getSeconds()).slice(-2)},helper.convertTimeStamp=function(e,t){return t?new Date(1e3*e).getTime():Math.round(new Date(e).getTime()/1e3)},RecordSet.prototype.forEach=function(e){if("function"==typeof e)for(var t=0,r=this.data.values.length;t<r;t++){for(var i={},s=0,a=this.data.fields.length;s<a;s++)i[this.data.fields[s]]=this.data.values[t][s];e.call(e,i,t)}},RecordSet.prototype.each=function(e){if("function"==typeof e)for(var t=0,r=this.data.values.length;t<r;t++)for(var i=0,s=this.data.fields.length;i<s;i++)e.call(e,this.data.values[t][i],this.data.fields[i],t,i)},RecordSet.prototype.toJSON=function(e){if(0===this.count)return null;var t=[],r=this;if("number"==typeof e){var i={};return this.data.values[e].forEach(function(e,t){e&&e.getTime&&"function"==typeof e.getTime&&(e=e.getTime()),i[r.data.fields[t]]=e}),i}return this.data.values.forEach(function(e){var i={};e.forEach(function(e,t){e&&e.getTime&&"function"==typeof e.getTime&&(e=e.getTime()),i[r.data.fields[t]]=e}),t.push(i)}),t},RecordSet.prototype.toArray=function(e){return"number"==typeof e?this.data.values[e]:this.data.values};var SQLite=module.exports=function(e){this._options=e||{},this.autoSave=!!this._options.autoSave,this._options.dbPath&&(this._options.dbPath=path.resolve(this._options.dbPath))};SQLite.prototype.connect=function(){try{if(!this._state){if(this._options.dbPath&&fs.existsSync(this._options.dbPath)){var e=fs.readFileSync(this._options.dbPath);this.engine=new driver.Database(e),getSchemas(this.engine,this._options.dbPath)}else this.engine=new driver.Database;this._state=1}return this}catch(t){throw new Error("Failed to connect database:"+t.message)}},SQLite.prototype.table=function(e){if(!e)throw new Error("You should specify the table.");return"string"==typeof e&&(e=[e]),this.tables=e,this},SQLite.prototype.select=function(e,t,r,i,s){var a=this.produceSQL("select",e,t,r,i,s);return this._exec(a,1)},SQLite.prototype.sel=function(e,t,r,i){return this.select(this.tables,e,t,r,i)},SQLite.prototype.insert=function(e,t){var r=this.produceSQL("insert",e,t);return this._exec(r,0)},SQLite.prototype.ins=function(e){return this.insert(this.tables,e)},SQLite.prototype.update=function(e,t,r){var i=this.produceSQL("update",e,t,r);return this._exec(i,2)},SQLite.prototype.upd=function(e,t){return this.update(this.tables,e,t)},SQLite.prototype.remove=function(e,t,r,i,s){var a=this.produceSQL("delete",e,t,r,i,s);return this._exec(a,2)},SQLite.prototype.rem=function(e,t,r,i){return this.remove(this.tables,e,t,r,i)},SQLite.prototype.runsql=SQLite.prototype.runSQL=function(e){return this.toString=function(){return e},/^(insert|select into)\s/i.test(e)?this._exec(e,0):/^(select|call|exec)\s/i.test(e)?this._exec(e,1):this._exec(e,2)},SQLite.prototype.execute=function(e){if(/^(select|call|exec)\s/i.test(e)){var t=this.engine.exec(e)[0],r=t.values.length;return 0===r?[]:1===r?t.values[0]:t.values}this.engine.run(e),this.autoSave&&this.save()},SQLite.prototype._exec=function(e,t){try{var r,i,s;if(0===t)return this.engine.run(e),r="select last_insert_rowid() as id, changes() as ar;",i=this.engine.exec(r),this.autoSave&&this.save(),{id:i[0].values[0][0],ar:i[0].values[0][1]};if(1===t)return i=this.engine.exec(e),s=resultToRecord(i,e,this._options.dbPath);if(2===t)return this.engine.run(e),r="select changes() as ar;",i=this.engine.exec(r),this.autoSave&&this.save(),{ar:i[0].values[0][0]}}catch(a){throw new Error("Error while exec sql: ["+e+"] "+a.message)}},SQLite.prototype.page=function(e,t,r){this._checkStatus();var i=this,s={},a={minRow:0,maxRow:0,pageSize:0,pageIndex:0,pageTotal:0,rowsTotal:0,result:!1};return s.pageIndex=Number(t)||1,s.pageSize=Number(r)||1,s.str=e.substring(e.lastIndexOf(")")+1),s.isPrimaryKey=!/order by/i.test(s.str),s.isPrimaryKey&&(s.tables=[],s.sqlTable=e.substring(e.search(/ from /i)+6,e.search(/\s(where|having|order|group|for|limit|offset|union)\s|$/i)),s.sqlTable.split(",").forEach(function(e){e=e.split(/ as /i);var t=e[0].trim(),r=e[1]?e[1].trim():t,a=Object.keys(i.getFields(t));s.tables.push({name:t,alias:r,fields:a})}),s.primaryKey=[],s.tables.forEach(function(e){var t=e.fields[0];1===s.tables.length?s.primaryKey.push(t):s.primaryKey.push(e.alias+"."+t)})),/order by/i.test(s.str)?(s.order=s.str.match(/order by.+$/i)[0],s.sqlNoOrder=e.substring(0,e.length-s.order.length).trim()):(s.sqlNoOrder=e,s.isPrimaryKey&&s.primaryKey.length&&(s.orderFields=[],s.primaryKey.forEach(function(e){s.orderFields.push(e+" asc")}),s.order="order by "+s.orderFields.join(","),e=e+" "+s.order)),s.sqlCount=s.sqlNoOrder.replace(/(select).+?(?= from)/i,"$1 count(*)"),s.rs=this.execute(s.sqlCount),s.recordTotal=Number(s.rs[0]),s.recordTotal>0&&(s.pageTotal=Math.ceil(s.recordTotal/s.pageSize),s.pageIndex=Math.min(s.pageIndex,s.pageTotal),s.minRow=s.pageSize*(s.pageIndex-1)+1,s.maxRow=Math.min(s.pageSize*s.pageIndex,s.recordTotal),s.pageSize=s.maxRow-s.minRow+1,s.offset=s.minRow-1,s.sqlSelect=e+" limit "+s.offset+", "+s.pageSize,a={minRow:s.minRow,maxRow:s.maxRow,pageSize:s.pageSize,pageIndex:s.pageIndex,pageTotal:s.pageTotal,rowsTotal:s.recordTotal,result:this._exec(s.sqlSelect,1).toJSON()}),a},SQLite.prototype.createTable=function(e,t){this._checkStatus(),Array.isArray(e)&&(t=e,e=this.tables[0]);var r="create table "+e+"("+t.join()+")";try{this.execute(r),getSchemas(this.engine,this._options.dbPath,!0)}catch(i){throw new Error("Failed to create table ["+e+"]: "+i.message)}},SQLite.prototype.clearTable=function(e){this._checkStatus(),e=e||this.tables[0],this.execute("delete from ["+e+"]"),this.execute("update sqlite_sequence set seq = 0 where name ='"+e+"'"),getSchemas(this.engine,this._options.dbPath,!0)},SQLite.prototype.deleteTable=function(e){this._checkStatus(),e=e||this.tables[0],this.execute("drop table ["+e+"]"),getSchemas(this.engine,this._options.dbPath,!0)},SQLite.prototype.appendFields=function(e,t){this._checkStatus(),Array.isArray(e)&&(t=e,e=this.tables[0]);var r=[];t.forEach(function(t){r.push("alter table ["+e+"] add column "+t)}),r.length&&this.execute(r.join(";")),getSchemas(this.engine,this._options.dbPath,!0)},SQLite.prototype.produceSQL=function(e,t,r,i,s,a){var n,o="",c=", ";switch("[object Object]"===Object.prototype.toString.call(t)&&(a=t.limit,s=t.orders,i=t.where,r=t.fields,t=t.tables),"string"==typeof t&&t.length>0&&(t=[t]),"string"==typeof r&&r.length>0&&(r=[r]),"string"==typeof s&&s.length>0&&(s=[s]),this.tables=t,e){case"select":case"delete":"delete"===e&&"*"===r[0]&&(r=[]),o=e+" "+r.join(c)+" from "+t.join(c),i&&(o+=" where "+i),s&&(o+=" order by "+s.join(c).replace(/\+/g,"asc").replace(/\-/g,"desc")),"number"==typeof a&&(o=o+" limit "+a);break;case"insert":var h=[],u=[];for(var l in r)r.hasOwnProperty(l)&&(h.push(l),n=helper.getType(r[l]),"number"===n?u.push(r[l]):"date"===n?u.push("'"+helper.convertDateTime(r[l])+"'"):"boolean"===n?u.push(r[l]?1:0):"string"===n?u.push("'"+r[l].replace(/'/g,"''")+"'"):u.push("'"+r[l]+"'"));o="insert into "+t.join(c),o+=" ("+h.join(c)+") values ("+u.join(c)+")";break;case"update":var p=[];for(var l in r)r.hasOwnProperty(l)&&(n=helper.getType(r[l]),"number"===n?p.push(l+"="+r[l]):"date"===n?p.push(l+"='"+helper.convertDateTime(r[l])+"'"):"boolean"===n?p.push(l+"="+(r[l]?1:0)):"string"===n?p.push(l+"='"+r[l].replace(/'/g,"''")+"'"):p.push(l+"=''"+r[l]+"'"));o="update "+t.join(c)+" set ",o+=p.join(c),i&&(o+=" where "+i)}return o=o.replace(/\s+/g," "),this.toString=function(){return o},o},SQLite.prototype.getTables=function(e){var t=getSchemas(this.engine,this._options.dbPath);return e?Object.keys(t):t},SQLite.prototype.getFields=function(e){e=e||this.tables[0];var t=getSchemas(this.engine,this._options.dbPath);return t[e]||{}},SQLite.prototype.getVersion=function(){this._checkStatus();var e=this.execute("select sqlite_version(*) as version");return e[0]},SQLite.prototype._checkStatus=function(){if(!this._state)throw new Error("You should connect database first!")},SQLite.prototype.save=function(){var e=this.engine["export"](),t=new Buffer(e);fs.writeFileSync(this._options.dbPath,t)},SQLite.prototype.saveAsync=function(){var e=this.engine["export"](),t=new Buffer(e);fs.writeFile(this._options.dbPath,t)},SQLite.prototype.close=function(){this.save(),this._state=0,this.engine.close()};var schemaCache={},formatCache={};