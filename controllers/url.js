const URL = require('../models/url.js');

async function handlerGetAllShortURL(req, res) {
    const allDBUrls = await URL.find({});
    return res.json(allDBUrls);
}

async function handlerGenerateNewShortURL(req, res) {
    const body = req.body;
    if (!body.url) {
        return res.status(400).json({ error: 'URL is required' });
    }
    // try {
        const data = await URL.create({
            redirectUrl: body.url,
            visitHistory: [],
            createdBy: req.user._id,
        });
        return res.render("home", {
            id: data.shortId,
        });
    // } catch (error) {
    //     console.error('Error creating short URL:', error);
    //     return res.status(500).json({ error: 'Internal server error' });
    // }
}

async function handlerGetOneAndUpdate(req, res) {
    // try {
        const { shortId } = req.params.shortId;
        // console.log(shortId);
        const entry = await URL.findOneAndUpdate(
            { shortId, }, { $push: { visitHistory: { timestamp: Date.now()   },   },  }
        );
        if (!entry) {
            return res.status(404).json({ error: 'Entry not found' });
        }
        res.redirect(entry.redirectUrl);
   
    // } catch (error) {
    //     console.error('Error while updating and redirecting:', error);
    //     res.status(500).json({ error: 'Internal server error' });
    // }
}



async function handlerGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });
    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory,
    });
}

module.exports = {
    handlerGetAllShortURL,
    handlerGenerateNewShortURL,
    handlerGetOneAndUpdate,
    handlerGetAnalytics
};
