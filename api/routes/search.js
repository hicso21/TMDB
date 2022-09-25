require('dotenv').config()
const express = require('express')
const router = express.Router()
const axios = require('axios')

router.get('/:search', (req, res)=> {
    try {
        axios
            .get(`${process.env.TMDB_API}/search/multi?api_key=${process.env.API_KEY}&language=en-US&query=${req.params.search}&page=1`)
            .then((resp)=>{
                console.log(resp.data)
                return res.status(200).send(resp.data)
            })
            .catch(err=>{console.log(err)})
    } catch (error) {
        console.log(error.message)
    }
})

module.exports = router