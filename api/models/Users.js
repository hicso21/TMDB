const mongoose = require("mongoose");
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
  name: String,
  last_name: String,
  gender: String,
  email: { type: String, required: true },
  password: {type: String,required: true},
  profile_picture: String,
  age: String,
  favorites: Array,
  watched: Array,
  to_watch: Array,
  rating:Array,
  adult: Boolean,
  salt: String,
  since: String,
});

UserSchema.pre('save', async function () {
  this.since = new Date()
  this.salt = bcrypt.genSaltSync()
  return (this.password = await bcrypt.hash(this.password, this.salt))
})

const Users = mongoose.model("User", UserSchema);

module.exports = Users;