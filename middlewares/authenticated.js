module.exports = (req,res,next) =>
{
    if(req.session && req.session.user_data)
    {
        res.locals.userData = req.session.user_data;
        
        next();
    }
    else
    {   
        next();
    }
}