const baseServices = require('./baseService')
const {DATABASE_KEYS, OPERATION_MESSAGES} = require('../utils/constant')
const {SuccessResult, ErrorResult} = require("../utils/result");
const Portfolio = require('../models/portfolio');

const getPortfolios = async () => {
    const data = await baseServices.getGenericTableData(DATABASE_KEYS.PORTFOLIOS)
    return new SuccessResult(null, data)
}

/**
 * 
 * @param {Portfolio} portfolio 
 * @returns 
 */
const addPortfolios = async (portfolio) => {
    
    const addedPortfolio = await baseServices.addModelToTable(DATABASE_KEYS.PORTFOLIOS, portfolio)
    return new SuccessResult(OPERATION_MESSAGES.ADDED, addedPortfolio)
}

const deletePortfolio = async (id) => {
    try {
        await baseServices.deleteModelFromTable(DATABASE_KEYS.PORTFOLIOS, id);
        return new SuccessResult(OPERATION_MESSAGES.DELETED, null);
    } catch (error) {
        return new ErrorResult(OPERATION_MESSAGES.ERROR, error.message);
    }
}

/**
 * 
 * @param {Portfolio} portfolio 
 * @returns 
 */
const updatePortfolio = async (portfolio) => {
    try {
        const updatedPortfolio = await baseServices.updateModel(DATABASE_KEYS.PORTFOLIOS, portfolio);
        return new SuccessResult(OPERATION_MESSAGES.UPDATED, updatedPortfolio);
    } catch (error) {
        return new ErrorResult(OPERATION_MESSAGES.ERROR, error.message);
    }
}


module.exports = {
    getPortfolios,
    addPortfolios,
    deletePortfolio,
    updatePortfolio
}