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
server.post(PATH,(req,res,next)=>{
    const {author, title, contents} = req.body;
    //Para obtener la informacion del body utilizo destructuring. 
    //Pero se puede utilizar el let author = req.body.author, let title = req.body.title...and so on. 
    if(!author || !title || !contents){
        return res.status(STATUS_USER_ERROR).json({error: "No se recibieron los parámetros necesarios para crear el Post"});
    }
    const post = {author, title, contents, id: id++};
    posts.push(post);
    console.log(posts);
    res.status(200).json(post);
});
server.post(PATH+'/author/:author',(req,res,next)=>{
    const {title, contents} = req.body;
    const {author} = req.params;
    if(!author || !title || !contents){
        res.status(STATUS_USER_ERROR).json({error: "No se recibieron los parámetros necesarios para crear el Post"});
    }
    const post = {author,title,contents, id: id++};
    posts.push(post);
    res.send(post);
});

server.get(PATH,(req,res,next)=>{
    const {term} = req.query;
    console.log(term);
    if(term){
        const filteredPosts = posts.filter(post=>post.title.includes(term || post.contents.includes(term)));  
        console.log(filteredPosts);
        return res.status(200).json(filteredPosts);
    }
    res.json(posts);

});

server.get(PATH+'/:author',(req,res)=>{
    const { author } = req.params;
    if(author){
        let post = posts.filter(p=>p.author===author);
        return res.json(post);
    }else{
        res.status(STATUS_USER_ERROR).json({error: "No existe ningun post del autor indicado"});
    }
});
server.get(PATH+'/:author/:title', (req,res)=>{
    const {author, title} = req.params;
    if(author && title){
        let post = posts.filter(p=>p.author===author && p.title===title);
        return res.json(post);
    }else{
        res.status(STATUS_USER_ERROR).json({error: "No existe ningun post con dicho titulo y autor indicado"});
    }
})
server.put(PATH,(req,res)=>{
    const {id, title, contents} = req.body;
    if(id && title && contents){
        let post = posts.filter(p=>p.id===id);
        if(post){
            post.title = title;
            post.contents = contents;
        }else{
            return res.status(STATUS_USER_ERROR).json({error: "El id suministrado no es valido"});
        }
    }else{
        res.status(STATUS_USER_ERROR).json({error: "No se recibieron los parámetros necesarios para modificar el Post"});
    }
})


module.exports = { posts, server };
