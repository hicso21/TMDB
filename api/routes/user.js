const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controllers");
const { validateAuth } = require("../middlewares/authUser");

router.get("/all", UserController.getAllUsers);

router.post("/signup", UserController.createUser);

router.post("/login", UserController.logIn);

router.get("/me", validateAuth, (req, res) => { res.send(req.user) });

router.post("/logout", UserController.logOut);

router.put("/resetPassword/:id", UserController.resetPassword);

router.put("/update/:id", UserController.userUpdate);

router.put("/favorites/add/:id", UserController.addFavorite);

router.put("/favorites/remove/:id", UserController.removeFavorite);

router.get("/favorites/:id", UserController.getFavorites);

module.exports = router;
