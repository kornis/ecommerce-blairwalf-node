const db = require('../database/models');
module.exports = (req,res,next)=> {
    db.category.findAll()
    .then(result =>{
        res.locals.sideCategory = {};
        if(result){
            res.locals.sideCategory = result;
        }
        next();
    });
}