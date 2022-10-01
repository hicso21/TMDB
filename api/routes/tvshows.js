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

router.get('/getLatest', async (req, res)=> {
    try {
        const {data} = await axios.get(`${process.env.TMDB_API}/tv/latest?api_key=${process.env.API_KEY}&language=en-US&page=1`)
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
        const {data} = await axios.get(`${process.env.TMDB_API}/tv/${req.params.tvshowId}?api_key=${process.env.API_KEY}&language=en-US&page=1`)
        res.status(200).send(data)
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