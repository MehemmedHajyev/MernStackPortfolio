const { resultExecutionHelper } = require('../utils/common')
const {ErrorResult, SuccessResult} = require('../utils/result')

const validateSkill = (skill) => {
    const validationResult = resultExecutionHelper(checkNameNull(skill))
    return validationResult
}

const checkNameNull = (skill) => {
    if(skill.name === '') {
        return new ErrorResult("Name cannot be empty")
    }

    return new SuccessResult()
}

module.exports = validateSkill