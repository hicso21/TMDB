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

router.get('/search/:search', async (req, res)=> {
    try {
        console.log('entre')
        const movieCredits = await axios.get(`${process.env.TMDB_API}/person/${req.params.search}/movie_credits?api_key=${process.env.API_KEY}&language=en-US`)
        const tvCredits = await axios.get(`${process.env.TMDB_API}/person/${req.params.search}/tv_credits?api_key=${process.env.API_KEY}&language=en-US`)
        const {data} = await axios.get(`${process.env.TMDB_API}/person/${req.params.search}?api_key=${process.env.API_KEY}&language=en-US`)
        data.movieCredits = movieCredits.data
        data.tvCredits = tvCredits.data
        res.status(200).send(data)
    } catch (error) {
        res.send(error)
    }
})

module.exports = router