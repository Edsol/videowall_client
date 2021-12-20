var re = {
    primary: /(\S+) connected (\S+) (?:(\d+)x(\d+)\+(\d+)\+(\d))/,
    secondary: /(\S+) connected (?:(\d+)x(\d+)\+(\d+)\+(\d))/,
    disconnected: /^(\S+) disconnected/,
    mode: /^\s+(\d+)x([0-9i]+)\s+((?:\d+\.)?\d+)([* ]?)([+ ]?)/
};



module.exports = function (src) {
    var lines = src.split('\n');
    var query = {};
    var index = 0;
    var last = null;

    lines.forEach(function (line) {
        var m;
        if (m = re.primary.exec(line)) {
            query[m[1]] = {
                connected: true,
                primary: true,
                index: index++
            };
            if (m[3] && m[4]) {
                query[m[1]].width = parseInt(m[3]);
                query[m[1]].height = parseInt(m[4]);
            }
            if (m[5] && m[6]) {
                query[m[1]].left = parseInt(m[5]);
                query[m[1]].top = parseInt(m[6]);
            }
            last = m[1];
        }
        else if (m = re.secondary.exec(line)) {
            query[m[1]] = {
                primary: false,
                connected: true,
                index: index++
            };
            if (m[2] && m[3]) {
                query[m[1]].width = parseInt(m[2]);
                query[m[1]].height = parseInt(m[3]);
            }
            if (m[4] && m[5]) {
                query[m[1]].left = parseInt(m[4]);
                query[m[1]].top = parseInt(m[5]);
            }

            last = m[1];
        }
        else if (m = re.disconnected.exec(line)) {
            query[m[1]] = {
                connected: false,
                index: index++
            };
            last = m[1];
        }
        else {
            last = null;
        }
    });
    return query;
};