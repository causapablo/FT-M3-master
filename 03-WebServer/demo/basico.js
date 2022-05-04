var http = require('http'); // importamos el módulo http para poder trabajar con el protocolo
const ParserBlock = require('markdown-it/lib/parser_block');
var fs = require('fs')

http.createServer( function(req, res){ // Creamos una serie de events listener, que van a escuchar por requests que ocurren en este socket
	//Para crear un response empezamos escribiendo el header
	console.log(req.url);
	if(req.url==='/'){
		res.writeHead(200, { 'Content-Type':'text/plain' }) 
		//Le ponemos el status code y algunos pair-values en el header
		res.end(`URL from parameter: ${req.url}`);
	}else if(req.url==='/home'){
		res.writeHead(200, { 'Content-Type':'text/plain' }) 
		//Le ponemos el status code y algunos pair-values en el header
		res.end(`URL from parameter: ${req.url}`);
	}else if(req.url==='/api'){
		res.writeHead(200, { 'Content-Type':'text/plain' }) 
		//Le ponemos el status code y algunos pair-values en el header
		res.end(`URL from parameter: ${req.url}`);
	}else if(req.url==='/object'){
		var obj = {
			name: 'Pablo',
			edad: 35,
			job: 'Program Writer',
			languages: ['English','Deutsch']
		}
		res.writeHead(200, { 'Content-Type':'application/json' }) 
		//Le ponemos el status code y algunos pair-values en el header
		res.end(JSON.stringify(obj));
	}else if(req.url==='/html'){
		res.writeHead(200, { 'Content-Type':'text/html' }) 
		
		let html = fs.readFileSync(__dirname+'/html/index.html');
		res.end(html);
	}else if(req.url==='/template'){
		res.writeHead(200, { 'Content-Type':'text/html' }) 
		
		let html = fs.readFileSync(__dirname+'/html/template.html','utf8');
		var nombre = 'Pablo Augusto Correa Causa'; //Esta es la variable con la que vamos a reemplazar el template
		html = html.replace('{nombre}', nombre); // Usamos el método replace es del objeto String
		res.end(html);
	}else{
		res.writeHead(404, { 'Content-Type':'text/html' }) 
		//Le ponemos el status code y algunos pair-values en el header
		var htmlError = fs.readFileSync(__dirname+'/html/error.html','utf8');
		var code = '404';
		htmlError = htmlError.replace('{error}',code);
		res.end(htmlError);
	}


}).listen(1337, '127.0.0.1'); //Por último tenemos que especificar en que puerto y en qué dirección va a estar escuchando nuestro servidor