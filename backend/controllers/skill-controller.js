const skillService = require("../services/skills");
const { generateResponse, parseRequestBody } = require("../utils/common");
const { CONTENT_TYPES } = require("../utils/constant");
const ResponseConfig = require("../utils/responseConfig");
const Skill = require('../models/skill')

const getSkills = async (req, res) => {
  const response = await skillService.getSkills();

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

const createSkill = async (req, res) => {
    const body = await parseRequestBody(req)
    const skill = new Skill(body)
    const result = await skillService.addSkills(skill);

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

const deleteSkill = async (req, res, id) => {
  const result = await skillService.deleteSkill(id);

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

const updateSkill = async (req, res, id) => {
  const body = await parseRequestBody(req);
  const skill = { id, ...body };
  const result = await skillService.updateSkill(skill);

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
    getSkills, 
    createSkill,
    deleteSkill,
    updateSkill
}