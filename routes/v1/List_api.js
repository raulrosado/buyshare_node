var express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
var router = express.Router();

const ListService = require('../../services/list.service');

const service = new ListService();
const { config } = require('../../bin/config');


router.get('/', async (req,res)=>{
  const list = await service.find();
  res.json(list);
});

router.post('/addList',
  passport.authenticate('jwt',{session:false}),
  async (req,res)=>{
  const listParams = {
    nombre : req.params.nombre,
    estado:1
  }
  const list = await service.AddList(listParams);
  res.json(list);
});

router.get('/user/:id_user', 
  passport.authenticate('jwt',{session:false}),
  async (req,res)=>{
    const list = await service.findByIdUser(req.params.id_user);
    res.json(list);
});


module.exports = router;