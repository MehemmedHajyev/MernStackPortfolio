const { resultExecutionHelper } = require('../utils/common')
const {ErrorResult, SuccessResult} = require('../utils/result')

const validateService = (service) => {
    const validationResult = resultExecutionHelper(checkNameNull(service))
    return validationResult
}

const checkNameNull = (service) => {
    if(service.name === '') {
        return new ErrorResult("Name cannot be empty")
    }

    return new SuccessResult()
}

module.exports = validateService