const DB = require('../database/models');
const bcrypt = require('bcrypt');
const {validationResult } = require('express-validator');
const {users, GoogleUser} = DB;


module.exports = {
    login: (req,res) =>
    {
        return res.render('main/login');
    },

    authenticate: (req,res) =>
    {
        let errors = validationResult(req);

        if(!errors.isEmpty())
        {
           
            return res.render('main/login', {
                errors:errors.mapped(),
                old: req.body,
            })
        }
        else
        {
            let email = req.body.email;
            let password = req.body.password;
            users.findOne({
                where:{
                    email:email,
                }
            })
            .then(result =>
                {
                    if(result)
                    {
                        if(bcrypt.compareSync(password,result.password))
                        {
                            let user = {
                                email: result.email,
                                name: result.name,
                                lastName: result.lastName,
                            }
                            req.session.user_data = user;
                            return res.redirect('/');
                        }
                        else
                        {
                            return res.render('main/login', {messageError:"Email y/o contraseña inválido/a."});
                        }
                    }
                    else
                    {
                        return res.render('main/login', {messageError:"Email y/o contraseña inválido/a."});
                    }
                })
                .catch(error =>
                    {
                        console.log(error);
                    })
        }

    },

    googleLogin: (req,res) =>
    {
       
        const {OAuth2Client} = require('google-auth-library');
        const client = new OAuth2Client("412000884387-d5dmn4o4s5unfjma2jc3fb3b7u80tru1.apps.googleusercontent.com");
        async function verify() {
        const ticket = await client.verifyIdToken({
        idToken: req.body.idtoken,
        audience: "412000884387-d5dmn4o4s5unfjma2jc3fb3b7u80tru1.apps.googleusercontent.com",  

  });
        const payload = ticket.getPayload();
        //const userid = payload['sub'];
        if(payload)
        {
            let user = {};
            GoogleUser.findOne({where:{email:payload.email}})
            .then(result =>
                {
                    if(result)
                    {
                         user = {
                            id: result.id,
                            name: result.name,
                            email: result.email,
                        }
                        req.session.user_data = user;
                        return res.status(200).json(
                            {
                                response:"OK",
                                status_code:res.statusCode,
                            });
                    }
                    else
                    {
                        user = {
                            googleId: payload.sub,
                            name: payload.given_name,
                            lastName: payload.family_name,
                            email: payload.email,
                        }
                        GoogleUser.create({...user})
                        .then(result =>
                            {
                                if(result)
                                {
                                    req.session.user_data = user;
                                    console.log(result);
                                    return res.status(200).json(
                                        {
                                            response:"OK",
                                            status_code:res.statusCode,
                                        });
                                }
                                else
                                {
                                    return res.status(400).json(
                                        {
                                            response:"err",
                                            status_code:res.statusCode,
                                        });
                                }
                            })
                    }
                    
                })
        }
        else{
            return res.status(400).json(
                {response:"err",
                status_code:res.statusCode});
        }
}
verify().catch(console.error);


        
    },

    completeGoogleRegister: (req,res) =>
    {
        
    },

    createUser: (req,res) =>
    {
        return res.render('main/register');
    },
    saveUser: (req,res) =>
    { 
        let errors = validationResult(req);
        
        if(!errors.isEmpty())
        {
      
            return res.render('main/register',
            {
                errors:errors.mapped(),
                old: req.body,
            });
        }
        else{
            if(req.body.password !== req.body.passwordRpt)
            {
                return res.render('main/register', 
                {
                    errors:{passwordRpt:"La contraseña no coincide."},
                    old: req.body,
                })
            }
            else{
                users.findOne({
                    where:{
                        email:req.body.email,
                    }
                })
                .then(result => {
                 if(result)
                 {
                     return res.render('main/register',{messageError:"Email ya registrado."});
                 }
                 else
                 {
                         delete req.body.passwordRpt;
                         req.body.password = bcrypt.hashSync(req.body.password,12);
                         users.create(
                             {
                                 ...req.body
                             }
                         )
                         .then(result => {
                             user = {
                                 id: result.id,
                                 name: result.name,
                                 email: result.email,
                             }
                             req.session.user_data = user;
                             return res.json(req.body);
                         })
                         .catch(error =>
                             {
                                 console.log(error);
                             })
                 }
                })
                .catch(error =>
                 {
                     console.log(error);
                 })     
            }

         }
        },

        logout: (req,res) =>
        {
            req.session.destroy();
            return res.redirect('/');
        }

}