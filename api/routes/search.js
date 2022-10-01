require('dotenv').config()
const express = require('express')
const router = express.Router()
const axios = require('axios')

router.get('/:search', async (req, res)=> {
    try {
        const {data} = await axios.get(`${process.env.TMDB_API}/search/multi?api_key=${process.env.API_KEY}&language=en-US&query=${req.params.search}&page=1`)
        res.status(200).send(data)
    } catch (error) {
        res.send(error)
    }
})

module.exports = router