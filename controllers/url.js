const url = require('../models/url');
const shortid = require('shortid');

async function handleGenerateNewShortURL(req, res){
    const body = req.body;
    if(!body.url) return res.json({err : "url is required"});

    const shortId = shortid();
    const isExist = await url.find({createdBy : req.user._id, redirectURL : body.url});
    // console.log(shortId, "  here : ", isExist);
    if(isExist.length != 0){
        return res.render('home', {duplicate : true, url : body.url});
    }
    // console.log(shortId);
    await url.create({
        shortId : shortId,
        redirectURL : body.url,
        visitHistory : [],
        createdBy: req.user._id
    });
    return res.render('home', {id : shortId});
}

async function handleRedirect(req, res){
    const shortId = req.params.shortId;
    const result = await url.findOneAndUpdate({shortId},
        {$push : {visitHistory : {timestamp : Date.now()}}});
    console.log(result);
    if(!result) return res.json("Invalid url");
    return res.redirect(result.redirectURL);
}

module.exports = {
    handleGenerateNewShortURL,
    handleRedirect,
}