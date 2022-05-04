let compre = 8;


//Este resolve y reject son dos callbacks. Pueden ser cualquier funcion que lea, evalue o procese el valor del resultado.
let caramelos = new Promise((resolve, reject)=>{
    setTimeout(()=>{
        if(compre>=10) resolve(compre);
        else reject('No tenia guitarra');
    },4000);
});
console.log(caramelos);

caramelos.then(value=>console.log(value), err=>console.log(err));

caramelos.then(value=>console.log("Valor de resolucion: ", value));