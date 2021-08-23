const express = require('express')
var cors = require('cors')
require('./src/db/mongoose')
const path = require('path');
const User = require('./src/models/user')
const userRouter = require('./src/routers/user')


const app = express()
const port = process.env.PORT 
const whitelist = ['http://localhost:3001', 'https://start-mariocartelo.herokuapp.com', 'http://start-mariocartelo.herokuapp.com']
app.use(express.json())


const corsOptions = {
  origin: function (origin, callback) {
    console.log("** Origin of request " + origin)
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      console.log("Origin acceptable")
      callback(null, true)
    } else {
      console.log("Origin rejected")
      callback(new Error('Not allowed by CORS'))
    }
  }
}


app.use(cors(corsOptions))
app.use(userRouter)

if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
      res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
  }


app.listen(port, () => {
    console.log('server is up on port ' + port)
})

