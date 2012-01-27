(function() {
  var express = require('express')
    , monsterData = require('./data/monsters')
    , itemData = require('./data/items')
    , worldFactory = require('./lib/world').factory
    , playerFactory = require('./lib/player').factory
    , app = express.createServer()
    , io = require('socket.io').listen(app)

  io.set('log level', 1)

  var crawl = (function(){
    var mapWidth = 100
      , mapHeight = 100
      , numMonsters = 100
      , world = worldFactory(mapWidth, mapHeight, numMonsters, { monsters: monsterData
                                                               , items: itemData })

    var updateTimer = setInterval(function() {
      world.pump()
    }, 500)

    io.sockets.on('connection', function (socket) {
      var player = playerFactory(mapWidth/2, mapHeight/2, 5)

      var renderTimer = setInterval(function() {
        socket.emit('view', world.getView(player))
      }, 1000)

      socket.on('move', function(data) {
        player.setPosition(data.x, data.y)
      })
    })
  })()

  app.configure(function(){
    app.set('views', __dirname + '/views')
    app.set('view engine', 'jade')
    app.use(express.static(__dirname + '/public'))
    app.use(express.errorHandler({ dumpExceptions: true
                                 , showStack: true }))
  })

  app.get('/', function(req, res) {
    res.render('index')
  })

  app.listen(3000)

  module.exports = app
})()
