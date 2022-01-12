const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

class Table {
    constructor() { }

    async create(args) {
        console.log('args', args)
        return await prisma[this.tableName].create(args)
    }

    async getList() {
        return prisma[this.tableName].findMany();
    }

    async get(id) {
        return await prisma[this.tableName].findFirst({
            where: {
                id: parseInt(id)
            }
        });
    }

    async find(where) {
        return await prisma[this.tableName].findFirst({
            where: where
        });
    }

    async getLast() {
        var all = await this.getList();
        return all[0];
    }

    async exists(where = {}) {
        var display = await prisma[this.tableName].findFirst({ where: where });
        return display === null ? false : true;
    }

    async setField(id, field, value) {
        return await prisma[this.tableName].updateMany({
            where: {
                id: parseInt(id)
            },
            data: {
                [field]: value
            }
        })
    }

    async deleteAll(where = {}, dataSet = {}) {
        return await prisma[this.tableName].deleteMany({
            where: where,
        })
    }
}

module.exports = Table