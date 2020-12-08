let router = require('express').Router();
const { request } = require('express');
let sequelize=require('../db');
let User = sequelize.import('../models/user')
let UserInfo = sequelize.import('../models/userInfoModel')
let Score = sequelize.import('../models/scoreModel')
let CourseModel = sequelize.import('../models/courseModel')
let CardModel = sequelize.import('../models/cardModel')
let validateSession = require('../middlewares/validate-session');

//Create (POST) new user info
router.post('/new',validateSession, function(request, response){
    let userId = request.user.id;
    let dateOfBirth = request.body.userinfo.dateOfBirth;
    let hand = request.body.userinfo.hand;
    let favCourse = request.body.userinfo.favCourse;
    let favGolfer = request.body.userinfo.favGolfer;
    
    

    UserInfo.create({
        dateOfBirth,
        hand,
        favCourse,
        favGolfer,
        userId
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

router.get('/getuserinfo',validateSession, (request,response)=>{
    UserInfo.findOne({
        where: {
             id: request.user.id
        }, 
        include: 'user'
    })
    .then(function createSuccess(data){
        response.status(200).json({
            message: 'User Info Found',
            data:data
        })
    }).catch(err=> response.status(500).json(err))
})
//Update(PUT) user info
router.put('/:id', validateSession,function(request, response){
    let data = request.params.id;
    let dateOfBirth = request.body.userinfo.dateOfBirth;
    let hand = request.body.userinfo.hand;
    let favCourse = request.body.userinfo.favCourse;
    let favGolfer = request.body.userinfo.favGolfer;

    UserInfo.update({
        dateOfBirth: dateOfBirth,
        hand: hand,
        favCourse: favCourse,
        favGolfer: favGolfer
        
    },
    {where: {id: data}}
    ).then(
        function updateSuccess(updatedLog){
            response.send(`Userinfo ${data} updated!`);
        },
        function updateError(err){
            response.send(500,err.message);
        }
    )
});


//!De
router.delete('/:id',validateSession, function(request, response){
    let data = request.params.id;
    // let user_id=request.user.id;

    UserInfo.destroy({
        where: {id: data/*, user_id: user_id*/}
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