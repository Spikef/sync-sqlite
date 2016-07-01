var helper = {};

/**
 * 获取对象类型：undefined, null, string, number, array, boolean, date, error, function, math, object, regexp.
 * @param obj
 * @returns {string}
 */
helper.getType = function(obj) {
    var type = obj === null ? 'null' : typeof obj;
    if (type === 'object') {
        type = Object.prototype.toString.call(obj); // [object Array];
        type = type.replace(/(\[object )|]/g, '').toLowerCase();
    }

    return type;
};

/**
 * 将日期时间转为mysql/mssql能够识别的格式
 * @param date: 传入日期时间
 * @returns {string}
 */
helper.convertDateTime = function(date) {
    var timeString;
    timeString = date.getFullYear() + '-' +
        ('00' + (date.getMonth()+1)).slice(-2) + '-' +
        ('00' + date.getDate()).slice(-2) + ' ' +
        ('00' + date.getHours()).slice(-2) + ':' +
        ('00' + date.getMinutes()).slice(-2) + ':' +
        ('00' + date.getSeconds()).slice(-2);

    return timeString;
};

/**
 * Unix时间戳与JS时间戳互相转换。
 * @param stamp
 * @param isUnix
 * @returns {number}
 */
helper.convertTimeStamp = function(stamp, isUnix) {
    if ( isUnix ) {
        return new Date(stamp * 1000).getTime();
    } else {
        return Math.round(new Date(stamp).getTime() / 1000);
    }
};

module.exports = helper;