const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

class Table {
    prisma = prisma;
    constructor() { }

    async create(args) {
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

    async find(where, orderBy = {}) {
        return await prisma[this.tableName].findFirst({
            where: where,
            orderBy
        });
    }

    async getLast(where = {}) {
        return await prisma[this.tableName].findFirst({
            take: 1,
            orderBy: {
                id: 'desc'
            },
            where: where
        })
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

    async deleteAll() {
        return await prisma[this.tableName].deleteMany({})
    }

    async deleteMultiple(where = {}) {
        return await prisma[this.tableName].deleteMany({
            where: where
        })
    }

    async update(where = {}, dataSet = {}) {
        return await prisma[this.tableName].updateMany({
            where: where,
            data: dataSet
        })
    }

    async groupBy(fields = [], where = {}) {
        return await prisma[this.tableName].groupBy({
            by: fields,
            where: where
        })
    }

    async customFunction(funcName) {
        return await prisma[this.tableName][funcName]();
    }
}

module.exports = Table