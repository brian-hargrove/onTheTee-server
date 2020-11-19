let router = require('express').Router();
const { request } = require('express');
const { validate } = require('../db');
let sequelize=require('../db');
let User = require('../models/user')(sequelize,require("sequelize"));
let UserInfo = require('../models/userInfoModel')(sequelize,require("sequelize"));
let validateSession = require('../middlewares/validate-session');


//Create (POST) new user info
router.post('/new',validateSession, function(request, response){
    let user_id = request.user.id;
    let dateOfBirth = request.body.userinfo.dateOfBirth;
    let hand = request.body.userinfo.hand;
    let favCourse = request.body.userinfo.favCourse;
    let favGolfer = request.body.userinfo.favGolfer;
    

    UserInfo.create({
        user_id,
        dateOfBirth,
        hand,
        favCourse,
        favGolfer
    })
    .then(
        function createSuccess(data){
            response.json(data);
        },
        function createError(err){
            response.send(500,err.message);
        }
    );
});

router.get('/getuser',validateSession, (request,response)=>{
    UserInfo.findOne({
        where: {
            userId: request.user.id
        },
        include: ['user','scoreModal']
    })
    .then(function createSuccess(data){
        response.status(200).json({
            message: 'User Info Found',
            data:data
        })
    }).catch(err=> response.status(500).json('User Info not found',err))
})
//Update(PUT) rating for user info
router.put('/:id', validateSession,function(request, response){
    let data = request.params.id;
    let dateOfBirth = request.body.userinfo.dateOfBirth;
    let hand = request.body.userinfo.hand;
    let favCourse = request.body.userinfo.favCourse;
    let favGolfer = request.body.userinfo.favGolfer;

    UserInfo.update({
        dateOfBirgh: dateOfBirth,
        hand: hand,
        favCourse: favCourse,
        favGolfer: favGolfer
        
    },
    {where: {id: data}}
    ).then(
        function updateSuccess(updatedLog){
            response.send(`Course ${data} updated!`);
        },
        function updateError(err){
            response.send(500,err.message);
        }
    )
});

router.delete('/:id',validateSession, function(request, response){
    let data = request.params.id;
    let user_id=request.user.id;

    UserInfo.destroy({
        where: {id: data, user_id: user_id}
    }).then(
        function deleteUserInfoSuccess(data){
            response.send("UserInfo Deleted");
        },
        function deleteUserInfoError(err){
            response.send(500,err.message);
        }
    );
});


module.exports = router;