let router = require('express').Router();
const { request } = require('express');
const { validate } = require('../db');
let sequelize=require('../db');
let User = sequelize.import('../models/user')
let UserInfo = sequelize.import('../models/userInfoModel')
let Score = sequelize.import('../models/scoreModel')
let CourseModel = sequelize.import('../models/courseModel')
let CardModel = sequelize.import('../models/cardModel')
let validateSession = require('../middlewares/validate-session');
const ScoreModel = require('../models/scoreModel');


//Create (POST) new course information
router.post('/new',validateSession, function(request, response){
    let golfcourse = request.body.cards.golfcourse;
    let par1 = request.body.cards.par1;
    let par2 = request.body.cards.par2;
    let par3 = request.body.cards.par3;
    let par4 = request.body.cards.par4;
    let par5 = request.body.cards.par5;
    let par6 = request.body.cards.par6;
    let par7 = request.body.cards.par7;
    let par8 = request.body.cards.par8;
    let par9 = request.body.cards.par9;
    let par10 = request.body.cards.par10;
    let par11 = request.body.cards.par11;
    let par12 = request.body.cards.par12;
    let par13 = request.body.cards.par13;
    let par14 = request.body.cards.par14;
    let par15 = request.body.cards.par15;
    let par16 = request.body.cards.par16;
    let par17 = request.body.cards.par17;
    let par18 = request.body.cards.par18;
    let parFront9 = request.body.cards.parFront9;
    let parBack9 = request.body.cards.parBack9;
    let parTotal = request.body.cards.parTotal;
    let yards1 = request.body.cards.yards1;
    let yards2 = request.body.cards.yards2;
    let yards3 = request.body.cards.yards3;
    let yards4 = request.body.cards.yards4;
    let yards5 = request.body.cards.yards5;
    let yards6 = request.body.cards.yards6;
    let yards7 = request.body.cards.yards7;
    let yards8 = request.body.cards.yards8;
    let yards9 = request.body.cards.yards9;
    let yards10 = request.body.cards.yards10;
    let yards11 = request.body.cards.yards11;
    let yards12 = request.body.cards.yards12;
    let yards13 = request.body.cards.yards13;
    let yards14 = request.body.cards.yards14;
    let yards15 = request.body.cards.yards15;
    let yards16 = request.body.cards.yards16;
    let yards17 = request.body.cards.yards17;
    let yards18 = request.body.cards.yards18;
    let yardsFront9 = request.body.cards.yardsFront9;
    let yardsBack9 = request.body.cards.yardsBack9;
    let yardsTotal = request.body.cards.yardsTotal;
    let handicap1 = request.body.cards.handicap1;
    let handicap2 = request.body.cards.handicap2;
    let handicap3 = request.body.cards.handicap3;
    let handicap4 = request.body.cards.handicap4;
    let handicap5 = request.body.cards.handicap5;
    let handicap6 = request.body.cards.handicap6;
    let handicap7 = request.body.cards.handicap7;
    let handicap8 = request.body.cards.handicap8;
    let handicap9 = request.body.cards.handicap9;
    let handicap10 = request.body.cards.handicap10;
    let handicap11 = request.body.cards.handicap11;
    let handicap12 = request.body.cards.handicap12;
    let handicap13 = request.body.cards.handicap13;
    let handicap14 = request.body.cards.handicap14;
    let handicap15 = request.body.cards.handicap15;
    let handicap16 = request.body.cards.handicap16;
    let handicap17 = request.body.cards.handicap17;
    let handicap18 = request.body.cards.handicap18;
    

    CardModel.create({
        golfcourse,
        par1,
        par2,
        par3,
        par4,
        par5,
        par6,
        par7,
        par8,
        par9,
        par10,
        par11,
        par12,
        par13,
        par14,
        par15,
        par16,
        par17,
        par18,
        parFront9,
        parBack9,
        parTotal,
        yards1,
        yards2,
        yards3,
        yards4,
        yards5,
        yards6,
        yards7,
        yards8,
        yards9,
        yards10,
        yards11,
        yards12,
        yards13,
        yards14,
        yards15,
        yards16,
        yards17,
        yards18,
        yardsFront9,
        yardsBack9,
        yardsTotal,
        handicap1,
        handicap2,
        handicap3,
        handicap4,
        handicap5,
        handicap6,
        handicap7,
        handicap8,
        handicap9,
        handicap10,
        handicap11,
        handicap12,
        handicap13,
        handicap14,
        handicap15,
        handicap16,
        handicap17,
        handicap18,

        
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

// Get (GET) a list of saved scorecards
router.get('/all',validateSession, function(request,response){
    let userid=request.user.id;
    
    CardModel.findAll({
        where: {id: userid}
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

//Update(PUT) update scorecard
router.put('/:id', function(request, response){
    let data = request.params.id;
    let par1 = request.body.cards.par1;
    let par2 = request.body.cards.par2;
    let par3 = request.body.cards.par3;
    let par4 = request.body.cards.par4;
    let par5 = request.body.cards.par5;
    let par6 = request.body.cards.par6;
    let par7 = request.body.cards.par7;
    let par8 = request.body.cards.par8;
    let par9 = request.body.cards.par9;
    let par10 = request.body.cards.par10;
    let par11 = request.body.cards.par11;
    let par12 = request.body.cards.par12;
    let par13 = request.body.cards.par13;
    let par14 = request.body.cards.par14;
    let par15 = request.body.cards.par15;
    let par16 = request.body.cards.par16;
    let par17 = request.body.cards.par17;
    let par18 = request.body.cards.par19;
    let parFront9 = request.body.cards.parFront9;
    let parBack9 = request.body.cards.parBack9;
    let parTotal = request.body.cards.parTotal;
    let yards1 = request.body.cards.yards1;
    let yards2 = request.body.cards.yards2;
    let yards3 = request.body.cards.yards3;
    let yards4 = request.body.cards.yards4;
    let yards5 = request.body.cards.yards5;
    let yards6 = request.body.cards.yards6;
    let yards7 = request.body.cards.yards7;
    let yards8 = request.body.cards.yards8;
    let yards9 = request.body.cards.yards9;
    let yards10 = request.body.cards.yards10;
    let yards11 = request.body.cards.yards11;
    let yards12 = request.body.cards.yards12;
    let yards13 = request.body.cards.yards13;
    let yards14 = request.body.cards.yards14;
    let yards15 = request.body.cards.yards15;
    let yards16 = request.body.cards.yards16;
    let yards17 = request.body.cards.yards17;
    let yards18 = request.body.cards.yards18;
    let yardsFront9 = request.body.cards.yardsFront9;
    let yardsBack9 = request.body.cards.yardsBack9;
    let yardsTotal = request.body.cards.yardsTotal;
    let handicap1 = request.body.cards.handicap1;
    let handicap2 = request.body.cards.handicap2;
    let handicap3 = request.body.cards.handicap3;
    let handicap4 = request.body.cards.handicap4;
    let handicap5 = request.body.cards.handicap5;
    let handicap6 = request.body.cards.handicap6;
    let handicap7 = request.body.cards.handicap7;
    let handicap8 = request.body.cards.handicap8;
    let handicap9 = request.body.cards.handicap9;
    let handicap10 = request.body.cards.handicap10;
    let handicap11 = request.body.cards.handicap11;
    let handicap12 = request.body.cards.handicap12;
    let handicap13 = request.body.cards.handicap13;
    let handicap14 = request.body.cards.handicap14;
    let handicap15 = request.body.cards.handicap15;
    let handicap16 = request.body.cards.handicap16;
    let handicap17 = request.body.cards.handicap17;
    let handicap18 = request.body.cards.handicap18;
    

    CardModel.update({
        par1: par1,
        par2: par2,
        par3: par3,
        par4: par4,
        par5: par5,
        par6: par6,
        par7: par7,
        par8: par8,
        par9: par9,
        par10: par10,
        par11: par11,
        par12: par12,
        par13: par13,
        par14: par14,
        par15: par15,
        par16: par16,
        par17: par17,
        par18: par18,
        parFront9: parFront9,
        parBack9: parBack9,
        parTotal: parTotal,
        yards1: yards1,
        yards2: yards2,
        yards3: yards3,
        yards4: yards4,
        yards5: yards5,
        yards6: yards6,
        yards7: yards7,
        yards8: yards8,
        yards9: yards9,
        yards10: yards10,
        yards11: yards11,
        yards12: yards12,
        yards13: yards13,
        yards14: yards14,
        yards15: yards15,
        yards16: yards16,
        yards17: yards17,
        yards18: yards18,
        yardsFront9: yardsFront9,
        yardsBack9: yardsBack9,
        yardsTotal: yardsTotal,
        handicap1: handicap1,
        handicap2: handicap2,
        handicap3: handicap3,
        handicap4: handicap4,
        handicap5: handicap5,
        handicap6: handicap6,
        handicap7: handicap7,
        handicap8: handicap8,
        handicap9: handicap9,
        handicap10: handicap10,
        handicap11: handicap11,
        handicap12: handicap12,
        handicap13: handicap13,
        handicap14: handicap14,
        handicap15: handicap15,
        handicap16: handicap16,
        handicap17: handicap17,
        handicap18: handicap18,
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

//Remove(DELETE) a scorecard
router.delete('/:id',validateSession, function(request, response){
    let data = request.params.id;
    // let user_id=request.user.id;

    CardModel.destroy({
        where: {id: data /*, user_id: user_id*/}
    }).then(
        function deleteCardSuccess(data){
            response.send("Card Deleted");
        },
        function deleteCardError(err){
            response.send(500,err.message);
        }
    );
});


module.exports = router;