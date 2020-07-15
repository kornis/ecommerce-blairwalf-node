require('dotenv').config();

const config = {
    facebookClientId: process.env.FACEBOOK_CLIENT_ID,
    facebookClientPass: process.env.FACEBOOK_CLIENT_PASS,
    facebookRedirectUri: process.env.FACEBOOK_REDIRECT_URI,
    googleClientID: process.env.GOOGLE_CLIENT_ID,
    googleClientPass: process.env.GOOGLE_CLIENT_PASS,
    googleRedirectUri: process.env.GOOGLE_REDIRECT_URI
}

module.exports = {config: config};