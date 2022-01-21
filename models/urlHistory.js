const Table = require('./table');

class urlHistory extends Table {
    tableName = 'urlHistory';

    async insert(data) {
        return await this.create({
            data: data
        })
    }

    async setClosedByPid(pid, value) {
        return await this.update({
            pid: pid
        }, {
            closed: value
        })
    }
}

module.exports = urlHistory