function promisifiedReadFile(file){
    return new Promise((resolve, reject)=>{
        fs.readFile(file, (err,data)=>{
            if(err) reject(err);
            else resolve(data);
        })
    })
};

let p = promisifiedReadFile('./demo.js');//Aca estamos inventando un archivo que no existe, pero así es la sintaxis.
//p es una promesa, porque la funcion promsifiedReadFile devuelve una promesa.
//Puesto que p es una promesa, es un objeto que tiene 3 propiedades. 
// status: {pending, fulfilled, rejected}, value: {valor dependiente del status}, then: function(){...};

//si p fue resuelta, no rechazada, entonces  p = {status: fulfilled, value: data} *Ver definicion de la promisifiedReadFile, please. 
p.then(data=>console.log(data))//Al tener el succesfulHandler definido, la promesa que devuelve el .then() se resuelve con el valor de resolucion de la promesa p. 