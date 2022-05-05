var http = require('http');
var fs   = require('fs');

var beatles=[{
  name: "John Lennon",
  birthdate: "09/10/1940",
  profilePic:"https://blogs.correiobraziliense.com.br/trilhasonora/wp-content/uploads/sites/39/2020/10/CBNFOT081020100047-550x549.jpg"
},
{
  name: "Paul McCartney",
  birthdate: "18/06/1942",
  profilePic:"http://gazettereview.com/wp-content/uploads/2016/06/paul-mccartney.jpg"
},
{
  name: "George Harrison",
  birthdate: "25/02/1946",
  profilePic:"https://canaldosbeatles.files.wordpress.com/2012/02/george-george-harrison-8321345-438-600.jpg"
},
{
  name: "Richard Starkey",
  birthdate: "07/08/1940",
  profilePic:"http://cp91279.biography.com/BIO_Bio-Shorts_0_Ringo-Starr_SF_HD_768x432-16x9.jpg"
}
]
var names = beatles.map(obj=>{
  var name = '/api/'+encodeURI(obj.name).toLowerCase();
  return name;
})

http.createServer((request,response)=>{
  let uri = request.url.toLowerCase();
  //lleva al home.
  if(uri==='/'){
    response.writeHead(200,{'Content-Type': 'text/html'});
    let html = fs.readFileSync(__dirname+'/index.html');
    response.end(html);
    
  }else if(uri==='/api'){//devuelve toda la info en un arreglo
    response.writeHead(202,{'Content-Type': 'application/json'});
    response.end(JSON.stringify(beatles));

  }else if(names.includes(uri)){//Verifica si la uri 
    var beatle = beatles[names.indexOf(uri)]
    console.log(beatle)
    response.writeHead(200,{'Content-Type':'text/html'});
    let template = fs.readFileSync(__dirname+'/beatle.html','utf-8');
    //ahora reemplazamos los valores de las variables del template.
    template= template.replace(/{name}/g,beatle.name);//Usamos una RegEx para que reemplece en todos los tags con esa variable, no solo en la primera que encuentra.
    template = template.replace('{birthdate}', beatle.birthdate);
    template = template.replace('{profilePic}', beatle.profilePic);
    response.end(template);
  }else{//devuelve error si no encuentra nada. 
    response.writeHead(404, { 'Content-Type':'text/html' });
    response.end('Error 404: Not Found');
    console.log(request)
  }
  /* let findBeatle = request.url.split('/').pop();
  let foundBeatle = beatles.find(b=>findBeatle===encodeURI(b.name));
  if(foundBeatle){
    response.writeHead(200,{'Content-Type':'text/html'});
    let template = fs.readFileSync(__dirname+'/beatle.html','utf-8');
    //ahora reemplazamos los valores de las variables del template.
    template= template.replace(/'{name}'/g,foundBeatle.name);//Usamos una RegEx para que reemplece en todos los tags con esa variable, no solo en la primera que encuentra.
    template = template.replace('{birthdate}', foundBeatle.birthdate);
    template = template.replace('{profilePic}', foundBeatle.profilePic);
    response.end(template);
  } */
  /* if(names.includes(uri)){
    var beatle = beatles[names.indexOf(uri)]
    console.log(beatle)
    response.writeHead(200,{'Content-Type':'text/html'});
    let template = fs.readFileSync(__dirname+'/beatle.html','utf-8');
    //ahora reemplazamos los valores de las variables del template.
    template= template.replace(/'{name}'/g,beatle.name);//Usamos una RegEx para que reemplece en todos los tags con esa variable, no solo en la primera que encuentra.
    template = template.replace('{birthdate}', beatle.birthdate);
    template = template.replace('{profilePic}', beatle.profilePic);
    response.end(template);
  } */
    
  
}).listen(1337, '127.0.0.1');