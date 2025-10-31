const express = require('express');
const app = express();
const port = 3000;

// 1 - Match con la primera ruta http://localhost:3000
app.get('/', (req, res) => {
  res.send('root');
});

// 2 - Match con la primera ruta http://localhost:3000/about
app.get('/about', (req, res) => {
  res.send('about');
});

// 3 - Match con la primera ruta http://localhost:3000/random.text
app.get('/random.text', (req, res) => {
  res.send('random.text');
});

//  Estos Routing funciona con Express 4.x , si es 5 con sus librerias modernas no funciona
// Acontinuacion demostramos diferentes casos:
// ------------------------------------
// Route paths based on string patterns (colar caracteres hacen que las rutas se comporten de manera diferente y hagan match con otras rutas)
// ------------------------------------

// 1 - Match con las rutas http://localhost:3000/acd  |  http://localhost:3000/abcd
app.get('/ab?cd', (req, res) => {
  res.send('ab?cd');
});

// ( el primer URL abre el que esta arriba, pero si lo desabilitas el que esta abajo) 
// 2 - Match con las rutas http://localhost:3000/abcd | http://localhost:3000/abbcd | http://localhost:3000/abbbcd
app.get('/ab+cd', (req, res) => {
  res.send('ab+cd')
})

// El primer URL siguie siende igual, a si que abre el de arriba
// 3 - Match con las rutas http://localhost:3000/abcd | http://localhost:3000/abxcd | http://localhost:3000/abRANDOMcd | http://localhost:3000/ab123cd
app.get('/ab*cd', (req, res) => {
  res.send('ab*cd')
})

// 4 - Match con las rutas http://localhost:3000/abe | http://localhost:3000/abcde
app.get('/ab(cd)?e', (req, res) => {
  res.send('ab(cd)?e')
})


// -----------------------------------------
// Route paths based on regular expressions 
// -----------------------------------------

// 1 - Match con las rutas http://localhost:3000/a


/* app.get(/a/, (req, res) => { //captura cualquier URL que contenga la letra a en cualquier parte del path.
  res.send('/a/')
})

// 1 - Match con las rutas http://localhost:3000/butterfly | http://localhost:3000/dragonfly but not butterflyman, dragonflyman, and so on.
app.get(/.*fly$/, (req, res) => { //captura cualquier URL cuyo path termine en "fly"
  res.send('/.*fly$/')
}) */


// ------------------------ 
// Route con Parametros
// ------------------------ 

// Colocando por ejemplo el valor 1 en la ruta http://localhost:3000/users/1 , obtenemos/capturamos ese 1 con req.params

// Ejemplo 1 http://localhost:3000/users/1
app.get('/users/:userId', (req, res) => {  // Es importante el que haya el dos punto (:id)
  res.send(req.params)
})

// Ejemplo 2 http://localhost:3000/users/14/books/23
app.get('/users/:userId/books/:bookId', (req, res) => {
  res.send(req.params)
})

// El nombre los los paramteros tiene que esta compuestos por caracteres por Letras, Numeros y guion bajo _
// El guion medio (-) y (.) se usa para fines practicos como poner paramatros seguidos, asi 👇


app.get('/flights/:from-:to', (req, res) => { //http://localhost:3000/flights/Mendoza-ROX
  res.send(req.params)
})
app.get('/plantae/:genus.:species', (req, res) => { //http://localhost:3000/plantae/TestOne.Dog
  res.send(req.params)
})

//Las regEx se usan para tener un mayor control en las rutas, pero en Express 5 ya no estan soportadas las regEx
//En express 4 estas tienen caracteristicas, se recomienda ver estas dos advertencias: https://expressjs.com/es/guide/routing.html#:~:text=params%3A%20%7B%22userId%22%3A%20%2242%22%7D-,Advertencia,%5C%20characters%20with%20an%20additional%20backslash%2C%20for%20example%20%5C%5Cd%2B.,-Advertencia
app.get('/user/:userId(\d+)', (req, res) => { //http://localhost:3000/user/42
  res.send(req.params)
})


// ------------------------ --------------------- 
//Route handlers / Manipuladores de rutas
// ------------------------ --------------------- 
//Ruta comun (respuesta individual)

app.get('/example/a', (req, res) => { //http://localhost:3000/example/a
  res.send('Hello from A!')
})

//Dos respustas en una ruta
app.get('/example/b', (req, res, next) => { //http://localhost:3000/example/b
  console.log('the response will be sent by the next function ...')
  next()
}, (req, res) => {
  res.send('Hello from B!')
})

//Una matriz de respuesta
const cb0 = function (req, res, next) {
  console.log('CB0')
  next()
}

const cb1 = function (req, res, next) {
  console.log('CB1')
  next()
}

const cb2 = function (req, res) {
  res.send('Hello from C!')
}

app.get('/example/c', [cb0, cb1 ,cb2]) //http://localhost:3000/example/c

//Una combinacion de funciones individuales y matrices
const cb3 = function (req, res, next) {
  console.log('CB3')
  next()
}

const cb4 = function (req, res, next) {
  console.log('CB4')
  next()
}

app.get('/example/d', [cb3, cb4], (req, res, next) => { //http://localhost:3000/example/d
  console.log('the response will be sent by the next function ...')
  next()
}, (req, res) => {
  res.send('Hello from D!')
})

// ------------------------ --------------------- 
// Response methods 2 metodos de 9(capaz hay mas)
// ------------------------ --------------------- 

//Si no pasamos una respusta a la ruta no pasa nada
app.get('/SinRespuesta', (req, res) => { //http://localhost:3000/SinRespuesta 
})

// Solicita un archivo para descargarlo. 
app.get('/RespuestaDownload', (req, res) => { //http://localhost:3000/RespuestaDownload 
  res.download()
})
// Finaliza el proceso de respuesta.
app.get('/RespuestaEnd', (req, res) => { //http://localhost:3000/RespuestaEnd
  res.end()
})

app.listen(port, () => {
  console.log(`Servidor abierto, Main URL: http://localhost:${port}/`);
});
