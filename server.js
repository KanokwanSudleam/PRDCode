const express = require('express')
    const path = require('path')
    const bodyParser = require('body-parser')
    const app = express()



    // Body parser middleware
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: false }))

    // CORS middleware
    app.use((req, res, next) => {
        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', '*')
        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true)
        // Pass to next layer of middleware
        next()
    })

    // Set port to be used by Node.js
    app.set('port', (5000))

    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname + '/public/index.html'));
    })

    /* At the top, with other redirect methods before other routes */
    // app.get('*',function(req,res,next){
    // if(req.headers['x-forwarded-proto']!='https')
    //   res.redirect('https://customer-compliant.herokuapp.com/'+req.url)
    // else
    //   next() /* Continue to other routes if we're not redirecting */
    // })



    app.listen(app.get('port'), () => {
        console.log('Node app is running on port', app.get('port'))
    })