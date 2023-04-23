const express=require('express');
const bodyParser = require('body-parser');
const mysql= require('mysql2');
const connection= mysql.createConnection({
    host:'localhost',
    user: 'root',
    password:'',
    database:'lec4node',

});

const app = express();
const port=3000;
app.use(express.json());
const users=
    {
        name:'alaa',
        email:'alaa@alaa.com',
        phone:300
    }
    

app.get('/',(req,res)=>{
    let sql = `SELECT * FROM users`;
    connection.execute(sql,(err,result)=>{
        return res.json({message:"THIS IS home",result});
        if(err)
        {
             return res.json({message:"error"});
        }
    })
});
app.post('/add',(req,res)=>{
    let {id,name,email,password}= req.body;
    let sql=`INSERT INTO users(id,name,email,password) VALUES('${id}','${name}','${email}','${password}')`;
    connection.execute(sql,(err,result)=>{
        if(err)
        {
             return res.json({message:"error"});
        }
        else
         return res.json({message:"success"});

    })

})
app.get('/users',(req,res)=>{
   let {name,email,phone}=users;
   console.log(name); 
   return res.json(name);
});
app.delete('/user/:id',(req,res)=>{
    const {id} = req.params;
    console.log(id);
    const sql=`DELETE FROM users where id = ${id}`;
    connection.execute(sql,(err,result)=>{
        if(err)
        {
        return res.json({message:"error"});
        }
        else
        return res.json({message:"success"});

    });
});
app.delete('/user',(req,res)=>{
    const {id} = req.query;
    console.log(id);
    const sql=`DELETE FROM users where id = ${id}`;
    connection.execute(sql,(err,result)=>{
        if(err)
        {
        return res.json({message:"error"});
        }
        else
        return res.json({message:"success"});

    });
});
app.patch('/user/:id',(req,res)=>{
    const {id}=req.params;
    const {email}=req.body;
    const sql=`UPDATE users SET email='${email}' where id=${id}`;
    connection.execute(sql,(err,result)=>{
        if(err)
        return res.json({message:"error"});
        else
        return res.json({message:"success"});
    })
})
app.listen(port,()=>{
console.log(`successful connect to ${port}`);
})