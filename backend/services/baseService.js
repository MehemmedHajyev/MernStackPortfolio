const fs = require('fs')
const util = require('util')
const getRootPath = require('../utils/rootPath')
const {generateUniqueId} = require("../utils/common");

const readFileAsync = util.promisify(fs.readFile)
const writeFileAsync = util.promisify(fs.writeFile)

const DB_PATH = `${getRootPath}database/db.json`

const readAllJsonFromText = async () => {
    const text = await readFileAsync(DB_PATH)
    return JSON.parse(text)
}

const getGenericTableData = async (tableKey) => {
    const data = await readAllJsonFromText();
    return data[tableKey]
}

const addModelToTable = async (tableKey, model) => {
    const data = await readAllJsonFromText();
    const modelAdding = { id:generateUniqueId(data[tableKey]), ...model }
    data[tableKey].push(modelAdding)
    await writeFileAsync(DB_PATH, JSON.stringify(data, null, 2))
    return modelAdding
}

const deleteModelFromTable = async (tableKey, id) => {
    const data = await readAllJsonFromText();
    data[tableKey] = data[tableKey].filter((item) => item.id !== id)
    await writeFileAsync(DB_PATH, JSON.stringify(data, null, 2))
}

const updateModel = async (tableKey, model) => {
    const data = await readAllJsonFromText();
    const index = data[tableKey].findIndex(item => item.id === model.id);
    if (index === -1) {
        throw new Error(`Model with id ${model.id} not found`);
    }
    data[tableKey][index] = { ...data[tableKey][index], ...model };
    await writeFileAsync(DB_PATH, JSON.stringify(data, null, 2));
    return data[tableKey][index];
}

module.exports = {
    getGenericTableData,
    addModelToTable,
    deleteModelFromTable,
    updateModel
}