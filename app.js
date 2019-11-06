const express = require('express');
const faculty={
    fac_id:"fac_id",
    __login:"login",
    dept_name:"school",
    mobile:"mobile",
    fac_name:"fac_name",
    email:"email",
    
}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
const student={
    stu_id:"stu_id",
    __login:"login",
    dept_name:"dept_name",
    mobile:"mobile",
    stu_name:"stu_name",
    email:"email",
    
}
const lab_incharge={
    labinc_id:"stu_id",
    __login:"login",
    
    mobile:"mobile",
    labinc_name:"stu_name",
    email:"email",
    
}
const labs={
    lab:'lab',
    labinc_id:"labinc",
    room:"room",
    building:"building"
}

const admin={
    admin_id:"admin_id",
    __login:"login",
    dept_name:"dept_name",
    mobile:"mobile",
    admin_name:"admin_name",
    email:"email",
    
}
const department={
    dept_id:"dept_id",
    hod:"hod",
    dept_name:"dept_name",
    
    
}
const login={
    
    __login:"login",
    password:"password",
    role:"role",
    
}


const path = require('path');
const bodyparser=require('body-parser');
const db =require('./db');
const {validator}=require("node-input-validator");
const studentc='student';
const adminc='admin';
const facultyc='faculty';
const labinc='labincharge';


const app=express();

app.use(bodyparser.json());
app.use(express.json());
app.use(express.urlencoded());

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'));
});

app.post('/',(req,res,next)=>{
    console.log(req.body);

    console.log(req.body.login);

    var ip=req.body;
    
      //if(v.check){
       
      

    db.getDB().collection(login.__login).find({__login:ip.login}).toArray().then((doc)=>{
        console.log(doc);
        if(!doc)
        {
            res.sendStatus(404);
        }
        else if(ip.password===doc[0]['password']){

            console.log(ip.password);
        
            if(doc[0]['role']==='Student'){
                res.redirect('/user/student/'+ ip.login);
            } else if(doc[0]['role']==='faculty') {
                res.redirect('/user/faculty/'+ ip.login);
            } else if(doc[0]['role']==='admin') {
                res.redirect('/user/admin/'+ip.login);
            }else if(doc[0]['role']==='lab_incharge') {
                res.redirect('/user/lab_incharge/'+ip.login);
            }
        }
    }
        
        
        
    ).catch((err)=>{
        if(err) console.log("ji");
    });
    

   // res.send('success');
});


//to login

app.get('/user/:id/:userid',(req,res)=>{
    const id=req.params.id;
    console.log(id);
    if(id==='student'){
        res.sendFile(path.join(__dirname,'student.html'));
    } else if(id==='faculty') {
        res.sendFile(path.join(__dirname,'faculty.html'));
    } else if(id==='admin') {
        res.sendFile(path.join(__dirname,'admin.html'));
    } else if(id==='lab_incharge'){
        res.sendFile(path.join(__dirname,'lab_incharge.html'));
    }
});
//to update

app.get('/user/:id/:userid/update',(req,res)=>{
    
    if(req.params.id==='student')
    {res.sendFile(path.join(__dirname,'update_stu.html'));}
    else if(req.params.id==='faculty')
    
    {res.sendFile(path.join(__dirname,'update_fac.html'));}
    else if(req.params.id==='admin')
    
    {res.sendFile(path.join(__dirname,'update_adm.html'));}
    else if(req.params.id==='lab_incharge')
    
    {res.sendFile(path.join(__dirname,'update_labin.html'));}
    

});

    



console.log("p");
app.put('/user/:id/:userid/update',(req,res,next)=>{
    console.log(req.body);
    console.log(req.params.userid);
    var ip=req.body;
    const r=req.params.id;
    //const m = new Validator(req.body,
        
      //  { 
            
        //    __login:"required",
          //  dept_name:"required",
            
            
            //email:"required",
            //mobile: 'required|minLength:10' }
      
       
    //if(m.check()){  
    if(r==='student')
    {
        db.getDB().collection(student.__login).findOne({__login:req.params.userid}).toArray().then((docp)=>
        {
            var dt=getPrimaryKey(docp);

        });
        
        db.getDB().collection(student.__login).findOneAndUpdate({_id:dt},{$set:{student:ip.student}},{returnOrignal:false}).toArray().then((doc)=>
        {
            res.send(doc);

        });
    }
        
    else if(r==='faculty')
    {
        db.getDB().collection(student.__login).findOne({__login:req.params.userid}).toArray().then((docp)=>
        {
            var dt=getPrimaryKey(docp);

        });
        db.getDB().collection(faculty.__login).findOneAndUpdate({__login:req.params.userid},{$set:{faculty:ip.faculty}},{returnOrignal:false}).toArray().then((doc)=>
        {
            res.send(doc);

        });
    }
    else if(r==='admin')
    {
        db.getDB().collection(admin.__login).findOne({__login:req.params.userid}).toArray().then((docp)=>
        {
            var dt=getPrimaryKey(docp[0]);
            console.log(dt);
            db.getDB().collection(admin).findOneAndUpdate({_id:dt},{$set:{admin:ip.admin}},{returnOrignal:false}).toArray().then((doc)=>
        {
            res.send(doc);

        });

        });
        
    } else if(r==='lab_incharge')
    {
        db.getDB().collection(lab_incharge.__login).findOneAndUpdate({__login:req.params.userid},{$set:{lab_incharge:ip.student}},{returnOrignal:false}).toArray().then((doc)=>
        {
            res.send(doc);

        });
    }else{
      res.send("error");  
    }

});

    
//to insert student
app.get('/user/:id/:userid/insertstu',(req,res)=>{
    if(req.params.id==='admin'){
        res.sendFile(path.join(__dirname,'insertstu.html'));
    }
});
app.post('/user/:id/:userid/insertstu',(req,res,next)=>{
   
        db.getDB().collection(studentc).insertOne(req.body,function(err,result){
            if(err){
                const error = new Error("Failed to insert Todo Document");
                error.status = 400;
                next(error);
            }
            else
            {
                res.send("DOCUMENT INSERTED!!!");
            }
        });
    
});
//to insert faculty
app.get('/user/:id/:userid/insertfac',(req,res)=>{
    if(req.params.id==='admin'){
        res.sendFile(path.join(__dirname,'insertfac.html'));
    }
});
app.post('/user/:id/:userid/insertfac',(req,res,next)=>{
   
        db.getDB().collection(facultyc).insertOne(req.body,function(err,result){
            if(err){
                const error = new Error("Failed to insert  Document");
                error.status = 400;
                next(error);
            }
            else
            {
                res.send("DOCUMENT INSERTED!!!");
            }
        });
    
});
///to insert admin
app.get('/user/:id/:userid/insertadm',(req,res)=>{
    if(req.params.id==='admin'){
        res.sendFile(path.join(__dirname,'insertadm.html'));
    }
});
app.post('/user/:id/:userid/insertadm',(req,res,next)=>{
   
        db.getDB().collection(adminc).insertOne(req.body,function(err,result){
            if(err){
                const error = new Error("Failed to insert  Document");
                error.status = 400;
                next(error);
            }
            else
            {
                res.send("DOCUMENT INSERTED!!!");
            }
        });
    
});

///to insert lab incharge
app.get('/user/:id/:userid/insertlabin',(req,res)=>{
    if(req.params.id==='admin'){
        res.sendFile(path.join(__dirname,'insertlabin.html.html'));
    }
});
app.post('/user/:id/:userid/insertlabin',(req,res,next)=>{
   
        db.getDB().collection(labinc).insertOne(req.body,function(err,result){
            if(err){
                const error = new Error("Failed to insert  Document");
                error.status = 400;
                next(error);
            }
            else
            {
                res.send("DOCUMENT INSERTED!!!");
            }
        });
    
});
    
//to find

app.get('/user/:id/:userid/find',(req,res)=>{
    
    if(req.params.id==='student')
    {res.sendFile(path.join(__dirname,'find_fac.html'));}
    else if(req.params.id==='faculty')
    
    {res.sendFile(path.join(__dirname,'find_stu.html'));}
    else if(req.params.id==='admin')
    
    {res.sendFile(path.join(__dirname,'find_fac.html'));}
    else if(req.params.id==='lab_incharge')
    
    {res.sendFile(path.join(__dirname,'find_lab.html'));}
    

});

    




app.post('/user/:id/:userid/find',(req,res,next)=>{
    console.log(req.body);
    const ip=req.body;
    const r=req.params.id;
    if(r==='student')
    {
        db.getDB().collection(student.__login).find({login:req.params.userid}).toArray().then((doc)=>
        {
            var search=doc.dept_name;
            db.getDB().collection(faculty.dept_name).find({dept_name:search}).toArray().then((doc2)=>
            {
                if(!doc)
                {
                    res.sendStatus(400);
                }
                else{
                res.send(doc2);
                }
            });

        });
    }else if(r==='faculty')
    {
        db.getDB().collection(faculty.__login).find({login:req.params.userid}).toArray().then((doc)=>
        {
            var search=doc.dept_name;
            db.getDB().collection(student.dept_name).find({dept_name:search}).toArray().then((doc2)=>
            {
                if(!doc)
                {
                    res.sendStatus(400)
                }
                else{
                    res.send(doc2);
                }
            });
            

        });
    } else if(r==='admin')
    {
        db.getDB().collection(admin.__login).find({__login:req.params.userid},{$set:{admin:ip.admin}},{returnOrignal:false}).toArray().then((doc)=>
        {
            var search=doc.dept_name;
            db.getDB().collection(faculty.dept_name).find({dept_name:search}).toArray().then((doc2)=>
            {if(!doc)
            {
                res.sendStatus(400);
            }
            
            else{
                res.send(doc2);
            }
        });
        });
    
    }else{
      res.send("error");  
    }});
   
//to find hod
app.get('/user/:id/:userid/findhod',(req,res)=>{
    
    res.sendFile(path.join(__dirname,'hod.html'));

});
app.post('/user/:id/:userid/findhod',(req,res,next)=>{
    console.log(req.body)
    const ip=req.body;
    const r=req.params.id;
    if(r==='student')
    {
        db.getDB().collection(student.__login).find({__login:req.params.userid}).toArray().then((doc)=>
        {
            var search=doc.dept_name;
            db.getDB().collection(department.dept_name).find({dept_name:search}).toArray().then((doc2)=>
            {
                res.send(doc2);
            });

        });
    }else if(r==='faculty')
    {
        db.getDB().collection(faculty.__login).find({__login:req.params.userid}).toArray().then((doc)=>
        {
            var search=doc.dept_name;
            db.getDB().collection(department.dept_name).find({dept_name:search}).toArray().then((doc2)=>
            {
                res.send(doc2);
            });
            

        });
    } else if(r==='admin')
    {
        db.getDB().collection(admin.__login).find({__login:req.params.userid},{$set:{admin:ip.admin}},{returnOrignal:false}).toArray().then((doc)=>
        {
            var search=doc.dept_name;
            db.getDB().collection(department.dept_name).find({dept_name:search}).toArray().then((doc2)=>
            {
                res.send(doc2);
            });
        });
    
    }else{
      res.send("error");  
    }});
//see labincharge
app.get('/user/:id/:userid/labs',(req,res,next)=>{
    res.sendFile(labrecord.html)
});


app.post('/user/:id/:userid/labs',(req,res,next)=>{
    var search=req.body;
    db.getDB().collection(labs.lab).find({lab:search}).toArray().then((doc2)=>
            {
                res.send(doc2);
            });
    
});


db.connect((err)=>{
    if(err) console.log(err);
    else{
        app.listen(3001,()=>{
            console.log("listening on 3001");
        });
    }
});