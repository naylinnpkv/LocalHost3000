const express = require("express");
const userController = require("../Controllers/userController");
const router = express.Router();

router.get("/", (req, res) =>
  res.status(200).json({
    message: "HI",
  })
);

//client -> post request to server
//userController.createUser - middleware that "posts"/inserts new user into user_info table
//responds with -> status/error

// Use the express.Router class to create modular, mountable route handlers.
// A Router instance is a complete middleware and routing system;
// for this reason, it is often referred to as a “mini-app”.

router.post(
  "/register",
  userController.createUser,
  userController.login,
  (req, res) => {
    console.log("Successful post to database (/register route). ");
    console.log(res.locals.user);
    return res.status(200).json(res.locals.user);
  }
);

router.post("/login", userController.login, (req, res) => {
  console.log("Successful post to database (/login route).");
  return res.status(200).json(res.locals.user);
});

router.get("/users/:home", userController.findUsers, (req, res) => {
  console.log("Successful get to the database (/users route");
  return res.status(200).json(res.locals.searchResults);
});

/*
  Profile Routers
*/
//localhost:8080/api/profile/:id
router.get("/profile/:id", userController.getProfile, (req, res) => {
  console.log("Successful get to database (/profile:id route).");
  return res.status(200).json(res.locals.user);
});

router.delete("/profile/:id", userController.deleteProfile, (req, res) => {
  console.log("Successful delete of profile");
  return res.status(200).json({
    message: "PROFILE DELETED",
  });
});

//patch, localhost:8080/api/profile/:id
//req -> Server is eceiving: {profilepic: <url link>}
//want to store this to the database.
//res -> Do not need to send anything back to the front end.
// router.patch("/profile/:id", userController.patchProfile, (req, res) => {
//   console.log("Successfully patched");
//   return res.status(200).json({
//     message: "PROFILE PIC POSTED",
//   });
// });

router.put("/profile/:id", userController.updateProfile, (req, res) => {
  console.log("Successful update of profile");
  return res.status(200).json(res.locals.user);
});

module.exports = router;
