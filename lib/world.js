var Map = require('./map')
  , viewFactory = require('./view').factory
  , monsterFactory = require('./monster').factory
  , rand = require('./math').rand
  , colors = require('./colors')
  , _ = require('underscore')
  , uuid = require('node-uuid')

var worldFactory = function(width, height, numberOfMonsters, data) {
  var map = new Map(width, height)

  for (var i = 0; i < numberOfMonsters; i++) {
    var position = map.getFreeCell()

    var spec = false

    while (!spec) {
      spec = data.monsters[rand(data.monsters.length)]

      if (rand(100) > spec.spawnProbability)
        spec = false
    }

    var mon = monsterFactory(spec, data)

    map.addEntity(mon, position.x, position.y)
  }

  function moveCallback(cmd, params) {
    switch(cmd) {
      case 'move':
        map.moveEntity(params.entity, params.x, params.y)
        return
    }
  }

  return {
    messages: []

  , log: function(text) {
      this.messages.push({ id: uuid.v1(), text: text, ts: new Date() })
    }

  , getMap: function() {
      return map
    }

  , pump: function() {
      for (var y = 0; y < map.height; y++) {
        for (var x = 0; x < map.width; x++) {
          if (map.isCellOccupied(x, y)) {
            var entity = map.getEntity(x,y)
            var view = viewFactory(map, x, y)
            entity.update(this, view, moveCallback)
          }
        }
      }
    }

  , render: function() {
      colors.clear()
      _.each(this.messages, function(msg) {
        console.log(msg.text)
      })

      for (var y = 0; y < map.height; y++) {
        for (var x = 0; x < map.width; x++) {
          if (map.isCellOccupied(x, y)) {
            var entity = map.getEntity(x, y)
            colors.write(colors.colors[entity.symbol.color], entity.symbol.char)
          } else {
            process.stdout.write(' ')
          }
        }
        process.stdout.write('\n')
      }
    }

  , getView: function() {
      var view = { width: map.width
                 , height: map.height
                 , log: _(this.messages).rest(_.size(this.messages) - 5)
                 , cells: [] }
        , c = 0

      for (var y = 0; y < map.height; y++) {
        for (var x = 0; x < map.width; x++) {
          if (map.isCellOccupied(x, y)) {
            var entity = map.getEntity(x, y)
            view.cells[c++] = { id: uuid.v1(), symbol: entity.symbol.char }
          } else {
            view.cells[c++] = { }
          }
        }
      }
      return view
    }
  }
}

exports.factory = worldFactory
