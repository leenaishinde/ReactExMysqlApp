const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3001;
const mysql = require('mysql');
const cors = require('cors');

/*
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'cruddatabase'
  });
  connection.connect((err) => {
    if (err) throw err;
    console.log('Connected!');
  });*/

const db = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'password',
    database: 'cruddatabase'
})

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get("/api/get", (req,res) => {

    const sqlSelect = "SELECT * FROM movie_reviews";
    db.query(sqlSelect, (err,result) => {
        res.send(result);
    });
});

app.post('/api/insert',(req,res) => {

    const movieName = req.body.movieName
    const movieReview = req.body.movieReview

    const sqlInsert = "INSERT INTO movie_reviews (movieName, movieReview) VALUES (?,?)";
    db.query(sqlInsert,[movieName, movieReview],(err,result) => {
        console.log(result);
    })
})

app.post('/api/delete/:movieName',(req,res) => {
    const name = req.params.movieName 

    const sqlDelete = "DELETE FROM movie_reviews WHERE movieName = ?";
    db.query(sqlDelete,name,(err,result) => {
        if(err) console.log(err);
    })
})

app.put('/api/update',(req,res) => {
    const name = req.body.movieName 
    const review = req.body.movieReview
    const sqlUpdate = "UPDATE movie_reviews SET movieReview = ? WHERE movieName = ?";
    db.query(sqlUpdate,[review, name], (err,result) => {
        if(err) console.log(err);
    })
})

/*
app.get('/', (req, res) => {
    const sqlInsert ="INSERT INTO `movie_reviews` (`movieName`, `movieReview`) VALUES ('Avatar', 'good kids moview');"
    db.query (sqlInsert, (err,result) =>{
        if(err) throw err;
        res.send('Hello Leena!-Record Inserted')

    } )
})*/


app.listen(port, () => {
  console.log(` Server app listening at http://localhost:${port}`)
})