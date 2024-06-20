const baseServices = require('./baseService')
const {DATABASE_KEYS, OPERATION_MESSAGES} = require('../utils/constant')
const {SuccessResult, ErrorResult} = require("../utils/result");
const Service = require('../models/service');
const validateService = require('../validations/serviceValidation');

const getServices = async () => {
    const data = await baseServices.getGenericTableData(DATABASE_KEYS.SERVICES)
    return new SuccessResult(null, data)
}

/**
 * 
 * @param {Service} service 
 * @returns 
 */
const addServices = async (service) => {
    // const validationResult = validateService(service)
    // if(!validationResult.success) {
    //     return validationResult
    // }

    const addedService = await baseServices.addModelToTable(DATABASE_KEYS.SERVICES, service)
    return new SuccessResult(OPERATION_MESSAGES.ADDED, addedService)
}

const deleteService = async (id) => {
    try {
        await baseServices.deleteModelFromTable(DATABASE_KEYS.SERVICES, id);
        return new SuccessResult(OPERATION_MESSAGES.DELETED, null);
    } catch (error) {
        return new ErrorResult(OPERATION_MESSAGES.ERROR, error.message);
    }
}

/**
 * 
 * @param {Service} service 
 * @returns 
 */
const updateService = async (service) => {
    try {
        const updatedService = await baseServices.updateModel(DATABASE_KEYS.SERVICES, service);
        return new SuccessResult(OPERATION_MESSAGES.UPDATED, updatedService);
    } catch (error) {
        return new ErrorResult(OPERATION_MESSAGES.ERROR, error.message);
    }
}


module.exports = {
    getServices,
    addServices,
    deleteService,
    updateService
}