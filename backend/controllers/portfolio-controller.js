const portfolioService = require("../services/portfolio");
const { generateResponse, parseRequestBody } = require("../utils/common");
const { CONTENT_TYPES } = require("../utils/constant");
const ResponseConfig = require("../utils/responseConfig");
const Portfolio = require('../models/portfolio')

const getPortfolios = async (req, res) => {
  const response = await portfolioService.getPortfolios();

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

const createPortfolio = async (req, res) => {
    const body = await parseRequestBody(req)
    const portfolio = new Portfolio(body)
    const result = await portfolioService.addPortfolios(portfolio);

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

const deletePortfolio = async (req, res, id) => {
  const result = await portfolioService.deletePortfolio(id);

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

const updatePortfolio = async (req, res, id) => {
  const body = await parseRequestBody(req);
  const portfolio = { id, ...body };
  const result = await portfolioService.updatePortfolio(portfolio);

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
    getPortfolios, 
    createPortfolio,
    deletePortfolio,
    updatePortfolio
}