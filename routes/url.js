const express = require('express');
const
    {
        handlerGetAllShortURL,
        handlerGenerateNewShortURL,
        handlerGetOneAndUpdate,
        handlerGetAnalytics
    } = require('../controllers/url.js');

const router = express.Router();

router.route('/')
    .get(handlerGetAllShortURL)
    .post(handlerGenerateNewShortURL);

router.get('/:shortId', handlerGetOneAndUpdate);

router.get('/analytics/:shortId', handlerGetAnalytics)

module.exports = router;