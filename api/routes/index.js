const express = require('express')
const router = express.Router()
const movies = require('./movies')
const people = require('./people')
const tvshows = require('./tvshows')
const user = require('./user')
const search = require('./search')
const upload = require('./upload')

router.use('/user', user)
router.use('/tvshows', tvshows)
router.use('/people', people)
router.use('/search', search)
router.use('/movies', movies)
router.use("/upload", upload)

module.exports = router