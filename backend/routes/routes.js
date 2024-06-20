const {
  GET_ALL_SERVICES,
  CREATE_SERVICES,
  DELETE_SERVICE,
  UPDATE_SERVICE,
  GET_ALL_SKILLS,
  CREATE_SKILLS,
  DELETE_SKILL,
  UPDATE_SKILL,
  GET_ALL_MESSAGES,
  CREATE_MESSAGES,
  DELETE_MESSAGE,
  UPDATE_MESSAGE,
  GET_ALL_EXPERIENCES,
  CREATE_EXPERIENCES,
  DELETE_EXPERIENCE,
  UPDATE_EXPERIENCE,
  GET_ALL_PORTFOLIOS,
  CREATE_PORTFOLIOS,
  DELETE_PORTFOLIO,
  UPDATE_PORTFOLIO,
} = require("../utils/url-helper");
const serviceController = require("../controllers/service-controller");
const skillController = require("../controllers/skill-controller");
const messageController = require("../controllers/message-controller");
const experienceController = require("../controllers/experience-controller");
const portfolioController = require("../controllers/portfolio-controller");

const Router = require("./router");

const router = new Router();

router.addRoute(GET_ALL_SERVICES, serviceController.getServices);
router.addRoute(CREATE_SERVICES, serviceController.createService);
router.addRoute(DELETE_SERVICE, serviceController.deleteService, true);
router.addRoute(UPDATE_SERVICE, serviceController.updateService, true);

router.addRoute(GET_ALL_SKILLS, skillController.getSkills);
router.addRoute(CREATE_SKILLS, skillController.createSkill);
router.addRoute(DELETE_SKILL, skillController.deleteSkill, true);
router.addRoute(UPDATE_SKILL, skillController.updateSkill, true);

router.addRoute(GET_ALL_MESSAGES, messageController.getMessages);
router.addRoute(CREATE_MESSAGES, messageController.createMessage);
router.addRoute(DELETE_MESSAGE, messageController.deleteMessage, true);
router.addRoute(UPDATE_MESSAGE, messageController.updateMessage, true);

router.addRoute(GET_ALL_EXPERIENCES, experienceController.getExperiences);
router.addRoute(CREATE_EXPERIENCES, experienceController.createExperience);
router.addRoute(DELETE_EXPERIENCE, experienceController.deleteExperience, true);
router.addRoute(UPDATE_EXPERIENCE, experienceController.updateExperience, true);

router.addRoute(GET_ALL_PORTFOLIOS, portfolioController.getPortfolios);
router.addRoute(CREATE_PORTFOLIOS, portfolioController.createPortfolio);
router.addRoute(DELETE_PORTFOLIO, portfolioController.deletePortfolio, true);
router.addRoute(UPDATE_PORTFOLIO, portfolioController.updatePortfolio, true);

module.exports = router.handleRoute.bind(router);