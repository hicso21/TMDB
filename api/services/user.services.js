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

  static async find(req) {
    const { email } = req.body;
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

  static async addFavorite(id, fav) {
    try {
      return await Users.findByIdAndUpdate(
        id,
        {
          $addToSet: { favorites: fav },
        },
        { new: true, runValidators: true }
      )
    } catch (error) {
      console.log(error.message);
    }
  }

  static async removeFavorite(id, petId) {
    try {
      return await Users.findByIdAndUpdate(
        id,
        {
          $pull: { favorites: petId },
        },
        { new: true, runValidators: true }
      )
    } catch (error) {
      console.log(error.message);
    }
  }
}

module.exports = UserService;
