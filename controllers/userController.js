let express = require('express');
let router = express.Router();
let sequelize = require('../db');
let User = sequelize.import('../models/user');
let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');
let validateSession = require('../middlewares/validate-session');

//*register user
router.post('/register', function(request,response){
    let username = request.body.user.username;
    let email = request.body.user.email;
    let pass = request.body.user.password;
    // let admin = request.body.user.admin;

    User.create({
        username: username,
        email: email,
        password: bcrypt.hashSync(pass,10),
        // admin: false
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

//user login
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

router.get("/admin", function(request,response){
    User.findOne({where:{username: request.body.user.username}})
    .then(function(user){
        if (user.admin==true) {
            User.findAll()
            .then(
                function finAllSuccess(data){
                    response.json(data);
                },
                function findAllError(err){
                    response.send(500,err.message);
                }
            );
        }else {
            response.status(400).send({error:"User not found"});
        }
    },
    function(err){
        response.status(501).send({error:"Not correct"});
    }
    );
});

router.put('/admin',validateSession, function(request,response){
    let username = request.body.user.username;
    User.update({
        admin:true
    },
        {where: {username: username}}
    ).then(
        function updateSuccess(updatedStatus){
            response.send('User status is now an Admin');
        },
        function updateError(err){
            response.send(500, err.message);
        }
    )
});

router.delete('/admin',validateSession,function(request,response){
    let data=request.body.user.username
    
    User.destroy({
        where:{username: data}
    })
    .then(function deleteUserSuccess(data){
        response.send("User Deleted");
    },
    function deleteUserError(err){
        response.send(500, err.message);
    }
    );
});


module.exports=router;