var express = require('express');
var router = express.Router();
var Mongodb = require('../../bin/mongodb');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({status:true,online:"true"});
});

router.post('/add_user', async (req,res) =>{
    const UserModel = require('../../Models/User.model')

    const nombre = req.body.firstName.split(' ');
    console.log(nombre[0])
    var infoUser = { 
        name : nombre[0],
        apellidos : nombre[1] + ' ' +nombre[2],
        email : req.body.email,
        password : req.body.password,
        avatar : "",
        token : "",
        estado : 1
    };
    const newUser = new UserModel(infoUser)
    await newUser.save()

    res.json({
        firstName:infoUser
    })
});

router.get('/user',function(req,res){
    const UserModel = require('../../Models/User.model')
    UserModel
    .find()
    .then(allUsers => res.json(allUsers))
});

router.get('/user/detail/:id', async (req,res) => {
    const UserModel = require('../../Models/User.model')
    const idUser = req.params.id
    console.log(idUser)
    try {
        await UserModel
        .findById(idUser)
        .then(userInfo => res.json(userInfo))
    } catch (error) {
        console.log(error)
    }

});

module.exports = router;