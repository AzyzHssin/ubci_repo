const express = require('express');
const cors = require('cors')
//Create an Express App
const {connection} = require("./database/index")
const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true}));

/* ------------------------------------------------------------------------------- */
app.get('/user', (req, res) => {  
  
  const sqlget=`select * from user;`
  connection.query(sqlget,function(err,result){
    if(err){res.status(500).send(error);}
    else{
      res.json(result)
    }
  })
});
app.get('/user/login', (req, res) => {  
  
  const sqlget=`select * from user where name=? AND password=? ;`
  connection.query(sqlget,[req.body.username,req.body.password],function(err,result){
    if(err){res.status(500).send(error);}
    else{
      res.send(result)
    }
  })
});
app.post("/user",function(req,res){
  console.log(req.body)
  const sqlpost=`insert into user(name,email,adress,password,profile_categorie) values(?,?,?,?,?);`
  connection.query(sqlpost,[req.body.USERNAME,req.body.EMAIL,req.body.ADDRESS,req.body.PASSWORD,"user"],function(error,results,fields){
    if(error){
      res.status(500).send(error);
    }
    else{
      res.send("user was added to database successfully")
    }
  })
})

app.post("/tpe",function(req,res){
  console.log(req.body)
  const sqlpost=`insert into TPE(tpeName,description,etat_rep,TPEuser) values(?,?,?,?);`
  connection.query(sqlpost,[req.body.idTPE,req.body.desF,"en attente",req.body.TPEuser],function(error,results,fields){
    if(error){
      res.status(500).send(error);
    }
    else{
      res.send("user was added to database successfully")
    }
  })
})

app.get("/tpe/oneuser/:id",function(req,res){
  console.log("the id came from frontend",req.params)
  const sqlget=`select * from tpe where TPEuser=?`
  connection.query(sqlget,[req.params.id],function(error,results,fields){
    if(error){
      res.status(500).send(error);
    }
    else{
      res.send(results)
    }
  })
})
app.get("/tpe/Alluser",function(req,res){

  const sqlget=`select * from tpe ;`
  connection.query(sqlget,function(error,results,fields){
    if(error){
      res.status(500).send(error);
    }
    else{
      res.send(results)
    }
  })
})


app.delete("/tpe/oneuser/:id",function(req,res){
  console.log(req.params.id,"the id to delete")

  const sqldelete =`DELETE FROM tpe WHERE idTPE=${req.params.id};`
  connection.query(sqldelete,function(err,result){
    if(err){res.status(500).send(error);}
    else{
      res.json(result)
    }
  })
})


app.put("/enattente/:id",(req,res)=>{
  console.log(req.body)
  console.log(req.params)
  console.log("im inside update")
  const sqlupdate =`UPDATE tpe SET etat_rep = "en attente" WHERE idTPE=${req.params.id};`
  connection.query(sqlupdate,function(error,results){
    if(error){res.status(500).send(error);}
    else{
      res.send("tpe  updated successfully")
    }
  })
})
app.put("/enreparation/:id",(req,res)=>{
  console.log(req.body)
  console.log(req.params)
  console.log("im inside update")
  const sqlupdate =`UPDATE tpe SET etat_rep = "enreparation" WHERE idTPE=${req.params.id};`
  connection.query(sqlupdate,function(error,results){
    if(error){res.status(500).send(error);}
    else{
      res.send("tpe  updated successfully")
    }
  })
})
app.put("/repare/:id",(req,res)=>{
  console.log(req.body)
  console.log(req.params)
  console.log("im inside update")
  const sqlupdate =`UPDATE tpe SET etat_rep = "repare" WHERE idTPE=${req.params.id};`
  connection.query(sqlupdate,function(error,results){
    if(error){res.status(500).send(error);}
    else{
      res.send("tpe  updated successfully")
    }
  })
})











let port = 3001;
app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

module.exports = app; // export the express app.