require('dotenv').config()
const express = require("express")
const router = express.Router()
const axios = require('axios')

router.get('/getPopular', async (req, res)=> {
    try {
        const {data} = await axios.get(`${process.env.TMDB_API}/tv/popular?api_key=${process.env.API_KEY}&language=en-US&page=1`)
        res.status(200).send(data)
    } catch (error) {
        res.send(error.message)
    }
})


router.get('/getAiringToday', async (req, res)=> {
    try {
        const {data} = await axios.get(`${process.env.TMDB_API}/tv/airing_today?api_key=${process.env.API_KEY}&language=en-US&page=1`)
        res.status(200).send(data)
    } catch (error) {
        res.send(error.message)
    }
})

router.get('/getTopRated', async (req, res)=> {
    try {
        const {data} = await axios.get(`${process.env.TMDB_API}/tv/top_rated?api_key=${process.env.API_KEY}&language=en-US&page=1`)
        res.status(200).send(data)
    } catch (error) {
        res.send(error.message)
    }
})

router.get('/getOnTV', async (req, res)=> {
    try {
        const {data} = await axios.get(`${process.env.TMDB_API}/tv/on_the_air?api_key=${process.env.API_KEY}&language=en-US&page=1`)
        res.status(200).send(data)
    } catch (error) {
        res.send(error.message)
    }
})

router.get('/getByGender', async (req, res)=> {
    try {
        const {data} = await axios.get(`${process.env.TMDB_API}/gender/tv/list?api_key=${process.env.API_KEY}&language=en-US&page=1`)
        res.status(200).send(data)
    } catch (error) {
        res.send(error)
    }
})

router.get('/getOneTvshow/:tvshowId', async (req, res)=> {
    try {
        const show = await axios.get(`${process.env.TMDB_API}/tv/${req.params.tvshowId}?api_key=${process.env.API_KEY}&language=en-US`)
        const {data} = await axios.get(`${process.env.TMDB_API}/tv/${req.params.tvshowId}/aggregate_credits?api_key=${process.env.API_KEY}&language=en-US`)
        show.data.aggregate_credits = data
        res.status(200).send(show.data)
    } catch (error) {
        res.send(error)
    }
})

router.get('/tvshow/:search', async (req, res)=> {
    try {
        const {data} = await axios.get(`${process.env.TMDB_API}/search/tv?api_key=${process.env.API_KEY}&language=en-US&query=${req.params.search}&page=1`)
        res.status(200).send(data)
    } catch (error) {
        res.send(error.message)
    }
})

module.exports = router