const express = require("express");
const router = express.Router();
const uploadController = require('../controllers/cloudinary.controllers');

const storage =require('../lib/multer');

router.post('/', storage.single('file'), uploadController.uploadImage);

module.exports = router;