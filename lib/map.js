var rand = require('./math').rand

function Map(width, height) {
  this.width = width
  this.height = height
  this.cells = []
}

Map.prototype.getFreeCell = function() {
  for (var i = 0; i < 20; i++) {
    var x = rand(this.width)
    var y = rand(this.height)

    if (!this.isCellOccupied(x, y))
      return { x: x, y: y }
  }

  throw new Error('Failed to find empty cell after 20 attempts')
}

Map.prototype.isCellOccupied = function(x, y) {
  var position = this.getCellPosition(x, y)

  if (x < 0 || x >= this.width || y < 0 || y >= this.height)
    throw new Error('Invalid cell position (' + x + ', ' + y + '), outside of map range!')

  if (typeof this.cells[position] == 'undefined' || !this.cells[position]) {
    return false
  }

  return true
}

Map.prototype.getCellPosition = function(x, y) {
  if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
    return position = (y * this.width) + x
  } else {
    throw new Error('Invalid cell position (' + x + ', ' + y + '), outside of map range!')
  }
}

Map.prototype.getXFromPosition = function(position) {
  return position % this.width
}

Map.prototype.getYFromPosition = function(position) {
  return Math.floor(position / this.width)
}

Map.prototype.addEntity = function(entity, x, y) {
  var position = this.getCellPosition(x, y)
  if (this.isCellOccupied(x, y)) 
    throw new Error('Failed to occupy spot, already taken')

  this.cells[position] = entity
}

Map.prototype.getEntity = function(x, y) {
  return this.cells[this.getCellPosition(x, y)]
}

Map.prototype.findEntity = function(entity, callback) {
  for (var y = 0; y < this.height; y++) {
    for (var x = 0; x < this.width; x++) {
      if (this.getEntity(x, y) == entity) {
        callback.call(this, x, y)
        return
      }
    }
  }
}

Map.prototype.removeEntity = function(x, y) {
  if (arguments.length == 1) {
    this.findEntity(arguments[0], this.removeEntity)
  } else {
    this.cells[this.getCellPosition(x,y)] = null
  }
}

Map.prototype.moveEntity = function(entity, dx, dy) {
  if (!entity) throw new Error('Invalid entity: ' + entity)

  var _this = this

  this.findEntity(entity, function(x,y) {
    _this.removeEntity(x, y)
    _this.addEntity(entity, x + dx, y + dy)
  })
}

module.exports = Map
