let express = require('express');
let router = express.Router();
let sequelize = require('../db');
let User = sequelize.import('../models/user');
let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');


//*register user
router.post('/register', function(request,response){
    let username = request.body.user.username;
    let email = request.body.user.email;
    let pass = request.body.user.password;
    let role = request.body.user.role;

    User.create({
        username: username,
        email: email,
        password: bcrypt.hashSync(pass,10),
        role: role
    }).then(
        function createSuccess(user) {
            let token = jwt.sign({id: user.id},process.env.JWT_SECRET,{expiresIn: 60*60*24});

            response.json({
                user: user,
                message: 'created',
                sessionToken: token
            });
        },
        function createError(err) {
            response.send(500,"Username Already Exists");
        }
    );
});

router.post('/login', function(request,response) {
    User.findOne({where: {username: request.body.user.username}}).then(
        function(user){
            if(user){
                bcrypt.compare(request.body.user.password, user.password, function(err, matches){
                    if(matches){
                        let token = jwt.sign({id: user.id},process.env.JWT_SECRET, {expiresIn: 60*60*24});
                        response.json({
                            user: user,
                            message: "successfully authenticated",
                            sessionToken: token
                        });
                    }else {
                        response.status(502).send({error: "failure"});
                    }
                    });
                } else {
                        response.status(500).send({error:"failed to authenticate"});
                    }
        },
            function(err){         
                response.status(501).send({error: "Failed"});
            }
    );
});



module.exports=router;