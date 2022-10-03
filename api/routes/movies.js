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

router.get('/getNowPlaying', async (req, res)=> {
    try {
        const {data} = await axios.get(`${process.env.TMDB_API}/movie/now_playing?api_key=${process.env.API_KEY}&language=en-US&page=1`)
        res.status(200).send(data)
    } catch (error) {
        res.send(error)
    }
})

router.get('/getTopRated', async (req, res)=> {
    try {
        const {data} = await axios.get(`${process.env.TMDB_API}/movie/top_rated?api_key=${process.env.API_KEY}&language=en-US&page=1`)
        res.status(200).send(data)
    } catch (error) {
        res.send(error)
    }
})

router.get('/getUpcoming', async (req, res)=> {
    try {
        const {data} = await axios.get(`${process.env.TMDB_API}/movie/upcoming?api_key=${process.env.API_KEY}&language=en-US&page=1`)
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
        const movie = await axios.get(`${process.env.TMDB_API}/movie/${req.params.movieId}?api_key=${process.env.API_KEY}&language=en-US`)
        const {data} = await axios.get(`${process.env.TMDB_API}/movie/${req.params.movieId}/credits?api_key=${process.env.API_KEY}&language=en-US`)
        movie.data.aggregate_credits = data
        console.log(movie.data)
        res.status(200).send(movie.data)
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