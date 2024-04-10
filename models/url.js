const mongoose = require('mongoose');
const shortId = require('shortid');

const urlSchema = new mongoose.Schema({
    shortId: { type: String, required: true, unique: true, default: shortId.generate },
    redirectUrl: { type: String, required: true },
    // clicks: { type: Number, required: true, default: 0 },
    visitHistory: [{ timestamp: { type: Number } }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },

},
    { timestamps: true },
);


module.exports = mongoose.model('url', urlSchema);

