const express = require("express");
const router = express.Router();
const querystring = require('querystring');
const request = require('request');

const { registerFacebookUser, registerGoogleUser } = require('../helpers/userHelper');
const generateRandomString = require("../utils/generateRandomString");
const {facebookScopesArray, googleScopesArray} = require('../utils/scopes');
const { config } = require('../config');



router.get('/fb', (req,res) =>
{
    const state = generateRandomString(16);

    const queryString = querystring.stringify({
        response_type: "code",
        scope: facebookScopesArray.join(' '),
        client_id: config.facebookClientId,
        redirect_uri: config.facebookRedirectUri,
        state: state,
    });
    res.cookie("auth_state", state, {httpOnly: true});
    res.redirect(`https://www.facebook.com/v7.0/dialog/oauth?${queryString}`);
});

router.get('/fb/callback', (req,res, next) => {
    const { code, state } = req.query;
    const { auth_state } = req.cookies; 

    if(state === null || state !== auth_state)
     {
        next(new Error("The state doesn't match"));
     }
     res.clearCookie("auth_state");

     const queryString = querystring.stringify({
         client_id: config.facebookClientId,
         redirect_uri: config.facebookRedirectUri,
         client_secret: config.facebookClientPass,
         code: code
     })

     request.get(`https://graph.facebook.com/v7.0/oauth/access_token?${queryString}`,function(err, response, body)
     {
         if(err || response.statusCode !== 200)
         {
             next(new Error("The token is invalid"));
         }
         body = JSON.parse(body);
         res.cookie("access_token", body.access_token,{httpOnly: true});
         const userData = ["id", "first_name", "last_name", "email"];
         const userDataQuery = querystring.stringify(
             {
                fields: userData.join(","),
                type:"normal",
                access_token: body.access_token,
                redirect: 0,
             }
         )
         request.get(`https://graph.facebook.com/v7.0/me?${userDataQuery}`, function(error, response, body)
         {
            if(err || response.statusCode !== 200)
            {
                next(new Error("Data Error"));
            }
            body = JSON.parse(body)
            req.session.social_user = body;
            registerFacebookUser(req,res);
         })
     });
});

router.get("/go", (req,res)=>{
    const state = generateRandomString(16);
    const nonce = generateRandomString(16);
    const queryString = querystring.stringify({
        client_id: config.googleClientID,
        response_type: "code",
        scope:googleScopesArray.join(" "),
        redirect_uri: config.googleRedirectUri,
        state: state,
        nonce: nonce,
    });
    res.cookie("g_auth_state",state,{httpOnly:true});
    return res.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${queryString}`);
 });

 router.get('/go/callback', (req,res) => {
     const { state, code } = req.query;
     const { g_auth_state } = req.cookies;
     if(state === null || state !== g_auth_state){
        return console.error(new Error("The token doesn't match"));
     }

     res.clearCookie("g_auth_state");

     let dataBody = {
         url: "https://oauth2.googleapis.com/token",
         form: {
             code: code,
             client_id: config.googleClientID,
             client_secret: config.googleClientPass,
             redirect_uri: config.googleRedirectUri,
             grant_type: "authorization_code"
         },
         json:true,
         "Content-Type": "application/x-www-form-urlencoded"
     };

     request.post(dataBody, function(error, response, body){
         if(error || response.statusCode !== 200){
            return console.error(new Error("The token is invalid"));
         }

         request.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${body.access_token}`, function(error, response, body)
         {
             body = JSON.parse(body);
             req.session.social_user = body;
             registerGoogleUser(req,res);
         })
         //pasar el token a las cookies
     })

 })

module.exports = router;