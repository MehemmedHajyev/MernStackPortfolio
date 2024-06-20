const baseServices = require('./baseService')
const {DATABASE_KEYS, OPERATION_MESSAGES} = require('../utils/constant')
const {SuccessResult, ErrorResult} = require("../utils/result");
const Message = require('../models/message');

const getMessages = async () => {
    const data = await baseServices.getGenericTableData(DATABASE_KEYS.MESSAGES)
    return new SuccessResult(null, data)
}

/**
 * 
 * @param {Message} message 
 * @returns 
 */
const addMessages = async (message) => {
    const addedMessage = await baseServices.addModelToTable(DATABASE_KEYS.MESSAGES, message)
    return new SuccessResult(OPERATION_MESSAGES.ADDED, addedMessage)
}

const deleteMessage = async (id) => {
    try {
        await baseServices.deleteModelFromTable(DATABASE_KEYS.MESSAGES, id);
        return new SuccessResult(OPERATION_MESSAGES.DELETED, null);
    } catch (error) {
        return new ErrorResult(OPERATION_MESSAGES.ERROR, error.message);
    }
}

/**
 * 
 * @param {Message} message 
 * @returns 
 */
const updateMessage = async (message) => {
    try {
        const updatedMessage = await baseServices.updateModel(DATABASE_KEYS.MESSAGES, message);
        return new SuccessResult(OPERATION_MESSAGES.UPDATED, updatedMessage);
    } catch (error) {
        return new ErrorResult(OPERATION_MESSAGES.ERROR, error.message);
    }
}


module.exports = {
    getMessages,
    addMessages,
    deleteMessage,
    updateMessage
}