'use strict';

var fs = require('fs');
    
module.exports = function () {
    var _util = {
        save: function (filepath, data, callback) {
            fs.writeFile(filepath, JSON.stringify(data), function (err) {
                if (err) return onErr(err);
                callback();
            });
            return _util;
        },
        
        saveSync: function (filepath, data) {
            fs.writeFileSync(filepath, JSON.stringify(data));
            return _util;
        },
        
        load: function (filepath, callback, encoding) {
            fs.exists(filepath, function (exists) {
                encoding = (encoding) ? encoding : 'utf8';
                if (exists) {
                fs.readFile(filepath, encoding, function (err, data) {
                        if (err) return onErr(err);
                        var parsed;
                        try {
                            parsed = JSON.parse(data);
                        } catch (err) {
                            return onErr('Error parsing JSON: ' + err);
                        }
                        callback(parsed);
                    });     
                } else {
                    throw 'No file found at ' + filepath;
                }
            });
            return _util;
        },
        
        loadSync: function (filepath, encoding) {
            if (fs.existsSync(filepath)) {
                encoding = (encoding) ? encoding : 'utf8';
                var data = fs.readFileSync(filepath, encoding);
                var parsed;
                try {
                    parsed = JSON.parse(data);
                } catch (err) {
                    return onErr('Error parsing JSON: ' + err);
                }
                return parsed;
            }  else {
                throw 'No file found at ' + filepath;
            }
        }
    };
    return _util;
};

function onErr(err) {
	console.log(err);
	return 1;
}