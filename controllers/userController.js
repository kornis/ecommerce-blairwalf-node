const DB = require('../database/models');

module.exports = {
    index: (req,res) =>
    {
        DB.users.findAll()
        .then(result =>
            {
                res.send(req.session.user);
            })
    },



}