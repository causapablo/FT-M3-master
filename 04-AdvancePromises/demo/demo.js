function promesa(texto){
    let p = new Promise((resolve,reject)=>{
        if(texto==='Hola Mundo'){
            resolve('La funcion resolve setea el valor de resolucion de la promesa');
        }else{
            reject('El reject setea la razon de rechazo de la promesa.')
        }
    })
    return p;
}

let p = promesa('Hello World');
let promesaHija = p.then(valorPadre=>console.log(valorPadre),err=>{throw(err)});
promesaHija.then(valor => console.log(valor), e=>console.log(e));
/* 
Resumen:
Tenemos una promesa Padre que fue resuelta
Si la promesa Padre fue resuelta: El .then(sH, eH) tiene definidos sH y eH,  si el sH devuelve un valor, entonces es el valor a la que se va a resolver la promesaHija.
Si la promesa Padre fue Rechazada: El .then(sH,eH), entonces el eH devuelve un valor, y este valor es al que se va a resolver la promesa Hija.

Si queremos que la hija rechace un valor, entonces tenemos que poner un throw (algo...). algo=>{throw(algo)}, esto entrararia en el rechazo de la promesa hija. 

 

*/
