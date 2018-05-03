const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Define our mongoose model
const barSchema = new Schema({
  id: String, // id denotes the particular bar
  totalUsers: Number, // how many users are going
  users: [Schema.Types.ObjectId] // user _ids
});


// Create the model class
const ModelClass = mongoose.model('bar', barSchema);


// Export the model
module.exports = ModelClass;

