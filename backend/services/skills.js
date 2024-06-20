const baseServices = require('./baseService')
const {DATABASE_KEYS, OPERATION_MESSAGES} = require('../utils/constant')
const {SuccessResult, ErrorResult} = require("../utils/result");
const Skill = require('../models/skill');
const validateSkill = require('../validations/skillValidation');

const getSkills = async () => {
    const data = await baseServices.getGenericTableData(DATABASE_KEYS.SKILLS)
    return new SuccessResult(null, data)
}

/**
 * 
 * @param {Skill} skill 
 * @returns 
 */
const addSkills = async (skill) => {
    // const validationResult = validateSkill(skill)
    // if(!validationResult.success) {
    //     return validationResult
    // }
    const addedSkill = await baseServices.addModelToTable(DATABASE_KEYS.SKILLS, skill)
    return new SuccessResult(OPERATION_MESSAGES.ADDED, addedSkill)
}

const deleteSkill = async (id) => {
    try {
        await baseServices.deleteModelFromTable(DATABASE_KEYS.SKILLS, id);
        return new SuccessResult(OPERATION_MESSAGES.DELETED, null);
    } catch (error) {
        return new ErrorResult(OPERATION_MESSAGES.ERROR, error.message);
    }
}

/**
 * 
 * @param {Skill} skill 
 * @returns 
 */
const updateSkill = async (skill) => {
    try {
        const updatedSkill = await baseServices.updateModel(DATABASE_KEYS.SKILLS, skill);
        return new SuccessResult(OPERATION_MESSAGES.UPDATED, updatedSkill);
    } catch (error) {
        return new ErrorResult(OPERATION_MESSAGES.ERROR, error.message);
    }
}


module.exports = {
    getSkills,
    addSkills,
    deleteSkill,
    updateSkill
}