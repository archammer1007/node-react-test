require('babel-register')

var express = require('express')
var app = express()
var React = require('react')
var ReactDOM = require('react-dom/server')
var components = require('./public/components.js')

var HelloMessage = React.createFactory(components.HelloMessage)


app.engine('jade', require('jade').__express)
app.set('view engine', 'jade')

app.use(express.static(__dirname + '/public'))

app.get('/', function(req, res){
  res.render('index', {
    react: ReactDOM.renderToString(HelloMessage({name: "John"}))
  })
})

app.get('/name', function(req, res){
  res.send("Paul, " + new Date().toString())
})

app.listen(8080, function() {
  console.log('Listening on port 3000...')
})