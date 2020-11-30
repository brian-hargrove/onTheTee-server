let router = require('express').Router();
const { validate } = require('../db');
let sequelize=require('../db');
let User = sequelize.import('../models/user')
let UserInfo = sequelize.import('../models/userInfoModel')
let Score = sequelize.import('../models/scoreModel')
let CourseModel = sequelize.import('../models/courseModel')
let CardModel = sequelize.import('../models/cardModel')
let validateSession = require('../middlewares/validate-session');


//Create (POST) new course
router.post('/new',validateSession, function(request, response){
    let userId=request.user.id;
    let golfcourse = request.body.course.golfcourse;
    let location = request.body.course.location;
    let rating = request.body.course.rating;
    let notes = request.body.course.notes;

    CourseModel.create({
        golfcourse,
        location,
        rating,
        notes,
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

//Get (GET) a list of saved courses
router.get('/all',validateSession, function(request,response){
    let user_id=request.course.id;
    
    CourseModel.findAll({
        where: {user_id: course.id}
    })
    .then(
        function findAllSuccess(data){
            response.json(data);
        },
        function findAllError(err){
            response.send(500,err.message);
        }
    );
});

//Update(PUT) rating for course
router.put('/:id', function(request, response){
    let data = request.params.id;
    let rating = request.body.course.rating;
    let notes = request.body.course.notes;

    CourseModel.update({
        rating: rating,
        notes:notes
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


//Remove(DELETE) a course
router.delete('/:id',validateSession, function(request, response){
    let data = request.params.id;
    // let user_id=request.user.id;

    CourseModel.destroy({
        where: {id: data/*, user_id: user_id*/}
    }).then(
        function deleteCourseSuccess(data){
            response.send("Course Deleted");
        },
        function deleteCourseError(err){
            response.send(500,err.message);
        }
    );
});


module.exports = router;