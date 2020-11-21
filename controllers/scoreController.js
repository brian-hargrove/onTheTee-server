let router = require('express').Router();
const { validate } = require('../db');
let sequelize=require('../db');
let User = sequelize.import('../models/user')
let UserInfo = sequelize.import('../models/userInfoModel')
let Score = sequelize.import('../models/scoreModel')
let CourseModel = sequelize.import('../models/courseModel')
let CardModel = sequelize.import('../models/cardModel')
let validateSession = require('../middlewares/validate-session');
let ScoreModel = require('../models/scoreModel');


//Create (POST) new score
router.post('/new',validateSession, function(request, response){
    let golfcourse = request.body.score.golfcourse;
    let date = request.body.score.date;
    let hole1 = request.body.score.hole1;
    let hole2 = request.body.score.hole2;
    let hole3 = request.body.score.hole3;
    let hole4 = request.body.score.hole4;
    let hole5 = request.body.score.hole5;
    let hole6 = request.body.score.hole6;
    let hole7 = request.body.score.hole7;
    let hole8 = request.body.score.hole8;
    let hole9 = request.body.score.hole9;
    let hole10 = request.body.score.hole10;
    let hole11 = request.body.score.hole11;
    let hole12 = request.body.score.hole12;
    let hole13 = request.body.score.hole13;
    let hole14 = request.body.score.hole14;
    let hole15 = request.body.score.hole15;
    let hole16 = request.body.score.hole16;
    let hole17 = request.body.score.hole17;
    let hole18 = request.body.score.hole18;
    let front9 = request.body.score.front9;
    let back9 = request.body.score.back9;
    let total = request.body.score.total;
    let rating = request.body.score.rating;
    let notes = request.body.score.notes;

    

    Score.create({
        golfcourse,
        date,
        hole1,
        hole2,
        hole3,
        hole4,
        hole5,
        hole6,
        hole7,
        hole8,
        hole9,
        hole10,
        hole11,
        hole12,
        hole13,
        hole14,
        hole15,
        hole16,
        hole17,
        hole18,
        front9,
        back9,
        total,
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

// Get (GET) a list of saved scores
router.get('/all',validateSession, function(request,response){
    let userid=request.user.id;
    
    Score.findAll({
        where: {userid: userid}
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

router.get('/allscore',validateSession,(request,response)=>{
    Score.findOne({
        where: {
            userid: request.user.id
        }
    })
    .then(function createSuccess(data){
        response.status(200).json({
            message: 'user info found',
            data: data
        })
    }).catch(err=>response.status(500).json('score info not found',err))
})

//Update(PUT) scores & rating for course
router.put('/:id', function(request, response){
    let data = request.params.id;
    let hole1 = request.body.score.hole1;
    let hole2 = request.body.score.hole2;
    let hole3 = request.body.score.hole3;
    let hole4 = request.body.score.hole4;
    let hole5 = request.body.score.hole5;
    let hole6 = request.body.score.hole6;
    let hole7 = request.body.score.hole7;
    let hole8 = request.body.score.hole8;
    let hole9 = request.body.score.hole9;
    let hole10 = request.body.score.hole10;
    let hole11 = request.body.score.hole11;
    let hole12 = request.body.score.hole12;
    let hole13 = request.body.score.hole13;
    let hole14 = request.body.score.hole14;
    let hole15 = request.body.score.hole15;
    let hole16 = request.body.score.hole16;
    let hole17 = request.body.score.hole17;
    let hole18 = request.body.score.hole18;
    let front9 = request.body.score.front9
    let back9 = request.body.score.back9;
    let total = request.body.score.total;

    

    Score.update({
        hole1: hole1,
        hole2: hole2,
        hole3: hole3,
        hole4: hole4,
        hole5: hole5,
        hole6: hole6,
        hole7: hole7,
        hole8: hole8,
        hole9: hole9,
        hole10: hole10,
        hole11: hole11,
        hole12: hole12,
        hole13: hole13,
        hole14: hole14,
        hole15: hole15,
        hole16: hole16,
        hole17: hole17,
        hole18: hole18,
        front9: front9,
        back9: back9,
        total: total,
    },
    {where: {id: data}}
    ).then(
        function updateSuccess(updatedLog){
            response.send(`Scores ${data} updated!`);
        },
        function updateError(err){
            response.send(500,err.message);
        }
    )
});

//Remove(DELETE) a score
router.delete('/:id',validateSession, function(request, response){
    let data = request.params.id;
    let user_id=request.user.id;

    Score.destroy({
        where: {id: data, user_id: user_id}
    }).then(
        function deleteScoreSuccess(data){
            response.send("Score Deleted");
        },
        function deleteScoreError(err){
            response.send(500,err.message);
        }
    );
});


module.exports = router;