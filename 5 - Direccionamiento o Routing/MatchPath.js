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
app.get(/a/, (req, res) => { //captura cualquier URL que contenga la letra a en cualquier parte del path.
  res.send('/a/')
})

// 1 - Match con las rutas http://localhost:3000/butterfly | http://localhost:3000/dragonfly but not butterflyman, dragonflyman, and so on.
app.get(/.*fly$/, (req, res) => { //captura cualquier URL cuyo path termine en "fly"
  res.send('/.*fly$/')
})


app.listen(port, () => {
  console.log(`Servidor abierto, Main URL: http://localhost:${port}/`);
});
