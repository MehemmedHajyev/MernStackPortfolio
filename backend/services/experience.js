const baseServices = require('./baseService')
const {DATABASE_KEYS, OPERATION_MESSAGES} = require('../utils/constant')
const {SuccessResult, ErrorResult} = require("../utils/result");
const Experience = require('../models/experience');

const getExperiences = async () => {
    const data = await baseServices.getGenericTableData(DATABASE_KEYS.EXPERIENCES)
    return new SuccessResult(null, data)
}

/**
 * 
 * @param {Experience} experience 
 * @returns 
 */
const addExperiences = async (experience) => {
    
    const addedExperience = await baseServices.addModelToTable(DATABASE_KEYS.EXPERIENCES, experience)
    return new SuccessResult(OPERATION_MESSAGES.ADDED, addedExperience)
}

const deleteExperience = async (id) => {
    try {
        await baseServices.deleteModelFromTable(DATABASE_KEYS.EXPERIENCES, id);
        return new SuccessResult(OPERATION_MESSAGES.DELETED, null);
    } catch (error) {
        return new ErrorResult(OPERATION_MESSAGES.ERROR, error.message);
    }
}

/**
 * 
 * @param {Experience} experience 
 * @returns 
 */
const updateExperience = async (experience) => {
    try {
        const updatedExperience = await baseServices.updateModel(DATABASE_KEYS.EXPERIENCES, experience);
        return new SuccessResult(OPERATION_MESSAGES.UPDATED, updatedExperience);
    } catch (error) {
        return new ErrorResult(OPERATION_MESSAGES.ERROR, error.message);
    }
}


module.exports = {
    getExperiences,
    addExperiences,
    deleteExperience,
    updateExperience
}