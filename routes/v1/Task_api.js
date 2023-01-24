var express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
var router = express.Router();

const TaskService = require('../../services/task.service');
const service = new TaskService();
const { config } = require('../../bin/config');


router.get('/', async (req,res)=>{
  const list = await service.find();
  res.json(list);
});

router.get('/user/:id_user', async (req,res)=>{
  const list = await service.findByIdUser(req.params.id_user);
  res.json(list);
});

router.get('/list/:id_list', async (req,res)=>{
  const list = await service.findByIdList(req.params.id_list);
  res.json(list);
});

router.get('/event/:id_event', async (req,res)=>{
  const list = await service.findByIdEvent(req.params.id_event);
  res.json(list);
});


module.exports = router;