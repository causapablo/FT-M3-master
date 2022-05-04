let fs = require('fs')
/* let request = require('request'); */

module.exports = {
    echo: function(args, print){
        print(args.join(' '));
    },
    date: function(args,print){
        print(Date())
    },
    ls: function(args,print){
        fs.readdir('.',(err,files)=>{
            if(err) throw err; 
            print(files.join('\n'));
            /* let output='';
            files.forEach((file)=>{
                output+=file+'\n'
            })
            print(output); */
        })
    },
    pwd: function(args,print){
        print(process.cwd());
    },
    whosyourdaddy: function(args,print){
        print('You\'re the boss.')
    },
    cat: function(args,print){
        //cat muestra el contenido de un archivo, el texto. args es el nombre del archivo.
        fs.readFile(args[0],'utf-8',(err,data)=>{
            if(err) throw err;
            print(data);
        })
    },
    head: function(args,print){
        fs.readFile(args[0],'utf-8',(err,data)=>{
            if(err) throw err;
            print(data.substring(0,250))
        })
    },
    tail: function(args,print){
        fs.readFile(args[0],'utf-8', (err,data)=>{
            print(data.substring(Math.round(data.length*3/2),-1));
        })
    },
    /* curl: function(args,print){
        //El curl nos trae la informacion de una web, por lo que debemos hacer una peticion a un servidor web.
        request(args[0], (err,data)=>{
            if(err) throw err;
            print(data.body);
        }) 
    }, */
    help: function(args, print){
        print(`
        echo: print the input on the screen.
        date: return the currently date and time of your country.
        ls: print the files within the current directory.
        pwd: print the path of the current directory.
        cat: print the content of the file.
        head: print the n lines of a file.
        tail: print the last n lines of a file.
        curl: print the content of a website`)
    }

}