require('dotenv').config()
const express = require("express")
const router = express.Router()
const axios = require('axios')

router.get('/getPopular', async (req, res)=> {
    try {
        const {data} = await axios.get(`${process.env.TMDB_API}/movie/popular?api_key=${process.env.API_KEY}&language=en-US&page=1`)
        res.status(200).send(data)
    } catch (error) {
        res.send(error)
    }
})

router.get('/getLatest', async (req, res)=> {
    try {
        const {data} = await axios.get(`${process.env.TMDB_API}/movie/latest?api_key=${process.env.API_KEY}&language=en-US&page=1`)
        res.status(200).send(data)
    } catch (error) {
        res.send(error)
    }
})

router.get('/getByGender', async (req, res)=> {
    try {
        const {data} = await axios.get(`${process.env.TMDB_API}/gender/movie/list?api_key=${process.env.API_KEY}&language=en-US&page=1`)
        res.status(200).send(data)
    } catch (error) {
        res.send(error)
    }
})

router.get('/getOneMovie/:movieId', async (req, res)=> {
    try {
        const {data} = await axios.get(`${process.env.TMDB_API}/movie/${req.params.movieId}?api_key=${process.env.API_KEY}&language=en-US&page=1`)
        res.status(200).send(data)
    } catch (error) {
        res.send(error)
    }
})

router.get('/movie/:search', async (req, res)=> {
    try {
        const {data} = await axios.get(`${process.env.TMDB_API}/search/movie?api_key=${process.env.API_KEY}&language=en-US&query=${req.params.search}&page=1`)
        res.status(200).send(data)
    } catch (error) {
        res.send(error.message)
    }
})

module.exports = router