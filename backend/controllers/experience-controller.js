const experienceService = require("../services/experience");
const { generateResponse, parseRequestBody } = require("../utils/common");
const { CONTENT_TYPES } = require("../utils/constant");
const ResponseConfig = require("../utils/responseConfig");
const Experience = require('../models/experience')

const getExperiences = async (req, res) => {
  const response = await experienceService.getExperiences();

  generateResponse(
    new ResponseConfig(
      200,
      req,
      res,
      CONTENT_TYPES[".json"],
      JSON.stringify(response)
    )
  );
};

const createExperience = async (req, res) => {
    const body = await parseRequestBody(req)
    const experience = new Experience(body)
    const result = await experienceService.addExperiences(experience);

    generateResponse(
        new ResponseConfig(
          201,
          req,
          res,
          CONTENT_TYPES[".json"],
          JSON.stringify(result)
        )
      );
}

const deleteExperience = async (req, res, id) => {
  const result = await experienceService.deleteExperience(id);

  generateResponse(
      new ResponseConfig(
        result.success ? 200 : 400,
        req,
        res,
        CONTENT_TYPES[".json"],
        JSON.stringify(result)
      )
    );
}

const updateExperience = async (req, res, id) => {
  const body = await parseRequestBody(req);
  const experience = { id, ...body };
  const result = await experienceService.updateExperience(experience);

  generateResponse(
      new ResponseConfig(
        result.success ? 200 : 400,
        req,
        res,
        CONTENT_TYPES[".json"],
        JSON.stringify(result)
      )
    );
}

module.exports = {
    getExperiences, 
    createExperience,
    deleteExperience,
    updateExperience
}