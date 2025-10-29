const express = require('express')
const app = express()
const port = 3000

//Facilita el accesos a los archivos estaticos (ahora todo son rutas)
app.use(express.static('files')) // hace que la ruta http://localhost:3000/files.html Funcione
app.use(express.static('public')) // hace que la ruta http://localhost:3000/public.html Funcione

//Crea una ruta con la principal (static) y de hay se hacen las demas rutas con los archivos adentro de ella
// Genera estas rutas:
// http://localhost:3000/static/app.html
// http://localhost:3000/static/index.html
app.use('/static', express.static('publicSegundo')) 


// Se recomienda usar path, para que cuando en otro dispositivo no se ejecute correctamente
const path = require('path')
app.use('/static', express.static(path.join(__dirname, 'public')))


//Hace la primera ruta de la page
app.get('/', (req, res) => {
  res.send('Page no static ')
})

//Levanta el servidor
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
