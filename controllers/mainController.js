const DB = require('../database/models');
const {users, GoogleUser} = DB;

module.exports = {
    login: (req,res) =>
    {
        return res.render('main/login');
    },

    loginPost: (req,res) =>
    {
        req.session.user = req.body.user_email;
        return res.send(req.session.user);
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
                        req.session.user = user;
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
                                    req.session.user = user;
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
            if(req.body.password === req.body.passwordRpt)
            {
                delete req.body.passwordRpt;
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
                    req.session.user = user;
                    return res.json(req.body);
                })
                .catch(error =>
                    {
                        console.log(error);
                    })
            }
            else
            {
                return res.render('main/register', {error:"La contraseña no coincide."})
            }
        }
       })
       .catch(error =>
        {
            console.log(error);
        })     
    }
}