module.exports = function(req,res,next)
{
    if(typeof req.session.user == "undefined")
    {
        next();
    }
    else
    {
        return res.render('main/index');
    }
}