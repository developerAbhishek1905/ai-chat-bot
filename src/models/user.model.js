const mongoose = require("mongoose");


const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  fullname: {
    firstname: {
      type: String,
      required: true,
    },

    lastname: {
      type: String,
      required: true,
    },
  },
  password: {
    type: String,
  },
});
{
  timestamps: true;
}

const authModel = mongoose.model("auth", userSchema);

module.exports = authModel;
