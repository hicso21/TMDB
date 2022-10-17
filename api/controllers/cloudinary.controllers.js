const Upload = require('../models/Upload');
const cloudinary = require('../lib/cloudinary');

exports.uploadImage = async (req, res) => {
    try {
        const photo = await cloudinary.uploader.upload(req.body.Base64);
        res.send(photo.secure_url)
    } catch (error) {
        console.log(error)
    }
}
