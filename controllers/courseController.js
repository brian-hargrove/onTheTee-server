let router = require('express').Router();
const { validate } = require('../db');
let sequelize=require('../db');
let User = require('../models/user')(sequelize,require("sequelize"));
let Course = require('../models/courseModel')(sequelize,require("sequelize"));
let validateSession = require('../middlewares/validate-session');


//Create (POST) new course
router.post('/new',validateSession, function(request, response){
    let user_id = request.user.id;
    let golf_course = request.body.course.golf_course;
    let location = request.body.course.location;
    let rating = request.body.course.rating;
    let notes = request.body.course.notes;

    Course.create({
        user_id,
        golf_course,
        location,
        rating,
        notes
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
    let userid=request.user.id;
    
    Course.findAll({
        where: {user_id: userid}
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

    Course.update({
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

//Update(PUT) notes for course
// router.put('/:id', function(request, response){
//     let data = request.params.id;
//     let notes = request.body.course.notes;

//     Course.update({
//         notes: notes
//     },
//     {where: {id: data}}
//     ).then(
//         function updateSuccess(updatedLog){
//             response.send(`Course ${data} updated!`);
//         },
//         function updateError(err){
//             response.send(500,err.message);
//         }
//     )
// });

//Remove(DELETE) a course
router.delete('/:id',validateSession, function(request, response){
    let data = request.params.id;
    let user_id=request.user.id;

    Course.destroy({
        where: {id: data, user_id: user_id}
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