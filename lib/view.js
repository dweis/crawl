var _ = require('underscore')
  , directions = require('./directions')

var viewFactory = (function() {
  function generateVisibilityMask(radius) {
    var mask = []
      , c = 0

    // create a rough circular shaped boolean mask for visibility
    for (ab = -radius; ab <= radius; ab++)
      for (ord = -radius; ord <= radius; ord++)
        mask[c++] = Math.pow(ab, 2) + Math.pow(ord, 2) <= Math.pow(radius, 2) + (radius / 2) ? true: false

    return {
      mask: mask
    , getWidth: function() {
        return Math.sqrt(this.mask.length)
      }
    , getHeight: function() {
        return Math.sqrt(this.mask.length)
      }
    , getX: function(position) {
        return position % this.getWidth()
      }
    , getY: function(position) {
        return Math.floor(position / this.getHeight())
      }
    , getMidPointX: function() {
        return Math.floor(this.getWidth() / 2)
      }
    , getMidPointY: function() {
        return Math.floor(this.getHeight() / 2)
      }
    }
  }

  function View(moves, targets, entities) {
    this.moves = moves
    this.targets = targets
    this.entities = entities
  }

  return function(map, x, y) {
    var entity = map.getEntity(x, y) 
      , range = 3
      , visibilityMask = generateVisibilityMask(range)
      , visibleMidX = visibilityMask.getMidPointX()
      , visibleMidY = visibilityMask.getMidPointY()
      , moves = []
      , targets = []
      , entities = []

    _.each(visibilityMask.mask, function(v, k) {
      var px = visibilityMask.getX(k)
        , py = visibilityMask.getY(k)
        , deltaX = px - visibleMidX
        , deltaY = py - visibleMidY
        , entity = null
        
      try {
        entity = map.getEntity(x + deltaX, y + deltaY)
        if (entity) entities.push(entity)
      } catch(e) {}

      if (Math.abs(deltaX) <= 1 && Math.abs(deltaY) <= 1 && 
            x + deltaX >= 0 && x + deltaX < map.width && 
            y + deltaY >= 0 && y + deltaY < map.height &&
            (px - visibleMidX != 0 || py - visibleMidY != 0)) {
        if (!map.isCellOccupied(x + deltaX, y + deltaY)) {
          moves.push(directions.positionToDirection(px - visibleMidX, py - visibleMidY)) 
        } else if (entity) {
          targets.push(entity)
        }
      }
    })

    return new View(moves, targets, entities)
  }
})()

exports.factory = viewFactory
