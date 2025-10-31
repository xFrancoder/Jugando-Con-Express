const express = require('express')
const app = express()
const port = 3000

const birds = require('./birds')

app.use('/birds', birds)

app.listen(port, () => {
  console.log(`http://localhost:3000/birds`)
})
