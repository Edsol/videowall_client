const Table = require('./table');

class Config extends Table {
    tableName = 'config';

    async parse(data) {
        if (data.id) {
            switch (data.type) {
                case 'string':
                    return data.string
                case 'number':
                    return parseFloat(data.number)
                case 'json':
                    return JSON.parse(data.json)

                default:
                    return data;
            }
        }
        return data;
    }

    async insert(data) {
        return await this.create({
            data: data
        });
    }

    async getByTitle(title, parse = false) {
        var data = await this.find({
            title: title
        });

        if (parse === false) {
            return data;
        }
        return await this.parse(data);
    }

    async getAll() {
        var data = await this.getList();
        var response = {};
        for (var element of data) {
            response[element.title] = await this.parse(element);
        }
        return response;
    }

    async replace(title, value) {
        var element = await this.getByTitle(title);
        if (element.id !== undefined) {
            await this.setField(element.id, element.type, value);
        }
    }
}

module.exports = Config