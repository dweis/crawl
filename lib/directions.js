module.exports = {
  NORTH      : 'n'
, NORTH_EAST : 'ne'
, EAST       : 'e'
, SOUTH_EAST : 'se'
, SOUTH      : 's'
, SOUTH_WEST : 'sw'
, WEST       : 'w'
, NORTH_WEST : 'nw'

, directionToX: function(direction) {
    switch(direction) {
      case this.NORTH: return 0
      case this.NORTH_EAST: return 1
      case this.EAST: return 1
      case this.SOUTH_EAST: return 1
      case this.SOUTH: return 0
      case this.SOUTH_WEST: return -1
      case this.WEST: return -1
      case this.NORTH_WEST: return -1
    }
  }

, directionToY: function(direction) {
    switch(direction) {
      case this.NORTH: return -1
      case this.NORTH_EAST: return -1
      case this.EAST: return 0
      case this.SOUTH_EAST: return 1
      case this.SOUTH: return 1
      case this.SOUTH_WEST: return 1
      case this.WEST: return 0
      case this.NORTH_WEST: return -1
    }
  }

, positionToDirection: function(x, y) {
    if (x == 0 && y == -1)
      return this.NORTH
    else if (x == 1 && y == -1)
      return this.NORTH_EAST
    else if (x == 1 && y == 0)
      return this.EAST
    else if (x == 1 && y == 1)
      return this.SOUTH_EAST
    else if (x == 0 && y == 1)
      return this.SOUTH
    else if (x == -1 && y == 1)
      return this.SOUTH_WEST
    else  if (x == -1 && y == 0)
      return this.WEST
    else if (x == -1 && y == -1)
      return this.NORTH_WEST
    
    throw new Error('Unable to convert ' + x + ', ' + y + ' into a direction')
  }
}
