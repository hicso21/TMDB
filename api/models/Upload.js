const mongoose =require('mongoose');

const schema = mongoose.Schema;

var uploadSchema = new schema({
    name: String,
    url: String,
    cloudinary_id: String,
    userId: String,
})

const upload = mongoose.model('upload', uploadSchema);
module.exports = upload;