var createError = require('http-errors')
var express = require('express')
var bodyParser = require("body-parser");
var index = require('./routes/index')


var app = express()

const PORT = 8081;
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', index)
app.use(function(req, res, next) { next(createError(404)) })
app.use(function(err, req, res, next) {
    res.locals.message = err.message
    console.log(err.message)
    res.locals.error = req.app.get('env') === 'development' ? err : {}
    res.status(err.status || 500).send({ 'message': 'unhandled error!!' })
})

app.listen(PORT, () => {
    console.log(`Server running at: http://localhost:${PORT}/`)
})

module.exports = app;
