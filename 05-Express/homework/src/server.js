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
server.post(PATH, (req, res, next) => {
    const { author, title, contents } = req.body;
    //Para obtener la informacion del body utilizo destructuring. 
    //Pero se puede utilizar el let author = req.body.author, let title = req.body.title...and so on. 
    if (!author || !title || !contents) {
        return res.status(STATUS_USER_ERROR).json({ error: "No se recibieron los parámetros necesarios para crear el Post" });
    }
    const post = { author, title, contents, id: id++ };
    posts.push(post);
    console.log(posts);
    res.status(200).json(post);
});

//Postea un nuevo {author, title, contents} 
server.post(PATH + '/author/:author', (req, res, next) => {
    const { title, contents } = req.body;
    const { author } = req.params;
    if (!author || !title || !contents) {
        res.status(STATUS_USER_ERROR).json({ error: "No se recibieron los parámetros necesarios para crear el Post" });
    }
    const post = { author, title, contents, id: id++ };
    posts.push(post);
    res.send(post);
});
//Devuelve los posts que contengan term dentro del title o el contents. ter es ingresado por query.
server.get(PATH, (req, res, next) => {
    const { term } = req.query;
    if (term) {
        let filterestPosts = posts.filter(p => p.title.includes(term) || p.contents.includes(term));
        return res.json(filterestPosts);
    }
    res.json(posts);

});
//Devuelve los posts del autor ingresado por parametro.
server.get(PATH + '/:author', (req, res) => {
    let { author } = req.params;
    let authorPosts = posts.filter(p => p.author === author);
    if (authorPosts.length > 0) {
        res.json(authorPosts);
    } else {
        return res.status(STATUS_USER_ERROR).json({ error: "No existe ningun post del autor indicado" });
    }
});


server.get(PATH + '/:author/:title', (req, res) => {
    const { author, title } = req.params;

    if (author && title) {
        let post = posts.filter(p => p.author === author && p.title === title);
        if (post.length > 0) {
            res.json(post);
        } else {
            res.status(STATUS_USER_ERROR).json({ error: "No existe ningun post con dicho titulo y autor indicado" });
        }

    } else {
        res.status(STATUS_USER_ERROR).json({ error: "No existe ningun post con dicho titulo y autor indicado" });
    }
});


server.put(PATH, (req, res) => {
    const { title, contents, id } = req.body;

    if (id && title && contents) {
        let post = posts.find(p => p.id === parseInt(id));
        if (post) {
            post.title = title;
            post.contents = contents;
            res.json(post);
        } else {
            res.status(STATUS_USER_ERROR).json({ error: "No se encontro el post con el id solicitado." })
        }
    } else {
        res.status(STATUS_USER_ERROR).json({ error: "No se recibieron los parámetros necesarios para modificar el Post" });
    }
});

//Borra un author
server.delete(PATH, (req, res) => {
    let { id } = req.body;
    const post = posts.find((p) => p.id === parseInt(id));
    if (!id || !post) {
        return res.status(STATUS_USER_ERROR).json({ error: "Mensaje de error" });
    }


    posts = posts.filter((p) => p.id !== parseInt(id));
    res.json({ success: true });
});



server.delete('/author', (req, res) => {
    let { author } = req.body;
    let authorFound = posts.find(p => p.author === author);
    if (!author || !authorFound) {
        return res.status(STATUS_USER_ERROR).json({ "error": "No existe el autor indicado" });
    }
    let authorPosts = posts.filter(p => p.author === author);
    posts = posts.filter(p => p.author !== author);
    res.json(authorPosts);



    //Hay otra forma de filtrar los posts de un autor ingresado por body.
    /* let deleted_posts = [];// definimos un arreglo vacio.
    posts = posts.filter(p=>{
        if(p.author===author){
            deleted_posts.push(p);
        }else{
            return true;//El true se va a reemplazar por un espacio en el arreglo.
        }
    }) */

});


module.exports = { posts, server };
