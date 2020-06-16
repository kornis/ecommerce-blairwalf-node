module.exports = (req,res,next) =>
{
    console.log(req.session.user);
    if(req.session.user)
    {
        res.locals.userData = req.session.user;
        next();
    }
    else
    {
        console.log("No estás logueado");
        next();
    }
}