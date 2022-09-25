require('dotenv').config()
const express = require("express");
const router = express.Router();
const axios = require('axios')

router.get('/getPopular', (req, res)=> {
    try {
        axios
            .get(`${process.env.TMDB_API}/person/popular?api_key=${process.env.API_KEY}&language=en-US&page=1`)
            .then((resp)=>{
                console.log(resp.data)
                return res.status(200).send(resp.data)
            })
            .catch(err=>{console.log(err)})
    } catch (error) {
        console.log(error.message)
    }
})

router.get('/getLatest', (req, res)=> {
    try {
        axios
            .get(`${process.env.TMDB_API}/person/latest?api_key=${process.env.API_KEY}&language=en-US&page=1`)
            .then((resp)=>{
                console.log(resp.data)
                return res.status(200).send(resp.data)
            })
            .catch(err=>{console.log(err)})
    } catch (error) {
        console.log(error.message)
    }
})

router.get('/people/:search', (req, res)=> {
    try {
        axios
            .get(`${process.env.TMDB_API}/search/person?api_key=${process.env.API_KEY}&language=en-US&query=${req.params.search}&page=1`)
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