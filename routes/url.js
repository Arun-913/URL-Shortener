const express = require("express");
const router = express.Router();

const {handleGenerateNewShortURL, handleRedirect} = require('../controllers/url');

router.post('/', handleGenerateNewShortURL);
router.get('/:shortId', handleRedirect);

module.exports = router;