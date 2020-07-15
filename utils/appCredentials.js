const request = require('request');
const querystring = require('querystring');

const appCredentials = {
    fbAppToken: function(appId,secret)
    {
        const queryString = querystring.stringify({
            client_id:appId,
            client_secret: secret,
            grant_type: "client_credentials"
        });

        const promise = new Promise(function(resolve, reject){

            request.get(`https://graph.facebook.com/oauth/access_token?${queryString}`, function(error, response, body)
            {
                if(error || response.statusCode !== 200)
                {
                    reject(new Error(error));
                }
                body = JSON.parse(body);
                resolve(body.access_token);
            });

        })

        return promise;
    },
}

module.exports = appCredentials;