var express = require('express');
var router = express.Router();
var burger = require ('../model/burger.js');

router.get ('/', function(req,res){
    burger.all (function(burgerData){
        console.log(burgerData);
        res.render('index',{burger_data: burgerData});
    });  
});

router.put ('/burgers/:id', function(req, res) {
    console.log("put request in controllers")
    var id = req.params.id;
    var condition = "id = " +id;
    burger.update ({
        devoured: 1
    },condition, function(data){
        console.log("data in the controllers: " +JSON.stringify(data));
        res.render('index',{burger_data: data});
    });
});

router.post ('/burgers/create', function(req, res) {
    console.log("buger name: " +req.body.burger_name);
    burger.create(["burger_name"],[req.body.burger_name], function(data){
        console.log(data);
        res.redirect("/");
    });
});


module.exports =router;