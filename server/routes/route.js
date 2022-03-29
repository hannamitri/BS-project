var express = require("express");
var router = express.Router();

var UsersController = require("../controller/UsersController");
var TicketsController = require("../controller/TicketsController");
var CountryController = require("../controller/CountryController");
var FlightsController = require("../controller/FlightsController");
var SurveyController = require("../controller/SurveyController");
var DataCollectedController = require("../controller/DataCollectedController");

/**
 * User Routes
 */
router.post("/updateUser", UsersController.updateUser);
router.post("/insertUser", UsersController.insertUser);
router.post("/deleteUser", UsersController.deleteUser);
router.post("/getUserByName", UsersController.getUserByName);
router.get("/getAll", UsersController.getAll);

router.post(
  "/insertDataCollected",
  DataCollectedController.insertDataCollected
);

router.get("/getDataCollected", DataCollectedController.getDataCollected);

/**
 * Tickets Routes
 */

router.get("/getTickets", TicketsController.getTickets);
router.post("/updateTickets", TicketsController.updateTicket);
router.post("/deleteTickets", TicketsController.deleteTicket);
router.post("/fetchRefData", TicketsController.fetchRefData);

/**
 * Country Routes
 */

router.get("/getCountry", CountryController.getCountry);
router.post("/updateCountry", CountryController.updateCountry);
router.post("/deleteCountry", CountryController.deleteCountry);
router.post("/getCountrybyCategory", CountryController.getCountrybyCategory);

/**
 * FlighstRoutes
 */
router.post("/insertFlight", FlightsController.insertFlight);

/**
 * Survey Routes
 */
router.post("/fetchOptions", SurveyController.fetchOptions);
router.post("/insertResults", SurveyController.insertResults);

module.exports = router;
