const express = require('express')
const employees = require('./employees.json')
const todoitems = require('./todolist.json')
const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';

const dbname = 'employeedb1';
let db;
let todoCollection;

const client = new MongoClient(url, { useUnifiedTopology: true, useNewUrlParser: true});

const myConn = async () => {
    try {
        
        const result = await client.connect();
         db = await result.db(dbname);
         todoCollection = await db.collection('to-do');

        console.log('Database connected')

    } catch (error) {
        console.log('We cannot connect to your database')
    }
}

myConn();

const app = express()


app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));



app.get('/',  (req, res) => {
    res.render('bravo');
});

app.get('/employeeList', (req, res) => {
    res.render('employeelist', { 
        employees 
    });    
});

app.get('/todoList', async (req, res) => {
    const results = await todoCollection.find().toArray();
    res.render('todolist', {
        results
    });
});

//app.post('/todoitem', async (req, res) => {
  //  const data = await todoCollection.insertMany(todoitems);
    //res.json(data); 

//}); 

app.listen(9000);