module.exports = (req,res,next) =>
{
    if(req.session && req.session.user)
    {
        console.log("loqueado")
        res.locals.userData = req.session.user;
        next();
    }
    else
    {   
        console.log(req.session)
        next();
    }
}