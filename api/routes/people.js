require('dotenv').config()
const express = require("express");
const router = express.Router();
const axios = require('axios')

router.get('/getPopular/:page', async (req, res)=> {
    console.log(req.params.page)
    try {
        const {data} = await axios.get(`${process.env.TMDB_API}/person/popular?api_key=${process.env.API_KEY}&language=en-US&page=${req.params.page}`)
        res.status(200).send(data)
    } catch (error) {
        res.send(error)
    }
})

router.get('/people/:search', async (req, res)=> {
    try {
        const {data} = await axios.get(`${process.env.TMDB_API}/search/person?api_key=${process.env.API_KEY}&language=en-US&query=${req.params.search}&page=1`)
        res.status(200).send(data)
    } catch (error) {
        res.send(error)
    }
})

module.exports = router