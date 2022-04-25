var express = require("express");
var router = express.Router();

var UsersController = require("../controller/UsersController");
var ProjectController = require("../controller/ProjectsController");
var DataCollectedController = require("../controller/DataCollectedController");
var DataProjectsController = require("../controller/DataCollected_belongs_Projects_Controller");
var UserDataController = require("../controller/Users_uploads_DataCollected_Controller");
var UserProjectController = require("../controller/Users_manages_Projects_Controller");
var SupabaseController = require("../controller/SupabaseController");

var GoogleAuthController = require("../controller/GoogleAuthController ");

/**
 * User Routes
 */
router.post("/updateUser", UsersController.updateUser);
router.post("/insertUser", UsersController.insertUser);
router.post("/deleteUser", UsersController.deleteUser);
router.post("/getUserByEmail", UsersController.getUserByEmail);
router.get("/getAll", UsersController.getAll);
router.get("/getSystemUsers", UsersController.getSystemUsers);
router.post("/setProfile", UsersController.setProfile);

/*
 * Data Collected Routes
*/
router.get("/getDataCollected", DataCollectedController.getDataCollected);
router.post(
  "/updateDataCollected",
  DataCollectedController.updateDataCollected,
);
router.post(
  "/deleteDataCollected",
  DataCollectedController.deleteDataCollected,
);
router.post(
  "/insertDataCollected",
  DataCollectedController.insertDataCollected,
);
router.post("/getDataBetweenDates", DataCollectedController.getDataBetweenDates)
router.post("/getDataCollectedByUser", DataCollectedController.getDataCollectedByUser);

/*
 * Projects Routes
 */
router.post("/insertProject", ProjectController.insertProject);
router.get("/getAllProjects", ProjectController.getAll);
router.post("/deleteProject", ProjectController.deleteProject);
router.post("/getProjectId", ProjectController.getProjectId);
router.post("/updateProject", ProjectController.updateProject);
router.post("/getProjectsBetweenDates", ProjectController.getProjectsBetweenDates);


/**
 * Google Routes
 */
router.post("/googlelogin", GoogleAuthController.googlelogin);


/**
 * Supabase Routes
 */
router.post("/isProfessional", SupabaseController.isHeAuth);


/*
 * User-manages-projects
*/
router.post("/insertUsersProjects", UserProjectController.insert_Users_Projects);
router.post("/getUsersbyProject", UserProjectController.getUsersbyProject);
router.post("/getProjectsByUser", UserProjectController.getProjectsByUser)
router.post("/removeUserFromProject", UserProjectController.removeUserFromProject)

/**
 * DataProjectsController
*/
router.post("/getProjectData", DataProjectsController.getProjectData);

/**
 *UserDataController 
*/
router.post("/getDataCollectedbyUsers", UserDataController.getDataCollectedbyUsers);

module.exports = router;
