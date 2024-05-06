const express = require('express');//express js is use to create server
const path = require('path');//path allow us to know our html,css files location
const bodyParser = require('body-parser');//body-praiser allows us to send and recieve data
const knex = require('knex');// knex will allow us to access our database


const app = express();
let initialPath = path.join(__dirname,"public");
app.use(bodyParser.json());
app.use(express.static(initialPath));
app.get('/',(req,res)=>{
    res.sendFile(path.join(initialPath,"index.html"));
})
const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'test',
        database: 'loginformytvideo'

    }
})

app.get('/login',(req,res)=>{
    res.sendFile(path.join(initialPath,"login.html"));
})
app.get('/register',(req,res)=>{
    res.sendFile(path.join(initialPath,"register.html"));
})
app.post('/register-user',(req,res)=>{
    const {name,email,password} = req.body;
    if(!name.length || !email.length || !password.length){
        res.json('fill all the fields');
    }else{
        db('users').insert({
            name:name,
            email:email,
            password:password
        })
        .returning(["name","email"])
        .then(data=>res.json(data[0]))
        .catch(err=>{
            if(err.details.includes('already exists')){
                res.json('user already exists')
             }//else{
            //     res.json('error')
           //}
        })
    }
})

app.post('/login-user',(req,res)=>{
    const {email,password} = req.body;
    db.select('name','email').from('users').where({
        email:email,
        password:password
    })
    .then(data=>{
        if(data.length){
            res.json(data[0])
        }else{
            res.json('email or password is incorrect')
        }
    })
    // .catch(err=>{
    //     res.json('error')
    // })
})







app.listen(3000,(req,res)=>{
    console.log("server is running on port 3000");
})