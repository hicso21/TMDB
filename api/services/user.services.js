const Users = require("../models/Users");

class UserService {
  static async getAllUsers() {
    try {
      return await Users.find({});
    } catch (error) {
      console.log(error.message);
    }
  }

  static async createUser(body) {
    try {
      const user = new Users(body);
      return await user.save();
    } catch (error) {
      console.log(error.message);
    }
  }

  static async googleUser(body){
    try {
      const googleUser = await Users.findOne({email: body.email})
      console.log(googleUser)
      if(!googleUser.email) {
        const newGoogleUser = new Users(body);
        return await newGoogleUser
      }else return googleUser
    }catch (error) {
      console.log(error.message);
    }
  }

  static async find(body) {
    const { email } = body;
    try {
      return await Users.findOne({ email: email, status: true });
    } catch (error) {
      console.log(error.message);
    }
  }

  static async getUser(id) {
    try {
      return await Users.findOne({ _id: id });
    } catch (error) {
      console.log(error.message);
    }
  }

  static async addRating(id, item) {
    try {
      return await Users.findByIdAndUpdate(
        id,
        {
          $addToSet: { rating: item },
        },
        { new: true, runValidators: true }
      )
    } catch (error) {
      console.log(error.message)
    }
  }

  static async addWatchlist(id, item){
    try {
      return await Users.findByIdAndUpdate(
        id,
        {
          $addToSet: { to_watch: item },
        },
        { new: true, runValidators: true }
      )
    } catch (error) {
      console.log(error.message);
    }
  }

  static async removeWatchlist(id, item){
    try {
      return await Users.findByIdAndUpdate(
        id,
        {
          $pull: { to_watch: item },
        },
        { new: true, runValidators: true }
      )
    } catch (error) {
      console.log(error.message);
    }
  }

  static async addWatched(id, item){
    try {
      return await Users.findByIdAndUpdate(
        id,
        {
          $addToSet: { watched: item },
        },
        { new: true, runValidators: true }
      )
    } catch (error) {
      console.log(error.message);
    }
  }

  static async removeWatched(id, item){
    try {
      return await Users.findByIdAndUpdate(
        id,
        {
          $pull: { watched: item },
        },
        { new: true, runValidators: true }
      )
    } catch (error) {
      console.log(error.message);
    }
  }

  static async addFavorite(id, item) {
    try {
      return await Users.findByIdAndUpdate(
        id,
        {
          $addToSet: { favorites: item },
        },
        { new: true, runValidators: true }
      )
    } catch (error) {
      console.log(error.message);
    }
  }

  static async removeFavorite(id, item) {
    try {
      return await Users.findByIdAndUpdate(
        id,
        {
          $pull: { favorites: item },
        },
        { new: true, runValidators: true }
      )
    } catch (error) {
      console.log(error.message);
    }
  }
}

module.exports = UserService;
