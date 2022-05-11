// const bodyParser = require("body-parser");
const express = require("express");
var morgan = require('morgan');
const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [];

const server = express();

server.use(morgan('dev'));
// to enable parsing of json bodies for post requests
server.use(express.json());
const PATH = '/posts';
let id = 1;
// TODO: your code to handle requests

//Postea un nuevo {author, title, contents}


//Postea un nuevo {author, title, contents} 

//Devuelve los posts que contengan term dentro del title o el contents. ter es ingresado por query.

//Devuelve los posts del autor ingresado por parametro.

//Borra un author




    //Hay otra forma de filtrar los posts de un autor ingresado por body.
    /* let deleted_posts = [];// definimos un arreglo vacio.
    posts = posts.filter(p=>{
        if(p.author===author){
            deleted_posts.push(p);
        }else{
            return true;//El true se va a reemplazar por un espacio en el arreglo.
        }
    }) */



module.exports = { posts, server };
