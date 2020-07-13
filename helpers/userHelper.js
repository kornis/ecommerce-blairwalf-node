const db = require('../database/models');

module.exports = 
{
    registerFacebookUser: (req,res) =>

    {   
        db.facebookuser.findOne({
            where:{email:req.session.social_user.email}
        })
        .then(response =>{
            if(response)
            {
                const userData = {
                    id: response.id,
                    name: response.name,
                    email: response.email,
                }
                req.session.user_data = userData;
                req.session.social_user = null;
                return res.redirect('/perfil');
            }
            else{
                let user_data = {
                    name: req.session.social_user.first_name,
                    lastname: req.session.social_user.last_name,
                    facebookId: req.session.social_user.id,
                    email:req.session.social_user.email,
                }
                db.facebookuser.create(user_data)
                .then(response =>
                    {
                        if(response){
                            const userData = {
                                id: response.id,
                                name: response.name,
                                email: response.email,
                            }
                            req.session.user_data = userData;
                            req.session.social_user = null;
                            return res.redirect('/perfil');
                        }
                        else
                        {
                            return res.render('main/login',{messageError:"Error al iniciar sesión con facebook. Intente nuevamente."});
                        }
                    })
                    .catch(error => console.error(new Error(error)));
            }
        })
        .catch(error => console.error(new Error(error)));
        
    },
    registerGoogleUser: (req,res) => {
        db.GoogleUser.findOne({
            where: {email: req.session.social_user.email}
        })
        .then(response => {
            if(response)
            {
                const userData = {
                    id: response.id,
                    name: response.given_name,
                    email: response.email,
                }
                req.session.user_data = userData;
                req.session.social_user = null;
                return res.redirect('/perfil');
            }
            else{
                let user_data = {
                    name: req.session.social_user.given_name,
                    lastname: req.session.social_user.family_name,
                    googleId: req.session.social_user.id,
                    email:req.session.social_user.email,
                }
                db.GoogleUser.create(user_data)
                .then(response =>
                    {
                        if(response){
                            const userData = {
                                id: response.id,
                                name: response.name,
                                email: response.email,
                            }
                            req.session.user_data = userData;
                            req.session.social_user = null;
                            return res.redirect('/perfil');
                        }
                        else
                        {
                            return res.render('main/login',{messageError:"Error al iniciar sesión con Google. Intente nuevamente."});
                        }
                    })
                    .catch(error => console.error(new Error(error)));
            }
        })
        .catch(error => console.error(new Error(error)));
    }
}