const Table = require('./table');

class Config extends Table {
    tableName = 'config';

    async parse(data) {
        if (!data)
            return data;
        if (data !== undefined) {
            switch (data.type) {
                case 'string':
                    return data.string
                case 'number':
                    return parseFloat(data.number)
                case 'boolean':
                    return data.boolean;
                case 'json':
                    return JSON.parse(data.json)

                default:
                    return data;
            }
        }
        return data;
    }

    async convertDataType(type, data) {
        switch (type) {
            case 'string':
                return `${data}`
            case 'number':
                return parseFloat(data)
            case 'boolean':
                return data;
            case 'json':
                return JSON.stringify(data)
        }
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

    async loadConfigInDatabase(fileConfig) {
        if (!fileConfig)
            return false;

        for (var fieldName in fileConfig) {
            var fieldValue = fileConfig[fieldName];

            if (await this.exists({ title: fieldName })) {
                var element = await this.getByTitle(fieldName);

                await this.update({ title: fieldName }, {
                    [element.type]: await this.convertDataType(element.type, fieldValue)
                });

            } else {
                var data = { title: fieldName };

                fieldValueTypeof = typeof fieldValue;
                data.type = fieldValueTypeof;

                if (data.type === 'object') {
                    data.type = 'json';
                    fieldValue = JSON.stringify(fieldValue);
                }

                data[fieldValueTypeof] = fieldValue;

                this.insert(data);
            }
        }

        if (await this.exists({ title: 'configfileLoaded' })) {
            this.update({ title: 'configfileLoaded' }, { boolean: true });
        } else {
            this.insert({
                title: 'configfileLoaded',
                type: 'boolean',
                boolean: true
            });
        }
    }
}

module.exports = Config