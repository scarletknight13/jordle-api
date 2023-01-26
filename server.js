require('dotenv').config();
const express = require('express');
const game_words = require('./game_words');
console.log(game_words[0]);
const app = express();
const {PORT = 4000} = process.env;
const cors = require('cors');
const morgan = require('morgan');
// const controllers = require('./controllers');

app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan('dev'))
app.use(express.json())

app.get('/getWord', (req, res)=>{
    try{
        const randomIndex = Math.floor(Math.random() * game_words.length);
        res.json({word: game_words[randomIndex], message: 'Success'})
    }
    catch(err){
        res.status(400).json(err);
    }
})
app.get('/isAWord/:word', (req, res)=>{
    try{
        const word = req.params.word;
        const formattedWord = word.toLowerCase();
        const isAWord = game_words.includes(formattedWord);
        if(isAWord){
            res.json({result: true, message: 'This is a word'});
        }
        else{
            res.json({result: false, message: `${word} is not a word`});
        }
    }
    catch(err){
        res.status(400).json(err);
    }
})

const server = app.listen(PORT, ()=>console.log("You're listening on port " + PORT))