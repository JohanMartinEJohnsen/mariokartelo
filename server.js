const express = require('express')
var cors = require('cors')
require('./src/db/mongoose')
const User = require('./src/models/user')
const userRouter = require('./src/routers/user')


const app = express()
const port = process.env.PORT 
app.use(express.json())
app.use(cors())
app.use(userRouter)

// if (process.env.NODE_ENV === 'production') {
//     // Serve any static files
//     app.use(express.static(path.join(__dirname, 'client/build')));
//   // Handle React routing, return all requests to React app
//     app.get('*', function(req, res) {
//       res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
//     });
//   }


app.listen(port, () => {
    console.log('server is up on port ' + port)
})