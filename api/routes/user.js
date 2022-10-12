const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controllers");
const { validateAuth } = require("../middlewares/authUser");

router.get("/all", UserController.getAllUsers);

router.post("/signup", UserController.createUser);

router.post("/login", UserController.logIn);

router.get("/me", validateAuth, UserController.getUser);

router.post("/logout", UserController.logOut);

router.put("/resetPassword/:id", UserController.resetPassword);

router.put("/update/:id", UserController.userUpdate);

router.post("/rate/add/:id", UserController.addRating);

router.post("/watched/add/:id",UserController.addWatched);

router.delete("/watched/remove/:id", UserController.removeWatched);

router.post("/watchlist/add/:id",UserController.addWatchlist);

router.delete("/watchlist/remove/:id", UserController.removeWatchlist);

router.post("/favorites/add/:id",UserController.addFavorite);

router.delete("/favorites/remove/:id", UserController.removeFavorite);

router.get("/favorites/:id", UserController.getFavorites);

module.exports = router;
