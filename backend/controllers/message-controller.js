const messageService = require("../services/messages");
const { generateResponse, parseRequestBody } = require("../utils/common");
const { CONTENT_TYPES } = require("../utils/constant");
const ResponseConfig = require("../utils/responseConfig");
const Message = require('../models/message')

const getMessages = async (req, res) => {
  const response = await messageService.getMessages();

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

const createMessage = async (req, res) => {
    const body = await parseRequestBody(req)
    const message = new Message(body)
    const result = await messageService.addMessages(message);

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

const deleteMessage = async (req, res, id) => {
  const result = await messageService.deleteMessage(id);

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

const updateMessage = async (req, res, id) => {
  const body = await parseRequestBody(req);
  const message = { id, ...body };
  const result = await messageService.updateMessage(message);

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
    getMessages, 
    createMessage,
    deleteMessage,
    updateMessage
}